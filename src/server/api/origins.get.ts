import { filterOrigins } from '../utils'
import { data } from '../db'
import type { Origins } from '../db/schema'

export default defineEventHandler(async () => {
  const originsData: { origins: Origins[]; count: number } = filterOrigins(data)
  return originsData
})
