# Java hub

The home for the Java language on the path. One topic per page, from your first program to design patterns. Open [`index.html`](index.html) in a browser. You run the code in your own terminal with `javac` and `java` (Java 21).

The order of the steps lives in `hub/path.mjs`. This folder only holds the pages.

## How a topic page works

Every lesson follows the page shape from [docs/STYLE.md](../../docs/STYLE.md):

**Picture → The idea → Tiny example → Try it → Check yourself**

Each topic ends with one "Try it" (numbered steps and "You should see") and three "Check yourself" questions with hidden answers. Lessons marked **Deeper** are optional on the first pass.

## Topics

| # | Topic | Folder |
|---|-------|--------|
| 1 | Getting started: install Java, first program | `topics/getting-started/` |
| 2 | Syntax fundamentals | `topics/syntax-fundamentals/` |
| 3 | Types and variables (stack, heap, references) | `topics/types-and-variables/` |
| 4 | Operators | `topics/operators/` |
| 5 | Control flow | `topics/control-flow/` |
| 6 | Methods | `topics/methods/` |
| 7 | Arrays | `topics/arrays/` |
| 8 | Strings and text | `topics/strings/` |
| 9 | Classes and objects | `topics/classes-and-objects/` |
| 10 | Collections | `topics/collections/` |
| 11 | Exceptions | `topics/exceptions/` |
| 12 | Reading and writing files | `topics/io-basics/` |
| 13 | Debugging | `topics/debugging/` |
| 14 | Interfaces | `topics/interfaces/` |
| 15 | Enums | `topics/enums/` |
| 16 | Build tools: Maven | `topics/build-tools/` |
| 17 | Testing with JUnit | `topics/testing/` |
| 18 | REST and HTTP methods | `topics/rest-and-http/` |
| 19 | Recursion | `topics/recursion/` |
| 20 | JVM and memory | `topics/jvm-memory/` |
| 21 | Design patterns | `topics/design-patterns/` |
| 22 | UML diagrams | `topics/uml-diagrams/` |

Other homes: terminal, HTTP and the call stack are taught in the [CS track](../computer-science/index.html). Git lives in [sheets/git](../../sheets/git/README.md). Projects live in the [project ladder](../../projects/README.md).

## Files

```text
java/
├── index.html            hub page (reads js/topics/registry.js)
├── css/                  main.css imports bridge (site theme → hub names), base, layout, components/, hub/
├── js/
│   ├── topics/registry.js    the topic list, in path order
│   ├── topics/core-topic.js  Java.addCoreTopic(id, details, lessons)
│   ├── lesson/               renderer: util, explain, sections, ui, render
│   ├── topic-shell.js        builds the page for shell topics
│   └── glossary.js, hub.js, ns.js
└── topics/<topic>/
    ├── index.html        a short shell that loads the scripts
    └── js/lessons.js     the lessons (some topics also have categories.js and app.js)
```

## Add or change a lesson

A lesson is a plain object in `topics/<topic>/js/lessons.js`:

```js
{
  id: 'base-case', title: 'Countdown and the Base Case', category: 'concept',
  realWorld: 'The picture: a thing a child knows.',
  definition: 'The idea in 2–5 short sentences. `code` and [links](../x/index.html) work.',
  fileName: 'Countdown.java', code: `...at most ~15 lines...`,
  tryIt: { steps: ['Do this.', 'Then this.'], see: 'what appears.' },
  check: [{ q: 'A question?', a: 'The answer.' }],
  keyPoints: [], commonMistakes: [], related: ['Methods']
}
```

A topic's own `tryIt` and `check` go into the `details` of `Java.addCoreTopic(...)`, or onto `Java.topics.<name>` for topics with their own `categories.js`. Use `category: 'deeper'` for optional lessons. No build step: every page is plain `<script>` tags.
