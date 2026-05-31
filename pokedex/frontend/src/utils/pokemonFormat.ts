/** Turn API names like "mr-mime" into "Mr Mime" for display. */
export function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/** PokeAPI stores height in decimeters (tenths of a meter). */
export function decimetersToMeters(decimeters: number): string {
  return (decimeters / 10).toFixed(1)
}

/** PokeAPI stores weight in hectograms (tenths of a kilogram). */
export function hectogramsToKilograms(hectograms: number): string {
  return (hectograms / 10).toFixed(1)
}

/** Pick the best sprite URL from a Pokémon detail object. */
export function getPokemonSpriteUrl(pokemon: {
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: { front_default: string | null }
    }
  }
}): string | null {
  return (
    pokemon.sprites.front_default ??
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    null
  )
}
