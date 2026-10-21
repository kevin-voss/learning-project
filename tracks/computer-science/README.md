# Core CS Concepts Roadmap

Static interactive learner for beginner-friendly computer science. Open `index.html` in a browser (or serve the folder locally). No build step.

The sidebar follows the learning path in `hub/path.mjs`: Start here, JavaScript basics, How the web works, Java 1-3, Data and servers, Go deeper. Lessons that are not on the path come after them in groups named "More: ...".

## Layout

```
tracks/computer-science/
├── index.html            # Shell and script order (= sidebar order)
├── scripts/
│   └── verify-demos.mjs  # Smoke test: demos, lesson ids, folder and file size rules
├── css/
│   ├── main.css          # @imports everything below, in cascade order
│   ├── core/             # tokens (bridge to hub/theme --lp-* tokens), base, layout, components, responsive
│   ├── content/          # lesson page, blocks, "Try it" and "Check" boxes
│   └── demos/            # demo shell + one folder per demo group
└── js/
    ├── ns.js, app.js, globals.js
    ├── app/              # state, nav, navigation (hash routing), content, content-blocks, glossary/
    ├── utils/            # messages, theme (light/dark: Mermaid colours, canvas redraw)
    ├── data/             # one folder per topic: tools, structures, web, memory, ...
    │   └── aliases.js    # old lesson ids -> new home (merged or removed lessons)
    └── demos/            # ui.js, playground.js, init.js + structures/, algorithms/, systems/, web-infra/
```

## Conventions

- Curriculum registers on `DS.curriculum`; **lesson order = `index.html` script order**. The sidebar number is the position, so it is always unique.
- **Page shape** (docs/STYLE.md): picture (`analogy`) → one idea (`whatIsIt`) → tiny example (`codeText`) → `tryIt` → `checklist` + `check`. One idea per sub-lesson. Extra detail goes into sub-lessons labelled "Deeper: ..." or "Look inside: ..." at the end.
- **Removed or merged lessons**: add `{ id, to }` to `js/data/aliases.js` so old links keep working.
- **`demoType`** on a lesson or subpage must match a key in `DS.demoRunners` in `js/demos/init.js`. Run `node scripts/verify-demos.mjs` after adding demos.
- **`relatedIds`**: optional array of lesson `id` strings; renders a Related Lessons block with navigation.
- **`keywords`**: optional array of glossary term strings; renders chips under the lesson subtitle.
- **Subpages**: use `subPages` with `id` slugs for hash URLs (`#lesson-id/sub-slug`).
- **Theme**: no hex colours in track CSS/JS. Use the track variables in `css/core/tokens.css`; they come from `hub/theme/tokens.css`, so light and dark both work.
- **Animations**: `anim: 'shelf'` on a lesson or sub-lesson adds `<div data-anim="shelf">` after the picture (scenes in `hub/theme/anim/`).
- **Glossary**: add beginner terms to `js/app/glossary/terms-*.js`.
- **Progress**: `localStorage` keys `dsCompleted` (completion) and `dsLastVisited` (resume + hash sync).
- **Hash routing**: `#arrays`, `#http-requests-responses/request-anatomy` — shareable deep links.

## Content author checklist

For each new lesson:

1. `analogy` + `realWorldExample` + `whatIsIt` + `whyUse`
2. `conceptSections` (or `subPages` when >3 distinct ideas)
3. `checklist` — “You understand this when…” (3 items) and `check: [{ q, a }]` (answers stay hidden)
4. `demoType` + working runner in `init.js` (if visual/step-based)
5. `keywords` + glossary entries for new vocabulary
6. `relatedIds` to bridge prerequisites and follow-ups
7. Accurate `codeExample` (no misleading shortcuts, e.g. sort-based “heap”)

## Verify demos

```bash
node tracks/computer-science/scripts/verify-demos.mjs
```

## Playground pattern

`js/demos/playground.js` provides guided steps + freeform input. Used by Linux terminal and Git demos. Reuse for new command-sandbox topics.
