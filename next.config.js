const { withSentryConfig } = require("@sentry/nextjs/config");

module.exports = withSentryConfig(
	{
		reactStrictMode: true,
		images: {
			domains: ["media.graphcms.com", "media.graphassets.com"],
		},
	},
	{
		silent: !process.env.CI,
		tunnelRoute: true,
		widenClientFileUpload: true,
	}
);
