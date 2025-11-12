import { describe, it, expect, vi } from 'vitest'

import { dataMock } from '../../../mock'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)
vi.stubGlobal('getQuery', (params: unknown) => params)
vi.stubGlobal('getRouterParam', (event: { params?: Record<string, string> }, parameter: string) => {
  const { params } = event || {}

  return params ? params[parameter] : undefined
})

describe('get /api/artist/id', () => {
  it('returns empty data', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/artist/[artistId].get')
    // @ts-expect-error: no parameters
    const data = await handler.default()

    expect(data).toBeUndefined()
  })

  it('returns expected data with default pagination values', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/artist/[artistId].get')
    // @ts-expect-error: no parameters
    const data = await handler.default({ params: { artistId: 'metallica' } })

    expect(data?.artist.id).toBe('metallica')
    expect(data?.artist.logos).toHaveLength(14)
    expect(data?.pagination).toStrictEqual({
      currentPage: 1,
      totalPages: 1,
      totalRecords: 14,
    })
  })

  it('returns expected data with correct itemsPerPage', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/artist/[artistId].get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ params: { artistId: 'iron-maiden' }, itemsPerPage: '2' })

    expect(data?.artist.id).toBe('iron-maiden')
    expect(data?.pagination).toStrictEqual({
      currentPage: 1,
      totalPages: 12,
      totalRecords: 23,
    })
  })

  it('returns expected data with current page', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/artist/[artistId].get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ params: { artistId: 'iron-maiden' }, itemsPerPage: '3', page: '4' })

    expect(data?.artist.id).toBe('iron-maiden')
    expect(data?.pagination).toStrictEqual({
      currentPage: 4,
      totalPages: 8,
      totalRecords: 23,
    })
  })

  it('returns expected artist entity', async () => {
    expect.hasAssertions()

    vi.resetModules()

    vi.doMock('@@/server/db', () => ({ data: dataMock }))
    const handler = await import('@@/server/api/artist/[artistId].get')

    // @ts-expect-error: no parameters
    const data = await handler.default({ params: { artistId: 'test-artist' } })

    expect(data?.artist).toStrictEqual({
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
  })
})
