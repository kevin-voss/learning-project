# AI engineering track

A step-by-step dark field guide for AI systems: LLM internals, tokens and cost,
context budgeting, RAG and search, tool calling, MCP, AG-UI, agents and orchestration,
memory, prompt-injection defense, guardrails, evals, and AWS-style production systems.

## Open it

- Double-click `index.html` (works offline from `file://`), or serve the folder
  (`python3 -m http.server`) and open `http://localhost:8000`.
- The landing page links all 24 topics in reading order. Each topic is one plain
  HTML page under `content/` with prev/next links at the bottom: read them like a book.
- The sidebar (toggle with `☰`) lists every topic, `/` filters it, and it collapses
  so pages use the full screen width.
- Mermaid diagrams load their library from a CDN on first view and render at full
  content width. Offline, the readable diagram source shows instead.

## Print / PDF

Every topic page prints cleanly on its own: light palette, navigation hidden, code
blocks and solutions expanded. Use the `print` button in the top bar or the browser
print dialog. Print page by page (or "open all in tabs") — there is deliberately no
giant single-file PDF mode.

## Structure

| Path | Role |
|------|------|
| `index.html` | Landing page: reading order + links to all topics |
| `css/tokens.css` | Design tokens (near-black palette, one gold accent) |
| `css/base.css` | Reset, typography, topbar, sidebar, pager |
| `css/components.css` | Code cards, tables, tooltips, cards, diagrams |
| `css/flow.css` | Topic stages: why → solutions → when → example |
| `css/print.css` | Light print palette, page-break hygiene |
| `js/app.js` | Sidebar + prev/next nav, code toggle/copy, tooltips, accordions, mermaid |
| `content/README.md` | Authoring contract + section map (read before editing pages) |
| `content/01-foundations/` … `content/10-quickref/` | One HTML page per topic |

Reading arc: foundations → tokens/context → RAG/search → tools/MCP → agents →
memory → security → evals → production → quick reference.

## Page rhythm

Every topic page follows the same loop, so the guide stays predictable:

1. title + one-line description
2. **Why you need it** — what breaks without this
3. **Solutions** — the real alternatives, one expandable card each (details inside)
4. **When to use · when not** — pros and cons side by side
5. **Example** — a real scenario with a short code sample
6. optional **Watch out** and **Remember** closers

## Adding or editing a topic

Read `content/README.md` first (page skeleton, stage markup, density rules,
hard writing rules: no em-dashes, no semicolons in prose, ≤ 5 files per folder).
Pages are plain HTML with a fixed shell — no build step, no templating.

## Scope notes and deferrals

- AWS **exam** content lives in [`../certifications/aws-genai-pro/`](../certifications/aws-genai-pro/).
  This track covers engineering patterns only and links there for exam prep.
- Audio/video generation is intentionally light (one subsection in multimodal):
  this is a side path, the Java track is the main spine.
- No fine-tuning hands-on labs here: decision guidance only, labs belong to project sheets.

**Repo spine:** [`docs/LEARNING_PATH.md`](../../docs/LEARNING_PATH.md) · this track is optional depth.
