import { data } from '#shared/db'
import type { Origins } from '#shared/db/schema'
import { filterOrigins } from '#shared/utils'

export default defineEventHandler(async () => {
  const originsData: { origins: Origins[], count: number } = filterOrigins(data)
  return originsData
})
