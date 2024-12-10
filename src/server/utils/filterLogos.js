import { createSVGPath } from './createSVGPath.js'

export const filterLogos = (data) => {
  if (!data) {
    return { logos: [], count: 0 }
  }
  const logos = []

  data.forEach(({ logos: dataLogo, ...restParams }) => {
    dataLogo.forEach((logo) => {
      const path = createSVGPath({ id: restParams.id, title: logo.title })

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
