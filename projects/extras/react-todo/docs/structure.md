# Project Structure — React Todo App

## Phase 1: Scaffold with Vite (you run this)

From `projects/` directory:

```bash
npm create vite@latest 04-react-todo-app -- --template react
cd 04-react-todo-app
npm install
npm run dev
```

Vite creates starter files. You'll **replace and extend** them — don't treat the default counter app as your todo app.

## Target layout after you build

```
04-react-todo-app/
├── public/
│   └── vite.svg              # Optional favicon
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── AddTodo.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── FilterButtons.jsx
│   ├── App.jsx               # Root — owns todos state
│   ├── App.css
│   ├── index.jsx             # ReactDOM entry (Vite default)
│   ├── index.css               # Global reset / base styles
│   └── assets/               # Optional images
├── index.html                  # Vite template — single #root div
├── package.json
├── vite.config.js
├── eslint.config.js            # Vite may add ESLint
├── .gitignore
└── README.md
```

## Component responsibilities

| Component | Props (examples) | State (internal) |
|-----------|------------------|------------------|
| `App` | — | `todos`, `filter` |
| `Header` | — | none |
| `AddTodo` | `onAddTodo` | input `text` |
| `FilterButtons` | `filter`, `onFilterChange`, counts | none |
| `TodoList` | `todos`, callbacks | none |
| `TodoItem` | `todo`, `onToggle`, `onDelete`, `onEdit` | `isEditing`, `editText` |

## Todo object shape

```javascript
{
  id: 1720000000000,      // number — Date.now() or crypto.randomUUID()
  text: 'Learn React',
  completed: false,
  createdAt: '2026-07-01T...'
}
```

## Where state lives

**All todo CRUD logic in `App.jsx`:**

- `addTodo`, `toggleTodo`, `deleteTodo`, `editTodo`
- `clearCompleted`, optional `markAllComplete`
- Filtered list computed in App or TodoList

Child components call props: `onToggle(todo.id)`.

## CSS strategy

One `App.css` is fine for learning. Optional later: CSS Modules (`TodoItem.module.css`).

## Scripts in package.json (Vite default)

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Development server |
| `build` | `vite build` | Production bundle in `dist/` |
| `preview` | `vite preview` | Preview production build |

## Git checkpoints

1. `Scaffold Vite React project`
2. `Add component files and static layout`
3. `Add useState and add todo`
4. `Add toggle, delete, filter`
5. `Add edit mode with useRef`
6. `Add useEffect localStorage persistence`
7. `Polish CSS and deploy`

## Next

[Step-by-step plan](./step-by-step.md) · [Component guide](./component-guide.md)
