/**
 * Local Spring Boot API base path.
 * In dev, Vite proxies /api → http://localhost:8082 (see vite.config.ts).
 * On Vercel, /api/pokemon is routed to the pokedex_api service (see /vercel.json).
 */
export const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'

/** How many Pokémon names to load per page in the list. */
export const LIST_LIMIT = 20
