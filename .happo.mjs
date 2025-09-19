import { RemoteBrowserTarget } from 'happo.io'

// https://docs.happo.io/docs/configuration
export default {
  apiKey: process.env.HAPPO_API_KEY,
  apiSecret: process.env.HAPPO_API_SECRET,

  // https://docs.happo.io/docs/configuration#targets
  targets: {
    'chrome-large': new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
      prefersReducedMotion: true,
      freezeAnimations: 'last-frame',
      maxHeight: 10000,
    }),

    // 'chrome-small': new RemoteBrowserTarget('chrome', {
    //   viewport: '375x667',
    //   prefersReducedMotion: true,
    //   freezeAnimations: 'last-frame',
    // }),
  },
}
