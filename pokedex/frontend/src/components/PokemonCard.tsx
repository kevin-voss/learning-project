import { formatPokemonName } from '../utils/pokemonFormat'

interface PokemonCardProps {
  name: string
  id: number
  onSelect: (name: string) => void
}

export function PokemonCard({ name, id, onSelect }: PokemonCardProps) {
  return (
    <button
      type="button"
      className="pokemon-card"
      onClick={() => onSelect(name)}
    >
      <span className="pokemon-card__number">#{id}</span>
      <span className="pokemon-card__name">{formatPokemonName(name)}</span>
    </button>
  )
}
