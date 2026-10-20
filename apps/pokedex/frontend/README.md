# Pokédex frontend

React + TypeScript app (Vite). Talks to the **local Spring Boot API**, not PokeAPI directly.

## Run

```bash
npm install
npm run dev
```

Requires the [database](../db/) and [backend](../backend/) to be running. See the [root README](../README.md).

## Config

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE` | `/api` | API prefix (Vite proxies to `localhost:8082` in dev) |

## Structure

- `src/App.tsx` — state and data loading
- `src/api/pokemonApi.ts` — `fetch` calls
- `src/components/` — UI pieces
- `src/types/pokemon.ts` — TypeScript types matching API JSON
