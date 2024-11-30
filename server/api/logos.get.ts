import { data } from '../db'

export default defineEventHandler(async (event) => {
  const splittedLogos = []
  data.sort((a, b) => a.name.localeCompare(b.name))

  data.map(({ logos, ...restParams }, index) => {
    logos.map((logo) => {
      const path = `logos/${logo.svg.split('.')[0].split('_')[0]}`

      splittedLogos.push({
        ...restParams,
        logo: {
          ...logo,
          ...Object.assign(
            { svg: `${path}/${logo.svg}` },
            logo?.css && { css: `${path}/${logo.css}` },
          ),
        },
      })
    })
  })

  return { logos: splittedLogos, length: splittedLogos.length }
})
