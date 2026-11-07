import { createClient, defineQuery } from "next-sanity";

import type { Article, ContactInfo, Image, Profile, Screening } from "../types";

const client = createClient({
  apiVersion: "2026-01-01",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  perspective: "published",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
});

const IMAGE_PROJECTION = `{
  "id": asset->_id,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const CONTACT_INFO_QUERY = defineQuery(
  `*[_id == "contactInfo"][0]{ email, phoneNumber, fullAddress, taglineText }`
);

const ARTICLE_QUERY = defineQuery(
  `*[_type == "article" && section == $section][0]{
    title,
    "author": { "name": author },
    "updatedAt": _updatedAt,
    content
  }`
);

const GALLERY_QUERY = defineQuery(
  `*[_type == "gallery"][0].images[]${IMAGE_PROJECTION}`
);

const PROFILES_QUERY = defineQuery(
  `*[_type == "profile" && sectionOfSite == $section] | order(name asc){
    name,
    position,
    smallProfileBlurb,
    sectionOfSite,
    "profilePicture": profilePicture${IMAGE_PROJECTION}
  }`
);

const SCREENINGS_QUERY = defineQuery(
  `*[_type == "screening"] | order(_createdAt desc){
    "id": _id,
    location,
    "photosFromScreening": photos[]${IMAGE_PROJECTION}
  }`
);

export const getContactInfo = () =>
  client.fetch<ContactInfo>(CONTACT_INFO_QUERY);

export const getArticle = (section: Article["section"]) =>
  client.fetch<Article>(ARTICLE_QUERY, { section });

export const getGallery = async () =>
  (await client.fetch<Image[] | null>(GALLERY_QUERY)) ?? [];

export const getProfiles = (section: Profile["sectionOfSite"]) =>
  client.fetch<Profile[]>(PROFILES_QUERY, { section });

export const getScreenings = () => client.fetch<Screening[]>(SCREENINGS_QUERY);
