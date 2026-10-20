#!/usr/bin/env node
/**
 * Fetches the first 151 Pokémon from PokeAPI and writes db/init/02-seed.sql.
 * Run from repo root: node pokedex/db/scripts/generate-seed.mjs
 */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_FILE = join(__dirname, '../init/02-seed.sql')
const LIMIT = 151
const DELAY_MS = 80
const MAX_RETRIES = 4

const POKEAPI = 'https://pokeapi.co/api/v2'

function escapeSql(value) {
  return String(value).replace(/'/g, "''")
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchJson(url) {
  let lastError
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(60_000) })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      lastError = error
      console.warn(`  retry ${attempt}/${MAX_RETRIES} for ${url}`)
      await sleep(500 * attempt)
    }
  }
  throw lastError
}

async function main() {
  console.log(`Fetching Pokémon list (limit=${LIMIT})…`)
  const list = await fetchJson(`${POKEAPI}/pokemon?limit=${LIMIT}&offset=0`)

  const lines = [
    '-- Auto-generated seed data (Kanto / first 151). Regenerate with generate-seed.mjs',
    '',
    'TRUNCATE pokemon_type, pokemon RESTART IDENTITY CASCADE;',
    '',
  ]

  let count = 0
  for (const item of list.results) {
    const detail = await fetchJson(item.url)
    const sprite =
      detail.sprites?.front_default ??
      detail.sprites?.other?.['official-artwork']?.front_default ??
      null

    lines.push(
      `INSERT INTO pokemon (id, name, height_dm, weight_hg, sprite_url) VALUES (${detail.id}, '${escapeSql(detail.name)}', ${detail.height}, ${detail.weight}, ${sprite ? `'${escapeSql(sprite)}'` : 'NULL'});`,
    )

    for (const typeEntry of detail.types) {
      lines.push(
        `INSERT INTO pokemon_type (pokemon_id, slot, type_name) VALUES (${detail.id}, ${typeEntry.slot}, '${escapeSql(typeEntry.type.name)}');`,
      )
    }

    count += 1
    if (count % 20 === 0) {
      console.log(`  …${count}/${list.results.length}`)
    }
    await sleep(DELAY_MS)
  }

  lines.push('')
  writeFileSync(OUT_FILE, lines.join('\n'), 'utf8')
  console.log(`Wrote ${count} Pokémon to ${OUT_FILE}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
