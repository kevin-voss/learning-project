## Line highlights domain

**Read-only presentation** of source: turning plain text lines into HTML for tinted read-only layers and turning multi-line strings into **`CodeLine`** rows for the viewer.

| Module | Role |
|--------|------|
| `syntaxTint.ts` | `escapeHtml`, `syntaxTintHtml` for overlay spans |
| `codeLines.ts` | `codeStringToCodeLines` — one segment per line with `pg-{row}-0` ids |

Replay stepping in **walkthroughs** uses the same `pg-*` id scheme so focus segments line up between guided examples and playground runs.
