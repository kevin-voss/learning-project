# Extra: React todo app

Build a todo app with add, complete, delete, filter, edit, and localStorage persistence - using React, JSX, and hooks.

This is an **extra**: not on the main path. Do it any time after [Project 4: weather dashboard](../../04-weather-dashboard/README.md), or skip it.

## Status

This folder contains **guides only**. You scaffold the Vite + React app yourself (in `app/` inside this folder) and write every component.

## Prerequisites

- Comfort with JavaScript from projects 2–4 ([shopping list](../../02-shopping-list-web/README.md) already does add, tick and remove without React)
- [React](../../../sheets/react/README.md) - read per step, not all upfront
- [npm](../../../sheets/npm/README.md) - Vite scripts in step 1
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

> [!PICTURE]
> React is like building with blocks. One block is the header, one block is the input, one block is the list, and one block is a single todo item. The app works when the blocks pass information to each other in a clear way.

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

A word you do not know? Look it up in the [glossary](../../../sheets/start/glossary.md).

## Files you will create

Scaffold with Vite first - then you add:

```
extras/react-todo/app/
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

Do **not** scaffold until [step-by-step](./docs/step-by-step.md) step 1.

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
cd projects/extras/react-todo
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

Back to the [learning path](../../../hub/index.html). Want types? Read the [TypeScript sheet](../../../sheets/typescript/README.md).
