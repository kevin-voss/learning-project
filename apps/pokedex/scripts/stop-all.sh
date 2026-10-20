#!/usr/bin/env bash
# Stop Pokédex database containers and common local dev processes on our ports.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Stopping Pokédex Docker stack…"
(cd "${ROOT}/db" && docker compose down 2>/dev/null) || true

echo "Stopping processes on ports 8082 (API) and 5173 (Vite) if owned by this project…"
for port in 8082 5173; do
  pids=$(lsof -ti ":${port}" -sTCP:LISTEN 2>/dev/null || true)
  if [ -n "${pids}" ]; then
    echo "  killing port ${port}: ${pids}"
    kill ${pids} 2>/dev/null || true
  fi
done

echo "Done. Run ./scripts/check-ports.sh to verify."
