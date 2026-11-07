import { withSentryConfig } from "@sentry/nextjs/config";
import type { SentryBuildOptions } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const isProduction = process.env.VERCEL_ENV === "production";

const release: SentryBuildOptions["release"] = {
  create: isProduction,
  name: process.env.SENTRY_RELEASE,
};

// `vercel deploy` builds remotely without a .git dir, so the deploying
// workflow passes the commit SHA explicitly.
if (process.env.SENTRY_COMMIT_SHA) {
  release.setCommits = {
    commit: process.env.SENTRY_COMMIT_SHA,
    repo: "kduprey/wef-site",
  };
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io", protocol: "https" }],
  },
  reactStrictMode: true,
};

// Org, project, URL and auth token come from Vercel's SENTRY_* env vars.
export default withSentryConfig(nextConfig, {
  release,
  silent: !process.env.CI,
  sourcemaps: {
    disable: !isProduction,
  },
  tunnelRoute: true,
  widenClientFileUpload: true,
});
