import { describe, expect, it } from 'vitest'
import { filterGenres } from './filter-genres'

const data = [
  {
    id: 'acdc',
    genres: ['Hard Rock'],
  },
  { id: 'samael', genres: ['Black Metal', 'Industrial Metal'] },
  { id: 'deep-purple', genres: ['Hard Rock'] },
  { id: 'unknown' },
]

// eslint-disable-next-line vitest/valid-title
describe(filterGenres, () => {
  it('return sorted genres data', () => {
    expect.hasAssertions()

    const { genres, count } = filterGenres(data)

    expect(count).toBe(3)
    expect(genres).toStrictEqual([
      'Black Metal',
      'Hard Rock',
      'Industrial Metal',
    ])
  })

  it('return correct when data is empty', () => {
    expect.hasAssertions()

    const { genres, count } = filterGenres()

    expect(count).toBe(0)
    expect(genres).toStrictEqual([])
  })
})
