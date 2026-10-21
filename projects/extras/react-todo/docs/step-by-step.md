# Step-by-Step — React Todo App

Follow the steps in order. Read a topic **when a step links it**, not all upfront.

**Brief:** [README](../README.md) · **Sheet:** [React](../../../../sheets/react/README.md)

## How to use this guide

React has more files than a plain HTML project. Do not panic.

Use this question for every file:

```text
Is this file a component, a style file, or app setup?
```

- A **component** returns UI.
- A **style file** changes how UI looks.
- **App setup** files let Vite and React start the app.

## Step 1: Scaffold

**Learn:** [npm: Vite scripts](../../../../sheets/npm/README.md#npm-in-project-4-react) · [React: sections 1–3](../../../../sheets/react/README.md)

**Goal:** Use Vite to create the starter React project.

**Why:** Vite creates the boring setup files so you can focus on React.

**Do:**
- [ ] Skim [concepts.md](./concepts.md) — vocabulary preview OK
- [ ] Install React DevTools browser extension
- [ ] From the repo root:

```bash
cd projects/extras/react-todo
npm create vite@latest app -- --template react
cd app
npm install
npm run dev
```

- [ ] Open URL shown (usually `http://localhost:5173`)
- [ ] See default Vite + React page
- [ ] First commit on your branch (Vite's own `.gitignore` already keeps `node_modules/` out). Never run `git init` here: see the [git sheet](../../../../sheets/git/README.md)

**Checkpoint:** Dev server runs; you understand `npm run dev` uses Vite.

Beginner note: `npm run dev` starts a development server. Keep that terminal open while coding. Open a second terminal if you need to type other commands.

---

## Step 2: Clean slate

**Goal:** Remove demo code so the app is yours.

**Why:** The Vite starter is only a sample. Cleaning it makes your todo app easier to understand.

**Do:**
- [ ] Remove Vite demo counter code from `App.jsx`
- [ ] Replace with minimal shell: `<div className="app"><h1>Todos</h1></div>`
- [ ] Simplify `App.css` and `index.css` — remove demo styles
- [ ] Create `src/components/` folder

```bash
mkdir -p src/components
```

**Checkpoint:** Blank todo app title only.

---

## Step 3: Component skeleton

**Learn:** [React: components & props](../../../../sheets/react/README.md) · [component guide](./component-guide.md)

**Build:**

Inside `src/components/`, create:

```bash
touch src/components/Header.jsx src/components/AddTodo.jsx src/components/TodoList.jsx src/components/TodoItem.jsx src/components/FilterButtons.jsx
```

- [ ] `Header.jsx`
- [ ] `AddTodo.jsx`
- [ ] `TodoList.jsx`
- [ ] `TodoItem.jsx`
- [ ] `FilterButtons.jsx`

Import and render all in `App.jsx`:

```jsx
import Header from './components/Header';
// ...
```

- [ ] Draw component tree on paper (see [component guide](./component-guide.md))

**Checkpoint:** All components visible on page (static text placeholders).

Beginner check: if a component does not show, check spelling in both the file name and the `import` line.

---

## Step 4: State — add todos

**Learn:** [React: state & useState](../../../../sheets/react/README.md)

**Build:**

In `App.jsx`:

- [ ] `const [todos, setTodos] = useState([])`
- [ ] Implement `addTodo(text)` — ignore empty strings, trim text, unique `id`
- [ ] Pass `onAddTodo={addTodo}` to `AddTodo`

In `AddTodo.jsx`:

- [ ] Local state for input text
- [ ] Controlled `<input>` + form `onSubmit`
- [ ] `e.preventDefault()`; call `onAddTodo(text)`; clear input

**Checkpoint:** Can add todos; they appear in state (log `todos` in DevTools or console).

Why state matters: normal variables forget changes when React redraws. State is React's memory for values that should update the screen.

---

## Step 5: Display list

- [ ] `TodoList` receives `todos` prop, maps to `TodoItem`
- [ ] Each `TodoItem` shows `todo.text` and checkbox
- [ ] Use `key={todo.id}` on list items

**Checkpoint:** Added todos render as list.

---

## Step 6: Toggle and delete

In `App.jsx`:

- [ ] `toggleTodo(id)` — map array, flip `completed`
- [ ] `deleteTodo(id)` — filter array

Pass to `TodoItem`. Wire checkbox and delete button.

- [ ] Apply `.completed` CSS class when done (line-through)

**Checkpoint:** Check and delete work; UI updates immediately.

---

## Step 7: Filters

**Learn:** [React: lifting state up](../../../../sheets/react/README.md)

**Build:**
- [ ] `const [filter, setFilter] = useState('all')`
- [ ] Compute `filteredTodos` before passing to `TodoList`
- [ ] `FilterButtons`: All | Active | Completed
- [ ] Show counts: items left, completed

**Checkpoint:** Filters change visible list without deleting data.

---

## Step 8: Inline edit

**Learn:** [React: useRef](../../../../sheets/react/README.md)

**Build:**

- [ ] `useState` for `isEditing` and `editText`
- [ ] Double-click text → edit mode
- [ ] `useRef` on input; `useEffect` to focus when editing
- [ ] Enter saves, Escape cancels, blur saves
- [ ] `onEdit(id, newText)` in App updates todo

**Checkpoint:** Edit existing todo text inline.

---

## Step 9: localStorage

**Learn:** [React: useEffect](../../../../sheets/react/README.md)

**Build:**

In `App.jsx`:

- [ ] Lazy init: load todos from localStorage in `useState(() => ...)`
- [ ] `useEffect` saves whenever `todos` changes

**Checkpoint:** Refresh page — todos persist.

---

## Step 10: Polish

- [ ] Style form, list, buttons in `App.css`
- [ ] Empty state: "No todos yet"
- [ ] `clearCompleted` button
- [ ] Hover states, responsive width (max-width container)
- [ ] Disable Add button when input empty
- [ ] Accessibility: labels, `aria` on filter buttons optional

**Checkpoint:** App you'd show in a portfolio.

---

## Step 11: Build and deploy

**Learn:** [Git: deploy](../../../../sheets/git/README.md) · [TypeScript: what's next](../../../../sheets/typescript/README.md) (optional)

**Build:**

```bash
npm run build
npm run preview
```

- [ ] Fix any build errors
- [ ] Push to GitHub
- [ ] Deploy `dist/` to Netlify, Vercel, or GitHub Pages (Vite base path may need config for Pages)

- [ ] Update README with screenshot and live URL

---

## Success checklist

- [ ] Explain props vs state
- [ ] Update array state immutably (spread, map, filter)
- [ ] Use useEffect with correct dependency array
- [ ] Debug with React DevTools (see state on App)
- [ ] Describe unidirectional data flow

---

## Bonus (later)

- Dark mode toggle
- Categories / tags
- Drag and drop reorder
- Custom hook `useLocalStorage`
- Convert weather app to React

---

## Stuck?

- [FAQ](./help/faq.md)
- [Troubleshooting](./help/troubleshooting.md)
- [Code reference](./code-reference.md)
