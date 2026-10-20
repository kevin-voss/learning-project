# Content authoring contract

One folder per topic group under `content/`. Each `.js` file registers one or more
sections with `AI_PUSH` (defined by `js/app.js`, loaded before content files):

```js
AI_PUSH({
  id: "tool-calling",        // unique url slug, kebab-case (see id map below)
  part: 3,                   // 1-5, controls nav grouping
  title: "Tool calling & structured output",  // renders as the H2
  blurb: "one short line under the title",    // optional
  html: `
  <p class="lead">…plain-words opener…</p>
  …beats, tables, code, diagrams…
  `,
});
```

The `html` string is a JS template literal:
- Escape backticks as <code>\\`</code> and dollar-brace as <code>\\${</code>. Prefer avoiding them entirely.
- Do NOT write the `<h2>` — the shell renders it from `title`. Start with `<p class="lead">`.
- Never include `<script>` tags or inline `style=` attributes (the animated flow lanes of the old sheet are now static).

## Topic flow (required per topic)

Cover the loop with beats, in this order unless the topic demands better (then note why in a comment):

1. `<div class="beat problem">` — what breaks without this
2. `<div class="beat solution">` — the idea in plain words
3. `<div class="beat how">` — mechanics, budgets, failure modes (H3 subtopics usually live here)
4. `<div class="beat when">` — when to use / when not (use/avoid/watch table)
5. `<div class="beat example">` — real world + tiny code
6. `<div class="beat pitfalls">` — security, cost, latency, quality traps
7. `<div class="beat checklist">` — 3-7 bullets to remember

Beat markup:

```html
<div class="beat problem">
  <div class="beat-h"><span class="bt">Problem</span><span class="bh">short hint line</span></div>
  <ul><li><b>Lead word:</b> short sentence.</li></ul>
</div>
```

Legacy `beat-block bb-*` classes from the old sheet also style correctly, but write new content with `.beat`.

## Writing rules (hard)

- No em-dash (`—`) anywhere, including code comments and tooltips. Use `·` or `,` instead.
- No semicolon (`;`) in prose or tooltips. Semicolons are fine inside `<pre>` code samples only.
- Bullets and short sentences. No walls of text.
- Simple first, then why, then technical depth.
- Cross-reference other topics with `<a class="xl" href="#SECTION-ID">name</a>`, never `§01` numbers.

## Components

- Code: `<pre class="code" data-lang="python" data-file="name.py"><code>…</code></pre>`, collapsed + copy wired by the shell. Highlight manually with spans: `tk-k` keyword, `tk-s` string, `tk-f` function, `tk-n` number, `tk-c` comment, `tk-t` type/tag, `tk-a` attribute.
- Table: wrap in `<div class="tbl-wrap">`, columns `Use when / Avoid when / Watch out` with `td class="u"/"avoid"/"watch"` and `th class="hu"/"ha"/"hw"`.
- Tooltip term: `<button class="term" type="button" data-tip="short definition">word</button>`.
- Diagram: `<div class="diagram"><div class="diag-body"><pre class="mermaid">graph TD…</pre></div></div>` (mermaid from CDN, source shows offline).
- Cards: `<div class="grid2"><div class="wcard"><h4>title</h4><ul>…</ul></div></div>`.
- Chips: `<span class="wlabel why">why</span>`, `<span class="wlabel gotcha">gotcha</span>`.
- Callouts: `<p class="note">`, `<p class="warn">`, `<p class="danger">`.

## Section id map (do not invent new ids without updating this file)

| id | part | topic |
|----|------|-------|
| `llm-internals` | 1 | How LLMs actually work |
| `ml-multimodal` | 1 | ML just enough + multimodal, vision, OCR |
| `finetune-decide` | 1 | Fine-tuning vs RAG vs prompting |
| `tokens-cost` | 1 | Tokens, cost, caching |
| `context-budget` | 1 | Context engineering and budgeting |
| `rag-overview` | 2 | RAG big picture + ingestion |
| `chunking` | 2 | Chunking methods |
| `embeddings` | 2 | Embeddings and vector stores |
| `search-rerank` | 2 | Search: keyword, vector, hybrid, BM25, rerankers |
| `rag-variants` | 2 | RAG variants: vector, graph, agentic |
| `tool-calling` | 3 | Tool calling, structured output, DB sync |
| `mcp` | 3 | MCP protocol |
| `ag-ui` | 3 | AG-UI and generative components |
| `agent-patterns` | 3 | Agent patterns: single, multi, planner, handoffs |
| `graphs` | 3 | Orchestration graphs (LangGraph style) |
| `ops` | 3 | Durable ops: retries, idempotency, DLQ, fan-out, HITL |
| `ecosystem` | 3 | Ecosystem: LangChain, LangGraph, Cursor SDK, Goose |
| `memory` | 4 | Memory: short-term, long-term, summarization |
| `injection` | 4 | Prompt injection and data exfil |
| `guardrails` | 4 | Guardrails and least privilege |
| `evals` | 5 | Evals and observability |
| `architecture` | 5 | The AI system architecture |
| `aws` | 5 | Full systems on AWS |
| `quickref` | 5 | The 30-second layer |

## Limits and checks before you commit a file

- ≤ 400 lines per file (split into a second file in the same folder if needed).
- ≤ 5 files per folder (subfolders do not count).
- Run `node --check <file>` (must pass) and `grep -n "—" <file>` (must be empty).
