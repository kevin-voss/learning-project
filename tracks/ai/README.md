# AI engineering track

Dark, print-ready field guide for AI systems: LLM internals, tokens and cost, context
budgeting, RAG and hybrid search, tool calling, MCP, AG-UI, agents and orchestration,
memory, prompt-injection defense, guardrails, evals, and AWS-style production systems.

## Open it

- Double-click `index.html` (works offline from `file://`), or serve the folder:
  `python3 -m http.server` from `tracks/ai/` and open `http://localhost:8000`.
- Everything is static: no build step, no dependencies to install.
- Mermaid diagrams load the library from a CDN on first view. Offline, the diagram
  source is shown instead (still readable). Fonts fall back to system stacks offline.

## Print / PDF

Use the `print / pdf` button in the top bar. The print stylesheet switches to a light
palette, hides navigation, expands every code block, and starts each topic on a new
page. Save as PDF from the browser print dialog.

## Structure

| Path | Role |
|------|------|
| `index.html` | Shell: top bar, sidebar, loads styles, scripts, content |
| `css/tokens.css` | Design tokens (palette, type, syntax colors) |
| `css/base.css` | Reset, typography, page frame, sidebar, top bar |
| `css/components.css` | Beats, cards, tables, code boxes, tooltips, badges |
| `css/print.css` | Light print palette, page breaks, expanded code |
| `js/app.js` | Renders sections, builds nav, code toggle + copy, tooltips, mermaid |
| `content/README.md` | Authoring contract + section id map (read before adding content) |
| `content/01-foundations/` | LLM internals · ML just enough + multimodal/OCR · fine-tune vs RAG vs prompt |
| `content/02-tokens-context/` | Tokens, cost, caching · context engineering and budgeting |
| `content/03-rag-search/` | RAG overview + ingestion · chunking · embeddings · search + rerank · variants (vector/graph/agentic) |
| `content/04-tools-mcp/` | Tool calling + structured output + DB sync · MCP · AG-UI |
| `content/05-agents-orchestration/` | Agent patterns · orchestration graphs · durable ops · ecosystem |
| `content/06-memory/` | Short-term vs long-term memory, summarization |
| `content/07-security/` | Prompt injection + data exfil · guardrails + least privilege |
| `content/08-evals/` | Eval pyramid, golden sets, LLM-as-judge, RAGAS-style metrics |
| `content/09-systems/` | System architecture · full systems on AWS |
| `content/10-quickref/` | The 30-second layer (one card per topic) |

Reading arc: foundations → tokens/context → RAG/search → tools/MCP → agents →
memory → security → evals → production. Each topic follows the same flow:
problem → solution → how it works → when to use → example → pitfalls → checklist.

The old single-file `cheatsheet.html` was split into the structure above and removed.

## Adding or editing content

Read `content/README.md` first (registration format, beat markup, component classes,
hard writing rules: no em-dashes, no semicolons in prose, ≤ 400 lines per file,
≤ 5 files per folder). Add the new file to `index.html` script includes, done.

## Scope notes and deferrals

- AWS **exam** content lives in [`../certifications/aws-genai-pro/`](../certifications/aws-genai-pro/).
  This track covers engineering patterns only and links there for exam prep.
- Audio/video generation is intentionally light (one subsection in multimodal):
  this is a side path, the Java track is the main spine.
- No fine-tuning hands-on labs here: decision guidance only, labs belong to project sheets.

**Repo spine:** [`docs/LEARNING_PATH.md`](../../docs/LEARNING_PATH.md) · this track is optional depth.
