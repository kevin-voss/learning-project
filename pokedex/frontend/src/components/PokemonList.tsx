import type { PokemonListItem } from '../types/pokemon'
import { parseIdFromUrl } from '../api/pokemonApi'
import { PokemonCard } from './PokemonCard'

interface PokemonListProps {
  items: PokemonListItem[]
  onSelectPokemon: (name: string) => void
  hasMore: boolean
  onLoadMore: () => void
}

export function PokemonList({
  items,
  onSelectPokemon,
  hasMore,
  onLoadMore,
}: PokemonListProps) {
  return (
    <section className="list-panel" aria-labelledby="list-heading">
      <h2 id="list-heading" className="panel-heading">
        Pokémon list
      </h2>
      <div className="pokemon-list">
        {items.map((item) => (
          <PokemonCard
            key={item.name}
            name={item.name}
            id={parseIdFromUrl(item.url)}
            onSelect={onSelectPokemon}
          />
        ))}
      </div>
      {hasMore && (
        <button type="button" className="load-more" onClick={onLoadMore}>
          Load more
        </button>
      )}
    </section>
  )
}
