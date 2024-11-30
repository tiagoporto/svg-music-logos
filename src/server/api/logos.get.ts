import { data, Logo, Artists } from '../db'

interface LogoByArtist extends Omit<Artists, 'logos'> {
  logo: Logo
}

export default defineEventHandler(async () => {
  const splittedLogos: LogoByArtist[] = []
  data.sort((a, b) => a.name.localeCompare(b.name))

  data.forEach(({ logos, ...restParams }) => {
    logos.forEach((logo) => {
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
