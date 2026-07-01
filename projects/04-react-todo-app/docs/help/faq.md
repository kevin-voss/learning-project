# FAQ — React Todo App

## Why Vite instead of Create React App?

Create React App is in maintenance mode. Vite is faster, modern, and the recommended way to start new React projects.

## Do I need to know TypeScript?

No. Use the **react** template, not **react-ts**. TypeScript comes later.

## Why can't I use `.jsx` in a `.js` file?

Vite/React projects use JSX syntax in `.jsx` files (or `.tsx` for TypeScript). Extension helps tooling know to transform JSX.

## What's the difference between props and state?

- **Props** — passed from parent, read-only in child
- **State** — owned by component, updated with setter, triggers re-render

## Why does React re-render when I call setTodos?

React compares new state to old. If different, component function runs again and UI updates.

## Can I put fetch/API calls in this project?

Optional bonus. Core curriculum focuses on local state + localStorage. Weather API fits a follow-up project.

## index.jsx vs main.jsx

Vite React template uses `main.jsx` as entry. Either name works — follow what your scaffold created and import `App` there.

## How do I deploy?

```bash
npm run build
```

Upload `dist/` to Netlify/Vercel, or configure GitHub Pages with `base` in `vite.config.js` if serving from subpath.

## Should todos use array index as key?

No — use `todo.id`. Index keys break when you reorder or delete items.

## Where to learn next?

- [React Learn](https://react.dev/learn)
- Main repo [`frontend/`](../../../frontend/) CodeStep app for TypeScript + larger patterns
