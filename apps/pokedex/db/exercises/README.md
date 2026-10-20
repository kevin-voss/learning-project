# SQL exercises

Practice queries against your local Pokédex database.

## Open Adminer

1. Start the database: `docker compose up -d` (from `pokedex/db/`)
2. Open **http://localhost:8081**
3. Log in:

| Field | Value |
|-------|-------|
| System | PostgreSQL |
| Server | `postgres` (Docker service name) |
| Username | `pokedex` |
| Password | `pokedex_dev` |
| Database | `pokedex` |

Click **SQL command** in the left menu to run queries.

## Tables

- `pokemon` — one row per Pokémon (id, name, height_dm, weight_hg, sprite_url)
- `pokemon_type` — types per Pokémon (pokemon_id, slot, type_name)
- `pokemon_summary` — **view** joining types into one row (easier `SELECT` practice)

## Exercises

Run files in order (copy/paste into Adminer):

1. [`01-select-all.sql`](01-select-all.sql) — basic `SELECT`
2. [`02-filter-by-type.sql`](02-filter-by-type.sql) — `WHERE` + `JOIN`
3. [`03-aggregate-by-type.sql`](03-aggregate-by-type.sql) — `GROUP BY` + `COUNT`
4. [`04-use-summary-view.sql`](04-use-summary-view.sql) — query the view

Try changing filters (e.g. `fire`, `pikachu`) and predict the result before running.
