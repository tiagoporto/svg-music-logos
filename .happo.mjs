import { RemoteBrowserTarget } from 'happo.io'
import { env } from 'node:process'

// https://docs.happo.io/docs/configuration
export default {
  apiKey: env.HAPPO_API_KEY,
  apiSecret: env.HAPPO_API_SECRET,

  // https://docs.happo.io/docs/configuration#targets
  targets: {
    'chrome-large': new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
      prefersReducedMotion: true,
      freezeAnimations: 'last-frame',
    }),

    // 'chrome-small': new RemoteBrowserTarget('chrome', {
    //   viewport: '375x667',
    //   prefersReducedMotion: true,
    //   freezeAnimations: 'last-frame',
    // }),
  },
}
