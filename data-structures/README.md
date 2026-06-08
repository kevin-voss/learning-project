# Core CS Concepts Roadmap

Static interactive learner for beginner-friendly computer science: **52 lessons** across foundations, data structures, algorithms, computer internals, Linux, web, DevOps, security, and databases. Open `index.html` in a browser (or serve the folder locally).

## Layout

```
data-structures/
├── index.html          # Shell — sidebar, content area, script load order (canonical curriculum order)
├── scripts/
│   └── verify-demos.mjs  # Smoke test: every demoType resolves in init.js
├── css/                # tokens, layout, content, demos, components, responsive
└── js/
    ├── ns.js           # `DS` namespace bootstrap
    ├── app.js          # Boot: restore hash/last visit, render nav + content
    ├── app/
    │   ├── state.js    # currentSection, completed (localStorage)
    │   ├── nav.js      # Sidebar + progress bar
    │   ├── content.js  # Section template, glossary, related lessons
    │   └── navigation.js # goTo, hash routing, markComplete
    ├── data/
    │   ├── concepts/   # Foundations, algorithms, web, security, extended lessons
    │   └── *.js        # Core data structure entries
    └── demos/
        ├── ui.js       # Shared demo shell
        ├── playground.js # Guided + freeform playground helper
        ├── init.js     # DS.demoRunners registry
        └── …           # One interactive demo per topic
```

## Conventions

- Curriculum registers on `DS.curriculum`; **lesson order = `index.html` script order** (plus `deployment-devops-lessons.js` splice after `docker-containers`).
- **`demoType`** on a lesson or subpage must match a key in `DS.demoRunners` in `js/demos/init.js`. Run `node scripts/verify-demos.mjs` after adding demos.
- **`relatedIds`**: optional array of lesson `id` strings; renders a Related Lessons block with navigation.
- **`keywords`**: optional array of glossary term strings; renders chips under the lesson subtitle.
- **Subpages**: use `subPages` with `id` slugs for hash URLs (`#lesson-id/sub-slug`).
- **Glossary**: add beginner terms to `DS.glossaryTerms` in `js/app/content.js`.
- **Progress**: `localStorage` keys `dsCompleted` (completion) and `dsLastVisited` (resume + hash sync).
- **Hash routing**: `#arrays`, `#http-requests-responses/request-anatomy` — shareable deep links.

## Content author checklist

For each new lesson:

1. `analogy` + `realWorldExample` + `whatIsIt` + `whyUse`
2. `conceptSections` (or `subPages` when >3 distinct ideas)
3. `checklist` — “You understand this when…”
4. `demoType` + working runner in `init.js` (if visual/step-based)
5. `keywords` + glossary entries for new vocabulary
6. `relatedIds` to bridge prerequisites and follow-ups
7. Accurate `codeExample` (no misleading shortcuts, e.g. sort-based “heap”)

## Verify demos

```bash
node data-structures/scripts/verify-demos.mjs
```

## Playground pattern

`js/demos/playground.js` provides guided steps + freeform input. Used by Linux terminal and Git demos. Reuse for new command-sandbox topics.
