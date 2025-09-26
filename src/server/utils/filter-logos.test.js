import { describe, expect, it } from 'vitest'

import { filterLogos } from './filter-logos'

const artists = {
  blur: {
    id: 'blur',
    name: 'Blur',
    origins: ['England'],
    genres: ['Alternative Rock'],
    link: 'http://www.blur.co.uk',
  },
  acdc: {
    id: 'acdc',
    name: 'AC⚡DC',
    origins: ['Australia'],
    genres: ['Hard Rock'],
    link: 'http://www.acdc.com',
  },
}

const data = [
  {
    ...artists.blur,
    logos: [
      {
        title: 'Leisure',
        svg: 'blur_leisure.svg',
      },
    ],
  },
  {
    ...artists.acdc,
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

// eslint-disable-next-line vitest/valid-title
describe(filterLogos, () => {
  it('return sorted artists data', () => {
    expect.hasAssertions()

    const { logos, count } = filterLogos(data)

    expect(count).toBe(3)
    expect(logos).toStrictEqual([
      {
        ...artists.acdc,
        logo: { title: 'Powerage', svg: '/logos/acdc/acdc_powerage.svg' },
      },
      {
        ...artists.acdc,
        logo: {
          title: 'Back in Black',
          svg: '/logos/acdc/acdc_back-in-black.svg',
          inverse: true,
        },
      },
      {
        ...artists.blur,
        logo: { title: 'Leisure', svg: '/logos/blur/blur_leisure.svg' },
      },
    ])
  })

  it('return correct when data is empty', () => {
    expect.hasAssertions()

    const { logos, count } = filterLogos()

    expect(count).toBe(0)
    expect(logos).toStrictEqual([])
  })
})
