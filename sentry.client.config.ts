import * as Sentry from '@sentry/nuxt'

Sentry.init({
  // If set up, you can use your runtime config here
  // dsn: useRuntimeConfig().public.sentry.dsn,
  dsn: 'https://8d436e4e4b5ce3cec95de6334ed29c64@o4509352125136896.ingest.us.sentry.io/4510050072199168',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1,

  // If you don't want to use Session Replay, just remove the line below:
  integrations: [Sentry.replayIntegration()],

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: process.env.NODE_ENV === 'production',
})
