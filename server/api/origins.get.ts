import type { Origins } from '#shared/schema'
import { filterOrigins } from '#shared/utils'
import { data } from '@@/server/db'

export default defineEventHandler(async () => {
  const originsData: { origins: Origins[], count: number } = filterOrigins(data)
  return originsData
})
