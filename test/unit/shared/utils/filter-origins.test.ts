import { describe, expect, it } from 'vitest'

import type { Artist } from '#shared/schema'
import { filterOrigins } from '@@/shared/utils/filter-origins'

const data =
  [
    {
      id: 'yes',
      origins: ['England'],
    },
    { id: 'samael', origins: ['Switzerland'] },
    { id: 'jimmy-page-and-the-black-crowes', origins: ['England', 'USA'] },
    { id: 'korzus', origins: ['Brazil'] },
    { id: 'unknown' },
  ] as Artist[]

describe(filterOrigins, () => {
  it('return sorted origins data', () => {
    expect.hasAssertions()

    const { origins, count } = filterOrigins(data)

    expect(count).toBe(4)
    expect(origins).toStrictEqual(['Brazil', 'England', 'Switzerland', 'USA'])
  })

  it('return correct when data is empty', () => {
    expect.hasAssertions()

    // @ts-expect-error testing empty data
    const { origins, count } = filterOrigins()

    expect(count).toBe(0)
    expect(origins).toStrictEqual([])
  })
})
