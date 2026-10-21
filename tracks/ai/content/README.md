# Content authoring contract

One folder per topic group under `content/`. **One plain HTML page per topic**,
named `<section-id>.html`. Pages share the shell (topbar, sidebar, pager) built by
`../../js/app.js` and the styles in `../../css/`. The landing page is `../index.html`.

Page skeleton (already in place, do not restructure it — edit only the marked zone):

```html
<main class="main">
  <div class="content">
    <header class="topic-head">
      <div class="kicker">Part 3 · Tools & agents · 11/24</div>
      <h1>Tool calling & structured output</h1>
      <p class="lead">one short description sentence</p>
    </header>
    <!-- EDIT FROM HERE: the topic body -->

    …stages: why → solutions → when → example…

    <!-- EDIT TO HERE -->
    <nav class="pager" id="pager"></nav>
    <footer class="footer">…</footer>
  </div>
</main>
```

Keep the kicker, h1, lead, pager, footer and all `<head>`/chrome untouched.
H3 subtopics get stable ids `SECTION-ID--slug` (already present, keep them).

## Topic flow (REQUIRED, in this order)

```html
<div class="stage-label sl-why">Why you need it</div>
<div class="why">
  <ul><li><b>Lead word:</b> one short line.</li></ul>
</div>

<div class="stage-label sl-sol">Solutions</div>
<p>one line framing the options…</p>
<div class="sol-list">
  <div class="sol-item">
    <button class="sol-head" type="button">
      <span class="sol-no">A</span>
      <span class="sol-name">Solution name <span class="sol-tag best">default</span></span>
      <span class="sol-sum">one-line summary, readable while closed</span>
      <span class="sol-chev">▶</span>
    </button>
    <div class="sol-body"><div class="sol-inner"><div class="sol-content">
      <h4>How it works</h4>
      <ul><li>mechanics, budgets, failure modes</li></ul>
    </div></div></div>
  </div>
</div>

<div class="stage-label sl-when">When to use · when not</div>
<div class="pc">
  <div class="pc-col pros"><h4 class="pc-h">Use when</h4><ul><li>…</li></ul></div>
  <div class="pc-col cons"><h4 class="pc-h">Skip when</h4><ul><li>…</li></ul></div>
</div>

<div class="stage-label sl-ex">Example</div>
<div class="example">
  <p class="ex-note">what this shows and how to read it…</p>
  <pre class="code" data-lang="python" data-file="demo.py"><code>…</code></pre>
</div>

<!-- optional compact closers -->
<div class="stage-label sl-extra">Watch out</div>
<div class="pit-list"><ul><li>trap</li></ul></div>
<div class="stage-label sl-extra">Remember</div>
<div class="remember"><ul><li>3-5 bullets</li></ul></div>
```

## Density rules (hard — the sheet must scan, not spam)

- Lead: one sentence. Why: max 4 bullets, each one line.
- Solutions: 2-5 items. `sol-sum` max ~10 words. Inside each item: 2-3 h4 groups,
  each 3-5 short bullets (max ~14 words per bullet).
- Pros/cons: max 4 items per column, one line each.
- Example: 2-3 sentences of explanation + one code sample ≤ 25 lines.
- Watch out + Remember: max 5 bullets each, one line each.
- Target page body (between the edit markers): ≤ 150 lines of HTML.
- Cut filler words. Every bullet must earn its line. Prefer concrete numbers and names.

## Cross-page links

`<a class="xl" href="same-folder-page.html">name</a>` or
`<a class="xl" href="../04-tools-mcp/tool-calling.html">name</a>` for other folders.
With subtopic: append `#SECTION-ID--slug`. Never `#section-id` bare (that was the old
single-page format) and never `§01` numbers.

## Diagrams (mermaid) — readability rules

- Wrap: `<div class="diagram"><div class="diag-body"><pre class="mermaid">…</pre></div></div>`.
- Diagrams render at 100% of the content width, so keep sources SIMPLE:
  max 8 nodes, max 4 edge labels, max 4 sequence participants.
- Labels: max 4 words per line, wrap with `&lt;br/&gt;`. No sentences in nodes.
- Prefer `flowchart TD`. If a diagram does not earn its place, delete it.

## Writing rules (hard)

- No em-dash (`—`) anywhere, including code comments and tooltips. Use `·` or `,`.
- No semicolon (`;`) in prose or tooltips. Only inside `<pre>` code samples.
- Bullets and short sentences. No walls of text.
- Simple first, then why, then technical depth.

## Components

- Code: `<pre class="code" data-lang="python" data-file="name.py"><code>…</code></pre>`, collapsed + copy wired by app.js. Highlight manually with spans: `tk-k` keyword, `tk-s` string, `tk-f` function, `tk-n` number, `tk-c` comment, `tk-t` type/tag, `tk-a` attribute.
- Table: wrap in `<div class="tbl-wrap">`, columns `Use when / Avoid when / Watch out` with `td class="u"/"avoid"/"watch"` and `th class="hu"/"ha"/"hw"`. Only for 4+ option comparisons.
- Tooltip term: `<button class="term" type="button" data-tip="short definition">word</button>`.
- Cards: `<div class="grid2"><div class="wcard"><h4>title</h4><ul>…</ul></div></div>`.
- Chips: `<span class="wlabel why">why</span>`, `<span class="wlabel gotcha">gotcha</span>`.
- Callouts: `<p class="note">`, `<p class="warn">`, `<p class="danger">`.

## Section id map (= file names)

| id (file) | part | topic |
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
| `quickref` | 5 | The 30-second layer (summary cards, flow exempt) |

## Limits and checks before you commit a page

- ≤ 400 total lines per HTML file · body between edit markers ≤ 150 lines.
- ≤ 5 files per folder (subfolders do not count).
- `grep -n "—" <file>` empty · `grep -c 'class="beat' <file>` zero ·
  `grep -c 'sol-item' <file>` ≥ 2 (except quickref) · no `href="#` single-page anchors left.
