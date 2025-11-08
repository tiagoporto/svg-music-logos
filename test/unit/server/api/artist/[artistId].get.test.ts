import { describe, it, expect, vi } from 'vitest'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)
vi.stubGlobal('getQuery', (params: unknown) => params)
vi.stubGlobal('getRouterParam', (event: { params?: Record<string, string> }, parameter: string) => {
  const { params } = event || {}

  return params ? params[parameter] : undefined
})

describe('get /api/artist/id', () => {
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
})
