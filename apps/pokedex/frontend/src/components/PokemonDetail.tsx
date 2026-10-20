import type { Pokemon } from '../types/pokemon'
import {
  decimetersToMeters,
  formatPokemonName,
  getPokemonSpriteUrl,
  hectogramsToKilograms,
} from '../utils/pokemonFormat'

interface PokemonDetailProps {
  pokemon: Pokemon | null
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const isEmpty = pokemon === null

  return (
    <section className="detail-panel" aria-labelledby="detail-heading">
      <h2 id="detail-heading" className="panel-heading">
        Details
      </h2>
      <article className={`detail ${isEmpty ? 'detail--empty' : ''}`}>
        {isEmpty ? (
          <p className="detail__placeholder">
            Select a Pokémon from the list or search by name.
          </p>
        ) : (
          <DetailContent pokemon={pokemon} />
        )}
      </article>
    </section>
  )
}

function DetailContent({ pokemon }: { pokemon: Pokemon }) {
  const spriteUrl = getPokemonSpriteUrl(pokemon)
  const typeNames = pokemon.types.map((entry) => entry.type.name).join(', ')

  return (
    <>
      {spriteUrl && (
        <img
          className="detail__image"
          src={spriteUrl}
          alt={`${formatPokemonName(pokemon.name)} sprite`}
          width={160}
          height={160}
        />
      )}
      <h3 className="detail__title">{formatPokemonName(pokemon.name)}</h3>
      <dl className="detail__meta">
        <dt>National dex</dt>
        <dd>#{pokemon.id}</dd>
        <dt>Types</dt>
        <dd>{typeNames}</dd>
        <dt>Height</dt>
        <dd>{decimetersToMeters(pokemon.height)} m</dd>
        <dt>Weight</dt>
        <dd>{hectogramsToKilograms(pokemon.weight)} kg</dd>
      </dl>
    </>
  )
}
