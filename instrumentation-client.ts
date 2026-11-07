import {
	browserTracingIntegration,
	init,
	replayIntegration,
} from "@sentry/nextjs";

init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	integrations: [browserTracingIntegration(), replayIntegration()],
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	tracesSampleRate: 1,
});
