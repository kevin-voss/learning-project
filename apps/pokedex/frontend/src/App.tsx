import { useCallback, useEffect, useRef, useState } from 'react'
import {
  fetchPokemonDetail,
  fetchPokemonList,
  fetchPokemonTypes,
  parseOffsetFromNextUrl,
} from './api/pokemonApi'
import { FilterSortControls } from './components/FilterSortControls'
import { Header } from './components/Header'
import { PokemonDetail } from './components/PokemonDetail'
import { PokemonList } from './components/PokemonList'
import { SearchForm } from './components/SearchForm'
import { SqlExplorer } from './components/SqlExplorer'
import { StatusMessage } from './components/StatusMessage'
import {
  DEFAULT_LIST_FILTERS,
  type ListFilters,
  type Pokemon,
  type PokemonListItem,
  type StatusState,
} from './types/pokemon'

const emptyStatus: StatusState = { message: '', type: '' }

/**
 * Root component: holds list state, detail state, and coordinates API calls.
 * Same responsibilities as the old main.js + ui.js together.
 */
export default function App() {
  const [listItems, setListItems] = useState<PokemonListItem[]>([])
  const [nextOffset, setNextOffset] = useState<number | null>(0)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [status, setStatus] = useState<StatusState>(emptyStatus)
  const [filters, setFilters] = useState<ListFilters>(DEFAULT_LIST_FILTERS)
  const [availableTypes, setAvailableTypes] = useState<string[]>([])
  const [listSql, setListSql] = useState<string | null>(null)
  const [detailSql, setDetailSql] = useState<string | null>(null)
  const [typesSql, setTypesSql] = useState<string | null>(null)
  const hasLoadedOnce = useRef(false)

  const setLoading = (message: string) => {
    setStatus({ message, type: 'loading' })
  }

  const setError = (message: string) => {
    setStatus({ message, type: 'error' })
  }

  const clearStatus = () => {
    setStatus(emptyStatus)
  }

  const loadList = useCallback(
    async (offset: number, append: boolean, activeFilters: ListFilters) => {
      setLoading(append ? 'Loading more…' : 'Loading Pokémon…')
      try {
        const data = await fetchPokemonList(offset, activeFilters)
        setListItems((previous) =>
          append ? [...previous, ...data.results] : data.results,
        )
        setNextOffset(parseOffsetFromNextUrl(data.next))
        setListSql(data.sql)
        clearStatus()
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
        if (!append) {
          setListItems([])
        }
        setNextOffset(null)
      }
    },
    [],
  )

  /** Load types once, then the first list page. */
  useEffect(() => {
    async function loadInitialData() {
      try {
        const typesResponse = await fetchPokemonTypes()
        setAvailableTypes(typesResponse.types)
        setTypesSql(typesResponse.sql)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      }

      await loadList(0, false, DEFAULT_LIST_FILTERS)
      hasLoadedOnce.current = true
    }

    void loadInitialData()
  }, [loadList])

  /** Reload from page 1 when filter or sort changes (after initial load). */
  useEffect(() => {
    if (!hasLoadedOnce.current) {
      return
    }
    void loadList(0, false, filters)
  }, [filters, loadList])

  const loadPokemonDetail = useCallback(async (identifier: string) => {
    setLoading('Loading details…')
    try {
      const pokemon = await fetchPokemonDetail(identifier)
      setSelectedPokemon(pokemon)
      setDetailSql(pokemon.sql)
      clearStatus()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    }
  }, [])

  async function handleLoadMore() {
    if (nextOffset === null) return
    await loadList(nextOffset, true, filters)
  }

  function handleSearch(query: string) {
    if (!query) {
      setError('Type a Pokémon name to search.')
      return
    }
    void loadPokemonDetail(query)
  }

  return (
    <>
      <Header />
      <FilterSortControls
        filters={filters}
        availableTypes={availableTypes}
        onChange={setFilters}
      />
      <SearchForm onSearch={handleSearch} />
      <StatusMessage status={status} />
      <SqlExplorer
        queries={[
          { label: 'Types dropdown', sql: typesSql },
          { label: 'List (filter & sort)', sql: listSql },
          { label: 'Detail lookup', sql: detailSql },
        ]}
      />
      <main className="layout">
        <PokemonList
          items={listItems}
          onSelectPokemon={(name) => void loadPokemonDetail(name)}
          hasMore={nextOffset !== null}
          onLoadMore={() => void handleLoadMore()}
        />
        <PokemonDetail pokemon={selectedPokemon} />
      </main>
    </>
  )
}
