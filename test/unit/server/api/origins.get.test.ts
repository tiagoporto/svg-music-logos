import { describe, it, expect, vi } from 'vitest'

vi.stubGlobal('defineEventHandler', (function_: unknown) => function_)

describe('get /api/origins', () => {
  it('returns expected data', async () => {
    expect.hasAssertions()

    const handler = await import('@@/server/api/origins.get')
    // @ts-expect-error: no parameters
    const data = await handler.default()
    const uniqueOrigins = new Set(data.origins)

    expect(data.origins).toHaveLength(20)
    expect(data.count).toBe(20)
    expect(uniqueOrigins.size).toBe(data.origins.length)
  })
})
