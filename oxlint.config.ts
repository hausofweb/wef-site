import { defineConfig } from "oxlint";
import type { OxlintConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export const IGNORE_PATTERNS = [
  "apps/cms/sanity.types.ts",
  "apps/cms/schema.json",
];

// Pre-existing debt in the pre-monorepo site, downgraded so it stays visible
// without blocking CI. Remove rules from this list as the code is fixed.
const LEGACY_SITE_RULES = [
  "anti-slop/no-chained-type-assertions",
  "anti-slop/no-runtime-typeof",
  "anti-slop/require-readable-spacing",
  "anti-slop/require-safety-comment-for-type-assertion",
  "eslint/arrow-body-style",
  "eslint/eqeqeq",
  "eslint/func-style",
  "eslint/no-constant-binary-expression",
  "eslint/no-else-return",
  "eslint/no-fallthrough",
  "eslint/no-param-reassign",
  "eslint/no-redeclare",
  "eslint/no-shadow",
  "eslint/no-unused-expressions",
  "eslint/no-unused-vars",
  "eslint/sort-keys",
  "eslint/valid-typeof",
  "import/no-absolute-path",
  "jsx-a11y/anchor-is-valid",
  "jsx-a11y/control-has-associated-label",
  "jsx-a11y/prefer-tag-over-role",
  "nextjs/no-duplicate-head",
  "node/global-require",
  "promise/always-return",
  "react/button-has-type",
  "react/function-component-definition",
  "react/jsx-curly-brace-presence",
  "react/purity",
  "react/self-closing-comp",
  "unicorn/consistent-function-scoping",
  "unicorn/filename-case",
  "unicorn/prefer-module",
  "unicorn/prefer-query-selector",
  "unicorn/prefer-ternary",
  "unicorn/switch-case-braces",
];

const config: OxlintConfig = defineConfig({
  extends: [core, react, next, antiSlop],
  ignorePatterns: [...(core.ignorePatterns ?? []), ...IGNORE_PATTERNS],
  overrides: [
    {
      files: ["apps/site/components/**", "apps/site/pages/**"],
      rules: Object.fromEntries(
        LEGACY_SITE_RULES.map((rule) => [rule, "warn"])
      ),
    },
  ],
});

export default config;
