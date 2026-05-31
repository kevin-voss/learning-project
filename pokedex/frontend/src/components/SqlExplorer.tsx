interface SqlQuery {
  label: string
  sql: string | null
}

interface SqlExplorerProps {
  queries: SqlQuery[]
}

export function SqlExplorer({ queries }: SqlExplorerProps) {
  const visible = queries.filter((query) => query.sql)

  if (visible.length === 0) {
    return null
  }

  return (
    <section className="sql-panel" aria-labelledby="sql-explorer-heading">
      <h2 id="sql-explorer-heading" className="sql-panel__heading">
        SQL queries
      </h2>
      <p className="sql-panel__hint">
        Each API response includes the SQL that ran. The same lines appear in
        the Spring Boot console as <code>[SQL:…]</code> log entries.
      </p>
      {visible.map((query) => (
        <div key={query.label} className="sql-panel__block">
          <h3 className="sql-panel__subheading">{query.label}</h3>
          <pre className="sql-panel__code">
            <code>{query.sql}</code>
          </pre>
        </div>
      ))}
    </section>
  )
}
