# React

**When:** Project 4. Read sections as the [roadmap](../roadmap.md) points you — not before Project 3 is done.

**Start:** [Project 4 Phase 1](../roadmap.md#phase-1--scaffold-1-h)

---

## 1. What is React?

A **JavaScript library** for building user interfaces with **components** — reusable pieces of UI.

**LEGO analogy:** Small bricks with one job each. Snap together. Replace one brick without rebuilding everything.

React is **declarative**: you describe what the UI should look like for current **state**; React updates the DOM when state changes.

| Traditional JS | React |
|----------------|-------|
| You find DOM nodes and mutate them | You update state; React re-renders |
| One big script file | Many small components |
| Hard to reuse UI | Components reusable |

Official docs: [react.dev/learn](https://react.dev/learn)

---

## 2. JSX

HTML-like syntax **inside** JavaScript:

```jsx
const name = 'Alice';
return <h1>Hello, {name}</h1>;
```

### Rules

- One parent per return (or `<>...</>` Fragment)
- `className` not `class`
- Close all tags: `<img />`, `<input />`
- JS expressions in `{curly braces}`
- Event handlers camelCase: `onClick`, `onChange`

JSX compiles to function calls — you don't write that by hand.

---

## 3. Components

A function that returns JSX:

```jsx
function Header() {
  return <header><h1>Todos</h1></header>;
}

export default Header;
```

File name `Header.jsx` — capital letter matches component name.

**Functional components + hooks** — modern standard (no class components in this curriculum).

---

## 4. Props

Read-only inputs from parent → child:

```jsx
// Parent
<TodoItem todo={item} onToggle={toggleTodo} />

// Child
function TodoItem({ todo, onToggle }) {
  return (
    <li>
      <input type="checkbox" checked={todo.completed}
        onChange={() => onToggle(todo.id)} />
      {todo.text}
    </li>
  );
}
```

Props = function arguments. Don't modify them in the child.

---

## 5. State & useState

Data that **changes** and triggers re-render:

```jsx
const [todos, setTodos] = useState([]);
const [text, setText] = useState('');
```

**Never mutate state directly:**

```jsx
// ❌
todos.push(newTodo);

// ✅
setTodos([...todos, newTodo]);
setTodos(prev => prev.map(t =>
  t.id === id ? { ...t, completed: !t.completed } : t
));
```

---

## 6. useEffect

Side effects after render — localStorage, API calls, timers:

```jsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);  // run when todos changes

useEffect(() => {
  // once on mount
}, []);
```

---

## 7. useRef

Reference a DOM node without re-render:

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus();
}, [isEditing]);

return <input ref={inputRef} />;
```

Project 4: focus edit input in `TodoItem`.

---

## 8. Lists & keys

```jsx
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

Use stable unique `id` — not array index if list reorders.

---

## 9. Lifting state up

Shared state lives in the **nearest common parent** (`App.jsx`):

- Data **down** via props
- Events **up** via callbacks (`onToggle`, `onDelete`)

```
App (todos state)
  → TodoList (todos prop)
      → TodoItem (todo + callbacks)
```

---

## 10. Controlled inputs

React owns the input value:

```jsx
<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

Single source of truth — required for forms in React.

---

## 11. Virtual DOM (intuition)

React keeps a lightweight copy of the UI, diffs on state change, updates only what changed in the real DOM. You don't touch the Virtual DOM — just understand why updates stay fast.

---

## 12. Vite + React (Project 4)

Node runs the **dev server**; React runs in the **browser**:

```bash
npm create vite@latest 04-react-todo-app -- --template react
cd 04-react-todo-app
npm install
npm run dev
```

| File | Role |
|------|------|
| `index.html` | Shell with `#root` |
| `src/main.jsx` | Mounts React |
| `src/App.jsx` | Root component |
| `src/components/` | Your components |

Install **React Developer Tools** browser extension.

---

## 13. Common mistakes

| Mistake | Fix |
|---------|-----|
| Mutating state | Always new array/object |
| Missing `key` in lists | `key={todo.id}` |
| `class` instead of `className` | Use `className` |
| Infinite re-renders | Don't setState during render |
| Frozen input | Add `onChange` to controlled input |

---

## 14. After Project 4

| Next | Where |
|------|-------|
| TypeScript + React | [typescript/README.md](../typescript/README.md) |
| Larger app | [`frontend/`](../../frontend/) CodeStep |
| Weather in React | Reuse Project 1 API logic in `useEffect` |
| React Router | Multi-page apps |

---

## Project 4 docs

- [Step-by-step](../../04-react-todo-app/docs/step-by-step.md)
- [Component guide](../../04-react-todo-app/docs/component-guide.md)
- [JS: Project 4 syntax](../javascript/by-project.md#project-4--react-todo-app)
- [Roadmap](../roadmap.md)
