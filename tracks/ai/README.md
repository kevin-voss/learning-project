# AI engineering field guide

A step-by-step technical guide for advanced learners, from model internals through retrieval, tools, agents, safety, evaluation, and production systems. Each topic is a complete plain HTML page with stable deep links and a shared navigation shell.

## Open and navigate

- From the repository root, run `python3 -m http.server` and open `http://localhost:8000/tracks/ai/index.html`. The interactive guide uses ES modules that browsers may block through `file://`; lesson HTML remains readable without JavaScript.
- Start with `content/01-foundations/llm-internals.html`; use the contents panel (☰, collapsible) and previous/next links to follow the 31-chapter sequence in six parts.
- Search: press ⌘K / Ctrl+K or `/` on any page. It fuzzy-matches chapter titles, section headings, mechanism cards and glossary terms, and falls back to full-text matches with snippets. Results jump straight to the section or open the matching card. On phones the contents panel opens as a drawer.
- Interactive explainers (for example the sampling playground in chapter 01 and the KV-cache calculator in chapter 06) are plain HTML in the lesson; `js/runtime/widgets.js` only computes values. Motion is limited to scroll reveal, bar fills and slow animated loop edges, and it is disabled under `prefers-reduced-motion`.
- This guide is the single source: there is no print, export or download mode.
- The Learning hub is linked from the index. The legacy `cheatsheet.html` route redirects to the index.
- Checks (from the repository root): `node tracks/ai/scripts/verify.mjs` for routes, anchors, assets, source size and Mermaid declarations; `node --test tracks/ai/scripts/tests/runtime.test.mjs` for diagram sizing, search and navigation helpers; `python3 -B tracks/ai/scripts/tests/example_boundaries_test.py` for the authored Python examples.

## Structure

| Path | Role |
| --- | --- |
| `index.html` | Six-part contents list and clear starting point |
| `content/<part>/<topic>.html` | One authored lesson per topic |
| `css/` | `tokens.css` maps the guide's own names onto the site theme (`hub/theme/tokens.css`, light and dark); components (incl. steps, stack, stats, bars, widgets, search), and topic rhythm |
| `js/app.js` | Stable entry point for the runtime modules in `js/runtime/` (navigation, content, diagrams, search, widgets; `data.js` is the chapter order) |
| `content/README.md` | Lesson authoring contract |

Lessons keep advanced technical detail. Use headings that fit the subject, then pace the explanation from a central model through mechanisms, trade-offs, examples, and a hands-on check. Shared classes and semantic HTML keep the guide coherent without forcing every topic into an identical outline.

Mermaid 11.12.0 is loaded from jsDelivr when available. Diagram colours come from the site theme and redraw when the reader switches light or dark. The source remains on the page if loading or rendering fails. Diagrams open at a readable size: wide graphs shrink to the frame but never below 78% (about 14px labels, scrolling instead), and small graphs grow to at most 115%. Controls show the current zoom and offer Fit (whole diagram), 100%, zoom steps, and an accessible expanded view. Keep new diagrams within about 1000×650px at 100%. Runtime regression checks use Node's built-in test runner; no additional test package is needed.

**Repo spine:** [`docs/LEARNING_PATH.md`](../../docs/LEARNING_PATH.md) · this guide is optional advanced depth.
