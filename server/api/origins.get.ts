import { data } from '../db'
import type { Origins } from '../db/schema'
import { filterOrigins } from '../utils'

export default defineEventHandler(async () => {
  const originsData: { origins: Origins[]; count: number } = filterOrigins(data)
  return originsData
})
