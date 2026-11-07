import type {
  DocumentActionComponent,
  DocumentActionsContext,
  Template,
} from "sanity";
import type { StructureResolver } from "sanity/structure";

import { singletonTypes } from "./schemas";

const singletonNames = new Set<string>(singletonTypes.map(({ name }) => name));
const singletonActions = new Set(["discardChanges", "publish", "restore"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...singletonTypes.map((type) =>
        S.listItem()
          .title(type.title ?? type.name)
          .icon(type.icon)
          .child(S.document().schemaType(type.name).documentId(type.name))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonNames.has(item.getId() ?? "")
      ),
    ]);

export const documentActions = (
  actions: DocumentActionComponent[],
  { schemaType }: DocumentActionsContext
) =>
  singletonNames.has(schemaType)
    ? actions.filter(({ action }) => action && singletonActions.has(action))
    : actions;

export const templates = (all: Template[]) =>
  all.filter(({ schemaType }) => !singletonNames.has(schemaType));
