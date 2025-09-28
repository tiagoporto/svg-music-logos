export type Origins =
  | 'Argentina'
  | 'Australia'
  | 'Brazil'
  | 'Canada'
  | 'Denmark'
  | 'England'
  | 'Finland'
  | 'France'
  | 'Germany'
  | 'Iceland'
  | 'Ireland'
  | 'Japan'
  | 'Mexico'
  | 'Netherlands'
  | 'New Zealand'
  | 'Norway'
  | 'Scotland'
  | 'Sweden'
  | 'Switzerland'
  | 'USA'

export interface Logo {
  title: string
  svg: string
  inverse?: boolean
}

export interface Artist {
  id: string
  name: string
  nameTemplate?: string
  origins: Origins[]
  genres?: string[]
  link: string
  logos: Logo[]
}

export type Logos = Omit<Artist, 'logos'> & {
  logo: Logo
}
