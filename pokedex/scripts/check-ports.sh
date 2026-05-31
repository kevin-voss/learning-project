#!/usr/bin/env bash
# Check whether Pokédex stack ports are free (macOS / Linux).
set -euo pipefail

PORTS=(5432 8081 8082 5173)
NAMES=("PostgreSQL" "Adminer" "Spring Boot API" "Vite frontend")

echo "Pokédex port check:"
echo ""

all_free=true
for i in "${!PORTS[@]}"; do
  port="${PORTS[$i]}"
  name="${NAMES[$i]}"
  if lsof -i ":${port}" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "  BUSY  ${port}  (${name})"
    lsof -i ":${port}" -sTCP:LISTEN 2>/dev/null | tail -n +2
    all_free=false
  else
    echo "  free  ${port}  (${name})"
  fi
done

echo ""
if $all_free; then
  echo "All ports are free. You can start the stack."
  exit 0
else
  echo "Stop conflicting processes first (see README → Free ports)."
  exit 1
fi
