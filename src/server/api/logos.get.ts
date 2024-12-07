import { createLogoPathAndSort } from '../utils/createLogoPathAndSort'
import { data } from '../db'

export default defineEventHandler(async () => {
  const logos = createLogoPathAndSort(data)

  return {
    logos,
    length: logos.length,
  }
})
