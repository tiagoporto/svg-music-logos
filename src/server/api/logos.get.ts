import { filterLogos } from '../utils'
import { data } from '../db'

export default defineEventHandler(async () => {
  const logosData = filterLogos(data)

  return logosData
})
