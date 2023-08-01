export interface Country {
    name: string
    alpha2: string
    alpha3: string
    names: Name[]
    EU: boolean
    nationalities: Nationality[]
  }

  export interface Name {
    eng?: string
    esp?: string
    deu?: string
  }

  export interface Nationality {
    eng?: string
    esp?: string
    deu?: string
  }