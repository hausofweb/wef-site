import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import type { WorkspaceOptions } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";
import { documentActions, structure, templates } from "./structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

const workspace = (dataset: "production" | "staging"): WorkspaceOptions => ({
  basePath: `/${dataset}`,
  dataset,
  document: { actions: documentActions },
  name: dataset,
  plugins: [structureTool({ structure }), visionTool()],
  projectId,
  schema: { templates, types: schemaTypes },
  title: `World Eye Foundation - ${dataset === "production" ? "Production" : "Staging"}`,
});

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export default defineConfig(
  isProduction
    ? [workspace("production"), workspace("staging")]
    : [workspace("staging"), workspace("production")]
);
