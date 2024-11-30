import { data } from '../db'
export default defineEventHandler(async (event) => {
  // TODO: sort filter
  data.sort((a, b) => a.name.localeCompare(b.name))

  return { artists: data, length: data.length }
})
