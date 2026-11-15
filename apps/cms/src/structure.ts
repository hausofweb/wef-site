import { BookIcon } from "@sanity/icons/Book";
import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentIcon } from "@sanity/icons/Document";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { HeartIcon } from "@sanity/icons/Heart";
import { ImagesIcon } from "@sanity/icons/Images";
import { UsersIcon } from "@sanity/icons/Users";
import type { ComponentType } from "react";
import type {
  DocumentActionComponent,
  DocumentActionsContext,
  Template,
} from "sanity";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

// Documents that exist exactly once; their IDs match the import script's.
const SINGLETONS = {
  contactInfo: { schemaType: "contactInfo", title: "Site Settings" },
  gallery: { schemaType: "gallery", title: "Gallery" },
  history: {
    documentId: "article-history",
    schemaType: "article",
    template: "article-history",
    title: "History",
  },
  visionAndMission: {
    documentId: "article-visionAndMission",
    schemaType: "article",
    template: "article-visionAndMission",
    title: "Vision & Mission",
  },
} as const;

const SINGLETON_IDS = new Set<string>([
  "contactInfo",
  "gallery",
  SINGLETONS.history.documentId,
  SINGLETONS.visionAndMission.documentId,
]);

const SINGLETON_ACTIONS = new Set(["discardChanges", "publish", "restore"]);
const SINGLETON_TYPES = new Set(["article", "contactInfo", "gallery"]);

const singleton = (
  S: StructureBuilder,
  icon: ComponentType,
  {
    documentId,
    schemaType,
    template,
    title,
  }: {
    documentId?: string;
    schemaType: string;
    template?: string;
    title: string;
  }
) => {
  const document = S.document()
    .schemaType(schemaType)
    .documentId(documentId ?? schemaType)
    .title(title);

  return S.listItem()
    .title(title)
    .icon(icon)
    .child(template ? document.initialValueTemplate(template) : document);
};

const profileList = (
  S: StructureBuilder,
  icon: ComponentType,
  section: "ourTeam" | "partners",
  title: string
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList("profile")
        .title(title)
        .filter('_type == "profile" && sectionOfSite == $section')
        .params({ section })
        .initialValueTemplates([
          S.initialValueTemplateItem(`profile-${section}`),
        ])
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("World Eye Foundation")
    .items([
      singleton(S, CogIcon, SINGLETONS.contactInfo),
      S.divider(),
      S.listItem()
        .title("About Us")
        .icon(BookIcon)
        .child(
          S.list()
            .title("About Us")
            .items([
              singleton(S, DocumentIcon, SINGLETONS.history),
              singleton(S, DocumentIcon, SINGLETONS.visionAndMission),
              profileList(S, UsersIcon, "ourTeam", "Our Team"),
              profileList(S, HeartIcon, "partners", "Partners"),
            ])
        ),
      S.listItem()
        .title("Our Work")
        .icon(CaseIcon)
        .child(
          S.list()
            .title("Our Work")
            .items([
              S.documentTypeListItem("screening")
                .title("Screenings")
                .icon(EyeOpenIcon),
            ])
        ),
      singleton(S, ImagesIcon, SINGLETONS.gallery),
    ]);

export const documentActions = (
  actions: DocumentActionComponent[],
  { documentId }: DocumentActionsContext
) =>
  documentId && SINGLETON_IDS.has(documentId)
    ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
    : actions;

const sectionTemplates: Template[] = [
  {
    id: "article-history",
    schemaType: "article",
    title: "History",
    value: { section: "history" },
  },
  {
    id: "article-visionAndMission",
    schemaType: "article",
    title: "Vision & Mission",
    value: { section: "visionAndMission" },
  },
  {
    id: "profile-ourTeam",
    schemaType: "profile",
    title: "Team member",
    value: { sectionOfSite: "ourTeam" },
  },
  {
    id: "profile-partners",
    schemaType: "profile",
    title: "Partner",
    value: { sectionOfSite: "partners" },
  },
];

// The article templates only exist to pre-fill the two singleton pages, so keep
// them out of the global "Create" menu.
export const newDocumentOptions = (options: { templateId: string }[]) =>
  options.filter(({ templateId }) => !templateId.startsWith("article-"));

// Hide the generic "new X" options for singletons and profiles; authors create
// profiles from the Our Team or Partners lists, which pre-fill the section.
export const templates = (all: Template[]) => [
  ...all.filter(
    ({ schemaType }) =>
      !SINGLETON_TYPES.has(schemaType) && schemaType !== "profile"
  ),
  ...sectionTemplates,
];
