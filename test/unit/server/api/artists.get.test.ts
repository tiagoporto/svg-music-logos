import { describe, it, expect, vi } from 'vitest'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)

describe('get /api/artist/id', () => {
  it('returns expected data', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/artists.get')
    // @ts-expect-error: no parameters
    const data = await handler.default()

    expect(data.artists).toHaveLength(196)
    expect(data.count).toBe(196)
  })
})
