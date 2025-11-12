import type { Artist } from '#shared/schema.ts'

import { createSVGPath } from './create-svg-path.ts'
import { returnBackgroundOrInverse } from './return-background-or-inverse.ts'

export const filterLogos = (data: Artist[]) => {
  if (!data) {
    return { logos: [], count: 0 }
  }
  const logos = []

  for (const { logos: dataLogo, ...restParams } of data) {
    for (const logo of dataLogo) {
      const path = createSVGPath({ id: restParams.id, title: logo.title })

      logos.push({
        ...restParams,
        logo: {
          title: logo.title,
          svg: path,
          ...returnBackgroundOrInverse(logo.inverse, logo.backgroundColor),
        },
      })
    }
  }

  return {
    // eslint-disable-next-line unicorn/no-array-sort
    logos: logos.sort((a, b) => a.name.localeCompare(b.name)),
    count: logos.length,
  }
}
