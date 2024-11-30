import jsonData from './data.json'

interface Logos {
  title: string
  svg: string
  css?: string
  className?: string
  inverse?: boolean
}

interface Artists {
  id: number
  name: string
  nameTemplate?: string
  origins: string[]
  genres: string[] | null
  link: string
  logos: Logos[]
}

export const data = jsonData as unknown as Artists[]
