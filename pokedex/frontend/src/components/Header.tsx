export function Header() {
  return (
    <header className="site-header">
      <h1 className="site-header__title">Pokédex</h1>
      <p className="site-header__intro">
        Browse Pokémon from our local PostgreSQL database via the Spring Boot API
        at <code>/api/pokemon</code>. Filter and sort run as real SQL — watch the
        queries in the UI and in the backend console.
      </p>
    </header>
  )
}
