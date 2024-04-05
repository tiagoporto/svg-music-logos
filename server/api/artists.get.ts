import { data } from '../db'

export default defineEventHandler(async (event) => {
  let totalLogos = 0

  data.sort((a, b) => a.name.localeCompare(b.name))

  data.forEach(({ logos }, index) => {
    data[index].folder = logos[0].svg.split('.')[0].split('_')[0]
    totalLogos += logos.length
  })

  return { artists: data, lenght: data.length, totalLogos }
})
