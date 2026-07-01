# Project 4: React Todo App

**Modern component-based UI development.**

Build a todo app with add, complete, delete, filter, edit, and localStorage persistence — using React, JSX, and hooks.

## Status

This folder contains **guides only**. You scaffold the Vite + React project yourself and write every component.

## Prerequisites

- Finished Projects 1–3 (or at least 1 and 3 for JS + npm comfort)
- [Learning Roadmap](../docs/roadmap.md) — **phase order**
- [React](../docs/react/README.md) — read per phase, not all upfront
- [npm](../docs/npm/README.md) — Vite scripts in Phase 1
- [JavaScript: Project 4](../docs/javascript/by-project.md#project-4--react-todo-app)
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

**Time estimate:** 12–18 hours

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

Scaffold with Vite first — then you add:

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

Then:

1. Read [Roadmap — Project 4 Phase 1](../docs/roadmap.md#phase-1--scaffold-1-h).
2. Open [step-by-step](./docs/step-by-step.md) and scaffold with Vite when instructed.

## Resources

- [React Learn (official)](https://react.dev/learn)
- [Vite guide](https://vite.dev/guide/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## Previous project

← [03 CLI Tool](../03-cli-tool/)

## After this curriculum

Convert Weather Dashboard to React, add React Router, or explore TypeScript in [`frontend/`](../../frontend/).
