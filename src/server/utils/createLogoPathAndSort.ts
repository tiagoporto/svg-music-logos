import * as changeCase from 'change-case'
import type { Logo, Artists } from '../db/schema'

interface LogoByArtist extends Omit<Artists, 'logos'> {
  logo: Logo
}
export const createLogoPathAndSort = (data: Artists[]) => {
  const splittedLogos: LogoByArtist[] = []

  data.forEach(({ logos, ...restParams }) => {
    logos.forEach((logo) => {
      const filename = `${restParams.id}_${changeCase.kebabCase(logo.title)}.svg`
      const path = `/logos/${restParams.id}/${filename}`

      splittedLogos.push({
        ...restParams,
        logo: {
          title: logo.title,
          inverse: logo.inverse,
          svg: path,
        },
      })
    })
  })

  return splittedLogos.sort((a, b) => a.name.localeCompare(b.name))
}
