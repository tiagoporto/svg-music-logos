import { data } from '../db'
export default defineEventHandler(async () => {
  return {
    artists: data.sort((a, b) => a.name.localeCompare(b.name)),
    length: data.length,
  }
})
