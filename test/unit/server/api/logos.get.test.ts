import { describe, it, expect, vi } from 'vitest'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)
vi.stubGlobal('getQuery', (params: unknown) => params)

describe('get /api/logos', () => {
  it('returns expected data with default pagination values', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: no parameters
    const data = await handler.default()

    expect(data?.logos).toHaveLength(30)
    expect(data?.count).toBe(355)
    expect(data?.pagination).toStrictEqual({
      currentPage: 1,
      totalPages: 12,
      totalRecords: 355,
    })
  })

  it('returns expected data with correct itemsPerPage', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ itemsPerPage: '15' })

    expect(data?.logos).toHaveLength(15)
    expect(data?.count).toBe(355)
    expect(data?.pagination).toStrictEqual({
      currentPage: 1,
      totalPages: 24,
      totalRecords: 355,
    })
  })

  it('returns expected data with current page', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ itemsPerPage: '20', page: '4' })

    expect(data?.logos).toHaveLength(20)
    expect(data?.count).toBe(355)
    expect(data?.pagination).toStrictEqual({
      currentPage: 4,
      totalPages: 18,
      totalRecords: 355,
    })
  })

  it('returns no data for unknown origin', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ origin: 'Test' })

    expect(data).toBeUndefined()
  })

  it('returns no data for unknown genre', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ genre: 'Test' })

    expect(data).toBeUndefined()
  })

  it('returns only filtered genre', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ genre: 'Heavy Metal' })

    expect(data?.logos?.every(logo => logo.genres?.includes('Heavy Metal'))).toBe(true)
  })

  it('returns only filtered origin', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ origin: 'Brazil' })

    expect(data?.logos?.every(logo => logo.origins?.includes('Brazil'))).toBe(true)
  })

  it('returns only filtered by origin and genre', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/logos.get')
    // @ts-expect-error: passing parameters
    const data = await handler.default({ origin: 'Brazil', genre: 'Heavy Metal' })

    expect(data?.logos?.every(logo => logo.origins?.includes('Brazil') && logo.genres?.includes('Heavy Metal'))).toBe(true)
  })

  it.todo('returns artists object')
})
