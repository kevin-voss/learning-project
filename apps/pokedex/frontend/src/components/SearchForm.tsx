import type { FormEvent } from 'react'

interface SearchFormProps {
  onSearch: (query: string) => void
}

/**
 * Controlled search form — parent handles the actual API call.
 */
export function SearchForm({ onSearch }: SearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.elements.namedItem('search') as HTMLInputElement
    onSearch(input.value.trim().toLowerCase())
  }

  return (
    <form
      className="search-form"
      aria-label="Search Pokémon by name"
      onSubmit={handleSubmit}
    >
      <label className="search-form__label" htmlFor="search-input">
        Search by name
      </label>
      <div className="search-form__row">
        <input
          id="search-input"
          className="search-form__input"
          type="search"
          name="search"
          placeholder="e.g. pikachu"
          autoComplete="off"
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}
