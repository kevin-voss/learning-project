/**
 * Network layer: talks to our Spring Boot API using fetch + async/await.
 * React components should import from this file instead of calling fetch directly.
 */

import { API_BASE, LIST_LIMIT } from '../config'
import type {
  ListFilters,
  Pokemon,
  PokemonListResponse,
  PokemonTypesResponse,
} from '../types/pokemon'

async function readErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string }
    return body.message ?? fallback
  } catch {
    return fallback
  }
}

function buildListUrl(offset: number, filters: ListFilters): string {
  const params = new URLSearchParams({
    limit: String(LIST_LIMIT),
    offset: String(offset),
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  })

  if (filters.type) {
    params.set('type', filters.type)
  }

  return `${API_BASE}/pokemon?${params.toString()}`
}

/**
 * Load one page of Pokémon names from the list endpoint.
 */
export async function fetchPokemonList(
  offset = 0,
  filters: ListFilters,
): Promise<PokemonListResponse> {
  const url = buildListUrl(offset, filters)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`List request failed (${response.status})`)
  }

  return (await response.json()) as PokemonListResponse
}

/**
 * Load distinct Pokémon types for the filter dropdown.
 */
export async function fetchPokemonTypes(): Promise<PokemonTypesResponse> {
  const url = `${API_BASE}/pokemon/types`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Types request failed (${response.status})`)
  }

  return (await response.json()) as PokemonTypesResponse
}

/**
 * Load full details for one Pokémon (sprite, types, height, weight, …).
 */
export async function fetchPokemonDetail(
  identifier: string | number,
): Promise<Pokemon> {
  const url = `${API_BASE}/pokemon/${identifier}`
  const response = await fetch(url)

  if (!response.ok) {
    const message = await readErrorMessage(
      response,
      `No Pokémon found for "${identifier}". Check the spelling.`,
    )
    throw new Error(message)
  }

  return (await response.json()) as Pokemon
}

/**
 * Read the offset query parameter from the API "next" link.
 * Returns null when there is no next page.
 */
export function parseOffsetFromNextUrl(nextUrl: string | null): number | null {
  if (!nextUrl) {
    return null
  }
  const url = nextUrl.startsWith('http')
    ? new URL(nextUrl)
    : new URL(nextUrl, window.location.origin)
  const offset = url.searchParams.get('offset')
  return offset === null ? null : Number(offset)
}

/**
 * Extract the national dex number from a list item URL.
 * Example: "/api/pokemon/25" → 25
 */
export function parseIdFromUrl(pokemonUrl: string): number {
  const segments = pokemonUrl.split('/').filter(Boolean)
  const idSegment = segments[segments.length - 1]
  return Number(idSegment)
}
