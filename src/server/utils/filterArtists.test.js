import { describe, expect, it } from 'vitest'
import { filterArtists } from './filterArtists'

const data = [
  {
    id: 'blur',
    name: 'Blur',
    origins: ['England'],
    genres: ['Alternative Rock'],
    link: 'http://www.blur.co.uk',
    logos: [
      {
        title: 'Leisure',
        svg: 'blur_leisure.svg',
      },
    ],
  },
  {
    id: 'acdc',
    name: 'AC⚡DC',
    origins: ['Australia'],
    genres: ['Hard Rock'],
    link: 'http://www.acdc.com',
    logos: [
      { title: 'Powerage', svg: 'acdc_powerage.svg' },
      {
        title: 'Back in Black',
        svg: 'acdc.svg',
        className: 'acdc--back-in-black',
        css: 'acdc_back-in-black.css',
        inverse: true,
      },
    ],
  },
]

const returnACDCLogos = [
  { title: 'Powerage', svg: '/logos/acdc/acdc_powerage.svg' },
  {
    title: 'Back in Black',
    svg: '/logos/acdc/acdc_back-in-black.svg',
    inverse: true,
  },
]

const returnBlurLogos = [
  { title: 'Leisure', svg: '/logos/blur/blur_leisure.svg' },
]

describe('filterArtists', () => {
  it('return sorted artists data', () => {
    expect.hasAssertions()

    const { artists, count } = filterArtists(data)

    expect(count).toBe(2)
    expect(artists).toStrictEqual([
      { ...data[1], logos: returnACDCLogos },
      { ...data[0], logos: returnBlurLogos },
    ])
  })

  it('return correct when data is empty', () => {
    expect.hasAssertions()

    const { artists, count } = filterArtists()

    expect(count).toBe(0)
    expect(artists).toStrictEqual([])
  })
})
