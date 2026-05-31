/** One row in the paginated Pokémon list endpoint. */
export interface PokemonListItem {
  name: string
  url: string
}

/** Filter and sort options sent as query params to the list endpoint. */
export interface ListFilters {
  type: string | null
  sortBy: 'id' | 'name' | 'height' | 'weight'
  sortOrder: 'asc' | 'desc'
}

export const DEFAULT_LIST_FILTERS: ListFilters = {
  type: null,
  sortBy: 'id',
  sortOrder: 'asc',
}

/** Response shape from GET /pokemon?limit=&offset= */
export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
  sql: string
}

/** Response shape from GET /pokemon/types */
export interface PokemonTypesResponse {
  types: string[]
  sql: string
}

/** Type slot on a full Pokémon resource. */
export interface PokemonTypeSlot {
  slot: number
  type: {
    name: string
    url: string
  }
}

/** Sprites we read from the detail response. */
export interface PokemonSprites {
  front_default: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

/** Full Pokémon resource from GET /pokemon/{name|id} */
export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonTypeSlot[]
  sprites: PokemonSprites
  sql: string
}

/** UI status for loading and error messages. */
export type StatusType = 'loading' | 'error' | ''

export interface StatusState {
  message: string
  type: StatusType
}
