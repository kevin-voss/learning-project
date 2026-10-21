# Glossary — React Todo App

| Term | Definition |
|------|------------|
| **Component** | Function returning JSX; reusable UI unit |
| **Controlled component** | Input whose value is controlled by React state |
| **Dependency array** | Second argument to useEffect — when to re-run |
| **Fragment** | `<>...</>` — group without extra DOM node |
| **Hook** | Function like useState, useEffect — must follow rules |
| **Immutable update** | New array/object instead of mutating existing |
| **JSX** | JavaScript XML syntax in React |
| **Lift state up** | Move shared state to common parent |
| **Props** | Read-only inputs passed to components |
| **Re-render** | Component function runs again after state change |
| **State** | Mutable data owned by component |
| **Synthetic event** | React's wrapped browser event (onClick, etc.) |
| **Unidirectional data flow** | Props down, events up |
| **Virtual DOM** | In-memory representation for efficient updates |
| **Vite** | Build tool and dev server for modern frontend |

## Hooks used in this project

| Hook | Purpose |
|------|---------|
| `useState` | Store todos, filter, form text, edit mode |
| `useEffect` | Sync todos to localStorage |
| `useRef` | Focus edit input |

See [concepts.md](../concepts.md) and [react.dev](https://react.dev).
