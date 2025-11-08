import { describe, it, expect, vi } from 'vitest'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)

describe('get /api/genres', () => {
  it('returns expected data', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/genres.get')
    // @ts-expect-error: no parameters
    const data = await handler.default()
    const uniqueGenres = new Set(data.genres)

    expect(data.genres).toHaveLength(59)
    expect(data.count).toBe(59)
    expect(uniqueGenres.size).toBe(data.genres.length)
  })
})
