# Java hub

The home for the Java language on the path. One topic per page, from your first program to design patterns. Open [`index.html`](index.html) in a browser. You run the code in your own terminal with `javac` and `java` (Java 21).

The order of the steps lives in `hub/path.mjs`. This folder only holds the pages.

## How a topic page works

A Java lesson is **in depth**: a student who has never heard of the topic reads one lesson and understands all of it. Every lesson follows this shape:

**Picture → Like you are six → The idea → Example (with output) → Step by step → Under the hood → Try it → Remember / Common mistakes → Check yourself**

- **Picture** (`realWorld`): one everyday thing a child knows.
- **Like you are six** (`kid`): the same idea as a little story, in very simple words.
- **The idea** (`definition` + `explain`): the real explanation with the real words, each new word explained the first time.
- **Example** (`code` + `output` + `codeExplanation`): a complete program that runs as it is, what it prints, and a walkthrough of the important lines.
- **Step by step** (`sections`): small chapters, each with words, and where it helps a Mermaid diagram, a table or another runnable snippet with its output.
- **Under the hood** (`technical`): what the compiler and the JVM really do.
- **Check yourself** (`check`): questions with hidden answers, per lesson and once per topic.

Lessons marked **Deeper** are optional on the first pass.

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

A lesson is a plain object in `topics/<topic>/js/` (one or more files, each about 400 lines at most, at most 5 files per folder):

```js
{
  id: 'base-case', title: 'Countdown and the Base Case', category: 'concept', icon: 'R',
  tagline: 'Stop before you fall forever',
  realWorld: 'The picture: a thing a child knows.',
  kid: ['A tiny story in very simple words.', 'A second paragraph.'],
  definition: 'The idea in one or two sentences. `code`, **bold** and [links](../x/index.html) work.',
  explain: ['More paragraphs with the real words.', 'Each new word explained.'],
  why: 'Why it exists.', whenUse: 'When you use it.',
  syntax: 'How to write it, in one line.',
  fileName: 'Countdown.java', code: `...a complete program that runs...`,
  output: 'what the program prints',
  codeExplanation: [{ label: 'Line 3', code: 'countdown(n - 1);', text: 'What the line does and why.' }],
  sections: [{
    title: 'What happens on each call', text: ['Paragraph.', 'Paragraph.'], bullets: ['…'],
    mermaid: 'flowchart TD\n  A --> B', diagramNote: 'How to read the picture.',
    table: { head: ['…'], rows: [['…']], note: '…' },
    code: `...`, fileName: 'Other.java', output: '…', tip: '…', warn: '…'
  }],
  technical: ['What the compiler and the JVM do.'],
  tryIt: { steps: ['Do this.', 'Then this.'], see: 'what appears.' },
  check: [{ q: 'A question?', a: 'The answer.' }],
  keyPoints: [], commonMistakes: [], related: ['Methods']
}
```

A topic's own `tryIt` and `check` go into the `details` of `Java.addCoreTopic(...)`, or onto `Java.topics.<name>` for topics with their own `categories.js`. More lesson files for the same topic use `Java.addCoreLessons(id, lessons)`. Use `category: 'deeper'` for optional lessons. Diagrams are [Mermaid](https://mermaid.js.org/) text; the page loads Mermaid by itself. No build step: every page is plain `<script>` tags.
