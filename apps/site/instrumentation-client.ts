import {
  browserTracingIntegration,
  init,
  replayIntegration,
} from "@sentry/nextjs";

export { captureRouterTransitionStart as onRouterTransitionStart } from "@sentry/nextjs";

init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  integrations: [browserTracingIntegration(), replayIntegration()],
  replaysOnErrorSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 1,
});
