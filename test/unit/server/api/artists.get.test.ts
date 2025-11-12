import { describe, it, expect, vi } from 'vitest'

import { dataMock } from '../../mock'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)

describe('get /api/artists', () => {
  it('returns expected data', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/artists.get')
    // @ts-expect-error: no parameters
    const data = await handler.default()

    expect(data.artists).toHaveLength(196)
    expect(data.count).toBe(196)
  })

  it('returns expected artist entity', async () => {
    expect.hasAssertions()

    vi.resetModules()

    vi.doMock('@@/server/db', () => ({ data: dataMock }))
    const handler = await import('@@/server/api/artists.get')

    // @ts-expect-error: no parameters
    const data = await handler.default()

    expect(data.artists[0]).toStrictEqual({
      id: 'test-artist',
      name: 'Test Artist',
      nameTemplate: '<span>Test Artist</span>',
      origins: ['Japan', 'Ireland'],
      genres: ['genre-1', 'genre-2'],
      link: 'http://test-artist.com',
      logos: [
        {
          inverse: true,
          svg: '/logos/test-artist/test-artist_test-logo.svg',
          title: 'Test Logo',
        },
        {
          svg: '/logos/test-artist/test-artist_test-logo-2.svg',
          title: 'Test Logo 2',
        },
      ],
    })

    expect(data.artists[1]).toStrictEqual({
      id: 'test-artist2',
      name: 'Test Artist2',
      origins: ['France'],
      link: 'http://test-artist.com',
      logos: [
        {
          svg: '/logos/test-artist2/test-artist2_test-logo.svg',
          title: 'Test Logo',
          backgroundColor: '#000',
        },
      ],
    })
  })
})
