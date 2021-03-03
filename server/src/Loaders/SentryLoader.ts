import * as Sentry from "@sentry/node";

export default () => {
    Sentry.init({
        dsn: "https://198226bf0b9d42b0bc5e7790743833c7@o523240.ingest.sentry.io/5635395",

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0
    });
};
