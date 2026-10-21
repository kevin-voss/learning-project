# Lesson authoring contract

Each topic is an independently readable plain HTML page in its part folder. Keep the shared shell and stable IDs for existing headings so bookmarks and cross-topic links continue to work. Write lesson prose in HTML; keep JavaScript light and limited to navigation metadata, disclosure, and diagrams, never lesson prose or a lesson registry.

## Lesson structure

Use semantic `<header>`, `<main>`, `<section>`, `<nav>`, and `<footer>` elements. Choose headings that fit the topic. A useful flow often introduces the problem, states a central model, explains mechanisms and alternatives, then works through an example and a checkpoint. Advanced detail is welcome when it earns its place. Use paragraphs, lists, tables, code, and disclosures to create varied pacing; do not make every block a card.

The shared shell supplies the sticky header, contents panel, current-section anchors, and previous/next progression. Preserve the IDs of existing chapter headings. Topic content remains visible without JavaScript, and disclosures use native `<details>` and `<summary>` where appropriate.

## Shared component classes

- `.topic-head`, `.lead`: topic title and short orientation.
- `.chapter-summary`: brief learning objectives.
- `.key-idea`: the central model or claim.
- `.stage-label`, `.why`: numbered section headings and rationale. Pages may instead use `.beat` sections whose `h2.beat-h` holds a short `.bt` label (shown in the contents panel) and a `.bh` title.
- `.sol-list`, `.sol-item`, `.sol-head`, `.sol-body`, `.sol-inner`, `.sol-content`: optional expandable alternative or mechanism groups.
- `.pc`, `.pc-col`: useful comparison columns.
- `.example`, `.lab-check`: worked example and hands-on checkpoint.
- `.pit-list`, `.remember`: failure modes and concise synthesis.
- `.diagram`, `.diag-body`, `pre.mermaid`: Mermaid diagram frame and source.
- `.code`, `.term`, `.references`: code, inline definitions, and source links.
- `.steps`, `.stack`, `.stats`, `.viz-bars`: native visual explainers (process strip, layer stack, key numbers, bar comparison with `style="--v:62%"`). Use them to replace prose that describes a sequence, layers or magnitudes.
- `.widget[data-widget]`: interactive explainer. Author all markup in the lesson; register its behaviour in `js/runtime/widgets.js`.

New chapters: add the file under the right part folder (max five files per folder), add one entry to `js/runtime/data.js` and one row to `index.html`, then run the checks listed in `../README.md`.

Use real links with descriptive text. Local topic links should be relative to the current part folder, preserve existing heading fragments, and resolve when opened directly as well as from the portal build.

## Diagrams and code

Use Mermaid for relationships that benefit from a visual model. Keep labels concise (about 22 characters per line) and keep each graph within about 1000×650px at its natural 18px label size: use at most 4–5 nodes per row and split long pipelines into `subgraph` rows with `direction LR`. Write a caption that names the insight, not "this diagram shows". The shared runtime uses pinned Mermaid 11.12.0, a light high-contrast theme, a horizontally and vertically scrollable frame, and Fit, 100%, zoom, and accessible expand controls. Leave Mermaid source in `<pre class="mermaid">` so failures remain understandable. Code examples stay in HTML `<pre class="code"><code>` blocks.

## Source constraints

Keep authored code readable. Aim for focused files under about 400 lines, and split reusable support into clear subfolders when a directory would exceed five immediate files. Avoid storing page templates or lesson registries in JavaScript. The validator checks local links, anchors, assets, script syntax, structure, and source size.
