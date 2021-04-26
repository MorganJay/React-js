// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

function init() {
  // Sentry.init({
  //   dsn:
  //     'https://2c1906d70dac4d74b8ce9486b3049b56@o578526.ingest.sentry.io/5734876',
  //   integrations: [new Integrations.BrowserTracing()],
  //   release: 'http-app@0.1.0',
  //   environment: process.env.NODE_ENV,
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.error(error);
}

export default { init, log };
