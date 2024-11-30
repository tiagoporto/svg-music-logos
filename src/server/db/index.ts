import jsonData from './data.json'

export interface Logo {
  title: string
  svg: string
  css?: string
  className?: string
  inverse?: boolean
}

export interface Artists {
  id: number
  name: string
  nameTemplate?: string
  origins: string[]
  genres: string[] | null
  link: string
  logos: Logo[]
}

export const data = jsonData as unknown as Artists[]
