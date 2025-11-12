import type { Artist } from '#shared/schema'

export interface TestArtist extends Artist {
  logos: {
    title: string
    svg: string
    inverse?: boolean
    backgroundColor?: string
    css?: string
  }[]
}

export const dataMock = [
  {
    id: 'test-artist',
    name: 'Test Artist',
    origins: ['Japan', 'Ireland'],
    genres: ['genre-1', 'genre-2'],
    link: 'http://test-artist.com',
    nameTemplate: '<span>Test Artist</span>',
    logos: [
      {
        title: 'Test Logo',
        svg: 'test-logo.svg',
        css: 'test-logo.css',
        inverse: true,
      },
      {
        title: 'Test Logo 2',
        svg: 'test-logo-2.svg',
        css: 'test-logo-2.css',
      },
    ],
  } satisfies TestArtist,
  {
    id: 'test-artist2',
    origins: ['France'],
    name: 'Test Artist2',
    link: 'http://test-artist.com',
    logos: [
      {
        title: 'Test Logo',
        svg: 'test-logo.svg',
        inverse: true,
        backgroundColor: '#000',
      },
    ],
  } satisfies TestArtist,
]
