# Java Learning Hub

Static interactive learner for Java topics. Open [`index.html`](index.html) in a browser or serve the folder locally. The student environment is **Ubuntu Linux only**. All runnable Java examples target **Java 21 LTS** only: no preview features, incubator APIs, Windows commands, or macOS-only setup.

## Ubuntu Setup

Students should install and verify Java from an Ubuntu terminal:

```bash
sudo apt update
sudo apt install openjdk-21-jdk

java --version
javac --version
```

Both version commands should report `21.x`. Lessons should prefer Ubuntu terminal commands such as `mkdir`, `cd`, `nano`, `javac`, `java`, `jshell`, `git`, `mvn`, `gradle`, and `sudo apt install ...`.

## Homepage Structure

The hub is registry-driven and renders:

- **Ordered Curriculum Path:** one beginner-to-advanced sequence from Ubuntu setup through practice projects.
- **Terminal Practice:** browser pages show lessons, code, and diagrams. Actual Java execution happens in Ubuntu Terminal with `javac` and `java`.
- **Runnable Snippet Flow:** plain `.java` lesson snippets automatically show the beginner order: create a practice folder, create the file, open it with `code`, paste/save, compile, then run.
- **Stages & Topics:** grouped cards for foundation, core Java, workflow, applied Java, advanced, and projects.
- **Hover Glossary:** beginner definitions for Java keywords, data types, Git terms, REST terms, and UML terms.

Available topic links must point to explicit `index.html` files so the hub works when opened directly from disk.

## Layout

```text
java/
├── index.html                    # Hub: path + terminal practice + grouped topics + glossary
├── README.md
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── hub.css
│   └── main.css
├── js/
│   ├── ns.js
│   ├── glossary.js               # Global beginner glossary
│   ├── hub.js                    # Hub page renderer
│   ├── lesson-topic.js           # Shared topic lesson renderer
│   ├── topic-shell.js            # Shared shell for generated topic pages
│   └── topics/
│       ├── registry.js           # Topic catalog
│       └── core-lessons.js       # Shared lessons for new core topics
└── topics/
    ├── getting-started/
    ├── syntax-fundamentals/
    ├── types-and-variables/
    ├── operators/
    ├── control-flow/
    ├── methods/
    ├── classes-and-objects/
    ├── arrays/
    ├── strings/
    ├── collections/
    ├── exceptions/
    ├── io-basics/
    ├── debugging/
    ├── testing/
    ├── build-tools/
    ├── git-basics/
    ├── rest-and-http/
    ├── uml-diagrams/
    ├── jvm-memory/
    ├── design-patterns/
    └── practice-projects/
```

## Registry Schema

Topics live in [`js/topics/registry.js`](js/topics/registry.js).

```js
{
  id: 'methods',
  title: 'Methods',
  tagline: 'Name reusable behavior',
  description: 'Short learner-facing summary.',
  path: 'topics/methods/index.html', // explicit index.html required for available topics
  status: 'available',               // available | in-progress | planned
  tier: 'foundation',                // foundation | core | workflow | applied | advanced | projects
  order: 6,                          // global beginner-to-advanced order
  prerequisites: ['control-flow'],
  ltsNote: 'Java 21 LTS',
  stats: [
    { value: '3', label: 'Lessons' }
  ],
  accent: 'teal'                     // amber | teal | coral | violet
}
```

## Curriculum

| Order | Topic | Stage | Status | Path |
|-------|-------|-------|--------|------|
| 1 | Getting Started on Ubuntu | Foundation | Available | `topics/getting-started/index.html` |
| 2 | Syntax Fundamentals | Foundation | Available | `topics/syntax-fundamentals/index.html` |
| 3 | Types & Variables | Foundation | Available | `topics/types-and-variables/index.html` |
| 4 | Operators | Foundation | Available | `topics/operators/index.html` |
| 5 | Control Flow | Foundation | Available | `topics/control-flow/index.html` |
| 6 | Methods | Foundation | Available | `topics/methods/index.html` |
| 7 | Classes & Objects | Foundation | Available | `topics/classes-and-objects/index.html` |
| 8 | Arrays | Foundation | Available | `topics/arrays/index.html` |
| 9 | Strings & Text | Foundation | Available | `topics/strings/index.html` |
| 10 | Collections | Core Java | Available | `topics/collections/index.html` |
| 11 | Exceptions | Core Java | Available | `topics/exceptions/index.html` |
| 12 | I/O Basics | Core Java | Available | `topics/io-basics/index.html` |
| 13 | Debugging | Workflow | Available | `topics/debugging/index.html` |
| 14 | Testing | Workflow | Available | `topics/testing/index.html` |
| 15 | Maven & Gradle Basics | Workflow | Available | `topics/build-tools/index.html` |
| 16 | Git Basics | Workflow | Available | `topics/git-basics/index.html` |
| 17 | REST & HTTP | Applied Java | Available | `topics/rest-and-http/index.html` |
| 18 | UML Diagrams | Applied Java | Available | `topics/uml-diagrams/index.html` |
| 19 | JVM & Memory | Advanced | Available | `topics/jvm-memory/index.html` |
| 20 | Design Patterns | Advanced | Available | `topics/design-patterns/index.html` |
| 21 | Practice Projects | Projects | Available | `topics/practice-projects/index.html` |

## Topic Page Data

Existing basics topics use per-folder data files:

```text
topics/<topic-id>/
  index.html
  js/
    categories.js
    lessons.js
    app.js
```

New shared-shell topics use:

```text
topics/<topic-id>/index.html
js/topics/core-lessons.js
js/topic-shell.js
```

Lesson objects follow this shape:

```js
{
  id,
  num,
  title,
  category,
  tagline,
  definition,
  realWorld,
  fileName,
  codeLanguage, // omit or use 'java' only for Java snippets that should compile
  code,
  syntax,
  commands: [], // optional override; plain .java snippets get generated beginner run steps
  keyPoints: [],
  commonMistakes: [],
  pros: [],
  cons: [],
  glossary: [
    { term, definition }
  ],
  related: []
}
```

## Conventions

- Keep all setup and commands Ubuntu-only.
- Keep execution realistic: static browser pages can edit and save code but cannot run Java without an added runtime. Actual execution belongs in the Ubuntu terminal with `javac` and `java`.
- For runnable beginner snippets, show the full order: create/enter a folder, create the `.java` file, open it with `code`, paste the lesson code, save, compile with `javac`, and run with `java`.
- Omit `commands` for simple single-file `.java` snippets so [`js/lesson-topic.js`](js/lesson-topic.js) can generate the standard ordered flow. Add custom `commands` only when a lesson needs a special layout such as `src/` and `out/`.
- Use `codeLanguage: 'bash'`, `'http'`, `'json'`, or `'plaintext'` for non-Java examples so verification can compile only Java snippets.
- Available registry paths should point to explicit `index.html` files.
- Beginner terminology should use `glossary` entries or the global [`js/glossary.js`](js/glossary.js). The renderer shows viewport-safe hover/focus explanations.
- Data-type lessons should include sizes, ranges, overflow behavior, and the light stack/heap/reference model before deeper JVM content.
