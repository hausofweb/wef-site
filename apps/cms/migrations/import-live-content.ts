/**
 * Imports worldeyef.org's content into the CLI's dataset. The live site was
 * pre-rendered from Hygraph, and each page still embeds its original props in
 * __NEXT_DATA__, which is the only remaining copy of that content.
 *
 * Document IDs are fixed and Sanity dedupes uploaded assets by content hash, so
 * re-running replaces documents instead of duplicating them.
 *
 *   pnpm --filter cms exec sanity exec migrations/import-live-content.ts --with-user-token
 */
import { randomUUID } from "node:crypto";

import type { IdentifiedSanityDocumentStub } from "next-sanity";
import { getCliClient } from "sanity/cli";

const LIVE_SITE = "https://worldeyef.org";

interface HygraphImage {
  url: string;
}

interface HygraphNode {
  bold?: boolean;
  children?: HygraphNode[];
  text?: string;
  type?: string;
}

interface HygraphProfile {
  name: string;
  postiion: string;
  profilePicture: HygraphImage;
  smallProfileBlurb: string;
}

const BLOCK_STYLES = new Map([
  ["block-quote", "blockquote"],
  ["heading-three", "h3"],
  ["heading-two", "h2"],
  ["paragraph", "normal"],
]);

const client = getCliClient({ apiVersion: "2026-01-01" });

const key = () => randomUUID().replaceAll("-", "").slice(0, 12);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-|-$/gu, "");

const fetchPageProps = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${LIVE_SITE}${path}`);
  const html = await response.text();

  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json"[^>]*>(?<json>.*?)<\/script>/su
  );

  if (!match?.groups?.json) {
    throw new Error(`No __NEXT_DATA__ on ${path}`);
  }

  return JSON.parse(match.groups.json).props.pageProps;
};

const uploadImage = async ({ url }: HygraphImage) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const asset = await client.assets.upload(
    "image",
    Buffer.from(await response.arrayBuffer()),
    { filename: url.split("/").pop() }
  );

  return { _type: "image", asset: { _ref: asset._id, _type: "reference" } };
};

const uploadImages = (images: HygraphImage[]) =>
  Promise.all(
    images.map(async (image) => ({
      _key: key(),
      ...(await uploadImage(image)),
    }))
  );

const toPortableText = (nodes: HygraphNode[]) =>
  nodes.map((node) => {
    const style = BLOCK_STYLES.get(node.type ?? "");

    if (!style) {
      throw new Error(`Unsupported rich text node: ${node.type}`);
    }

    return {
      _key: key(),
      _type: "block",
      children: (node.children ?? []).map((child) => ({
        _key: key(),
        _type: "span",
        marks: child.bold ? ["strong"] : [],
        text: child.text ?? "",
      })),
      markDefs: [],
      style,
    };
  });

const importContactInfo = async () => {
  const { contactInfo } = await fetchPageProps<{
    contactInfo: {
      email: string;
      fullAddress: string;
      phoneNumber: string;
      taglineText: string;
    };
  }>("/about-us/history");

  return {
    _id: "contactInfo",
    _type: "contactInfo",
    email: contactInfo.email,
    fullAddress: contactInfo.fullAddress,
    phoneNumber: contactInfo.phoneNumber,
    taglineText: contactInfo.taglineText,
  };
};

const importArticle = async (
  path: string,
  section: "history" | "visionAndMission"
) => {
  const { article } = await fetchPageProps<{
    article: {
      author?: { name: string };
      content: { raw: { children: HygraphNode[] } };
      title: string;
    };
  }>(path);

  return {
    _id: `article-${section}`,
    _type: "article",
    author: article.author?.name,
    content: toPortableText(article.content.raw.children),
    section,
    title: article.title,
  };
};

const importProfiles = (
  profiles: HygraphProfile[],
  sectionOfSite: "ourTeam" | "partners"
) =>
  Promise.all(
    profiles.map(async (profile) => ({
      _id: `profile-${slugify(profile.name)}`,
      _type: "profile",
      name: profile.name,
      position: profile.postiion,
      profilePicture: await uploadImage(profile.profilePicture),
      sectionOfSite,
      smallProfileBlurb: profile.smallProfileBlurb,
    }))
  );

const importScreenings = async () => {
  const { screenings } = await fetchPageProps<{
    screenings: {
      id: string;
      location: string;
      photosFromScreening: HygraphImage[];
    }[];
  }>("/our-work/screenings");

  return Promise.all(
    screenings.map(async (screening) => ({
      _id: `screening-${screening.id}`,
      _type: "screening",
      location: screening.location,
      photos: await uploadImages(screening.photosFromScreening),
    }))
  );
};

const importGallery = async () => {
  const { gallery } = await fetchPageProps<{ gallery: HygraphImage[] }>(
    "/gallery"
  );

  return {
    _id: "gallery",
    _type: "gallery",
    images: await uploadImages(gallery),
  };
};

const { profiles: team } = await fetchPageProps<{
  profiles: HygraphProfile[];
}>("/about-us/our-team");

const { data: partners } = await fetchPageProps<{ data: HygraphProfile[] }>(
  "/about-us/partners"
);

const documents: IdentifiedSanityDocumentStub[] = [
  await importContactInfo(),
  await importArticle("/about-us/history", "history"),
  await importArticle("/about-us/vision-and-mission", "visionAndMission"),
  ...(await importProfiles(team, "ourTeam")),
  ...(await importProfiles(partners ?? [], "partners")),
  ...(await importScreenings()),
  await importGallery(),
];

const transaction = client.transaction();

for (const document of documents) {
  transaction.createOrReplace(document);
}

await transaction.commit();

console.info(
  `Imported ${documents.length} documents into "${client.config().dataset}"`
);
