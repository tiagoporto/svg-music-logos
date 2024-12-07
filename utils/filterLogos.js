import * as changeCase from 'change-case'

export const filterLogos = (data) => {
  const logos = []

  data.forEach(({ logos: dataLogo, ...restParams }) => {
    dataLogo.forEach((logo) => {
      const filename = `${restParams.id}_${changeCase.kebabCase(logo.title)}.svg`
      const path = `/logos/${restParams.id}/${filename}`

      logos.push({
        ...restParams,
        logo: {
          title: logo.title,
          svg: path,
          ...(logo.inverse !== undefined ? { inverse: logo.inverse } : {}),
        },
      })
    })
  })

  return {
    logos: logos.sort((a, b) => a.name.localeCompare(b.name)),
    count: logos.length,
  }
}
