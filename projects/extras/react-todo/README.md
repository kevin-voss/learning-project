# Project 4: React Todo App

**Optional React practice - not on the main Java spine.**

Build a todo app with add, complete, delete, filter, edit, and localStorage persistence - using React, JSX, and hooks.

> **Scope**
>
> | | |
> |---|---|
> | **Phase** | Phase 6 (**optional**) |
> | **Hours** | about 12–18 |
> | **Java path** | **Off** the main spine. Only after Java Layers A–B feel solid. Or skip. Java services come later via [Spring Boot](../../../tracks/spring-boot/README.md). |

## Status

This folder contains **guides only**. You scaffold the Vite + React project yourself and write every component.

## Where this sits

[Learning path - Phase 6 (optional web depth)](../../../docs/LEARNING_PATH.md#phase-6--optional-web-depth-node--react--ts)

## Prerequisites

- Java Layers A–B solid (or you accept this is side practice)
- Comfort with JS from Project 1; npm from Project 3 helps but is not required if you already use Vite elsewhere
- [React](../../../sheets/react/README.md) - read per phase, not all upfront
- [npm](../../../sheets/npm/README.md) - Vite scripts in Phase 1
- React Developer Tools browser extension installed

## What you'll build

| Feature | Skill learned |
|---------|---------------|
| Add todos | Controlled inputs, forms, state |
| Toggle complete | Immutable array updates |
| Delete todos | Filter, events |
| Filter All/Active/Completed | Derived state |
| Inline edit | useRef, local component state |
| Persist todos | useEffect + localStorage |
| Component tree | Props, lifting state up |
| Responsive UI | CSS in React project |

## Goal in plain words

You will build a todo list app from small pieces called components.

Kid version: React is like building with blocks. One block is the header, one block is the input, one block is the list, and one block is a single todo item. The app works when the blocks pass information to each other in a clear way.

## Documentation map

| Doc | Read when |
|-----|-----------|
| [Concepts](./docs/concepts.md) | React, JSX, props, state, hooks |
| [Project structure](./docs/structure.md) | Vite layout and components YOU create |
| [Step-by-step plan](./docs/step-by-step.md) | **Main build guide** |
| [Component guide](./docs/component-guide.md) | What each component should do |
| [Code reference](./docs/code-reference.md) | Example patterns (type yourself) |
| [Help: FAQ](./docs/help/faq.md) | Quick answers |
| [Help: Troubleshooting](./docs/help/troubleshooting.md) | React errors |
| [Help: Glossary](./docs/help/glossary.md) | Term definitions |

## Files you will create

Scaffold with Vite first - then you add:

```
04-react-todo-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── AddTodo.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── FilterButtons.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── package.json            # Created by Vite
├── vite.config.js
└── README.md
```

Do **not** scaffold until [step-by-step](./docs/step-by-step.md) Phase 1.

## Learning goals

When finished, you can explain:

- Component vs element vs props vs state
- Why not to mutate state directly
- What `useEffect` is for
- Unidirectional data flow (props down, events up)
- How Vite dev server differs from opening HTML files

## Quick start

From the repo root:

```bash
cd projects
pwd
node -v
npm -v
```

Then open [step-by-step](./docs/step-by-step.md) and scaffold with Vite when instructed.

## Resources

- [React Learn (official)](https://react.dev/learn)
- [Vite guide](https://vite.dev/guide/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## Next

Back to the Java spine: Layer D → [Spring Boot](../../../tracks/spring-boot/README.md). Or more TS in the [typescript sheet](../../../sheets/typescript/README.md).
