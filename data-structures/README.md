# Core CS Concepts Roadmap

Static interactive learner for beginner-friendly computer science concepts: memory, references, recursion, logic, Big-O, core data structures, algorithms, buffers, compiler/runtime basics, OS/kernel queues, and practical web/infra foundations like client-server, IPv4/IPv6 networks, requests, HTTP/DNS/TLS, SQL databases with indexes/keys/relations/scaling, Git, deployment, Docker, CI/CD, encryption, auth, and security. Open `index.html` in a browser (or serve the folder locally).

## Layout

```
data-structures/
├── index.html          # Shell — sidebar, content area, script load order
├── css/
│   ├── main.css        # Imports all stylesheets
│   ├── tokens.css      # Design tokens (:root variables)
│   ├── base.css        # Reset, body, scrollbar
│   ├── layout.css      # App shell, sidebar, progress nav
│   ├── content.css     # Section blocks, code, analogy cards
│   ├── demos.css       # Interactive demo visuals
│   ├── components.css  # Tables, toasts, buttons, completion UI
│   └── responsive.css  # Mobile breakpoints
└── js/
    ├── ns.js           # `DS` namespace bootstrap
    ├── app.js          # Boot: render nav + first section
    ├── globals.js      # `window` handlers for inline onclick
    ├── app/
    │   ├── state.js    # currentSection, completed (localStorage)
    │   ├── nav.js      # Sidebar + progress bar
    │   ├── content.js  # Section template renderer
    │   └── navigation.js # goTo, markComplete, copyCode, toast
    ├── data/
    │   ├── concepts/   # CS foundations, algorithms, hardware, compiler/runtime, OS/kernel concepts
    │   └── *.js        # Core data structure entries
    ├── demos/
    │   ├── ui.js       # Shared demo shell, inspector, memory helpers
    │   └── …           # One interactive demo per file (DS.demos.*)
    └── utils/
        └── messages.js # Demo feedback helper (DS.showMsg)
```

## Conventions

- Curriculum and demos register on the shared `DS` object (same pattern as `system-design/`).
- Lesson ordering follows `index.html` script order: foundations, data structures, algorithms, computer internals.
- Concept pages can include `conceptSections` for beginner sub-sections and `demoType` for focused visuals.
- Use visual demos when a concept is clearer as steps or truth tables than as code, e.g. logical operators, recursion, pointer references, search, and sorting.
- Use `category` on curriculum entries so sidebar navigation groups lessons cleanly.
- Add glossary-worthy beginner terms to `DS.glossaryTerms` in `js/app/content.js`; dotted-underlined terms show hover/focus explanations.
- Demo buttons use `window.*` handlers assigned inside each demo module.
- Progress is persisted in `localStorage` under `dsCompleted`.
