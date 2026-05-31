import type { ListFilters } from '../types/pokemon'

interface FilterSortControlsProps {
  filters: ListFilters
  availableTypes: string[]
  onChange: (filters: ListFilters) => void
}

const SORT_OPTIONS: { value: ListFilters['sortBy']; label: string }[] = [
  { value: 'id', label: 'National #' },
  { value: 'name', label: 'Name' },
  { value: 'height', label: 'Height' },
  { value: 'weight', label: 'Weight' },
]

export function FilterSortControls({
  filters,
  availableTypes,
  onChange,
}: FilterSortControlsProps) {
  function update(partial: Partial<ListFilters>) {
    onChange({ ...filters, ...partial })
  }

  return (
    <section className="filter-sort" aria-labelledby="filter-sort-heading">
      <h2 id="filter-sort-heading" className="filter-sort__heading">
        Filter &amp; sort (via SQL)
      </h2>
      <p className="filter-sort__hint">
        These controls change the SQL query the backend runs against PostgreSQL.
      </p>
      <div className="filter-sort__grid">
        <label className="filter-sort__field">
          <span className="filter-sort__label">Type</span>
          <select
            className="filter-sort__select"
            value={filters.type ?? ''}
            onChange={(event) =>
              update({ type: event.target.value || null })
            }
          >
            <option value="">All types</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-sort__field">
          <span className="filter-sort__label">Sort by</span>
          <select
            className="filter-sort__select"
            value={filters.sortBy}
            onChange={(event) =>
              update({
                sortBy: event.target.value as ListFilters['sortBy'],
              })
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-sort__field">
          <span className="filter-sort__label">Order</span>
          <select
            className="filter-sort__select"
            value={filters.sortOrder}
            onChange={(event) =>
              update({
                sortOrder: event.target.value as ListFilters['sortOrder'],
              })
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </section>
  )
}
