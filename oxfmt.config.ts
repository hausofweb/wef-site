import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

import { IGNORE_PATTERNS } from "./oxlint.config.ts";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [...(ultracite.ignorePatterns ?? []), ...IGNORE_PATTERNS],
});
