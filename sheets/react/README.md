# React

> [!NOTE]
> A **look it up** page. It is not a step on the path. Use it with the [React todo extra](../../projects/extras/react-todo/README.md), and read only the part you need.

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

In the React todo: focus the edit input in `TodoItem`.

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

## 12. Vite + React

Node runs the **dev server**; React runs in the **browser**:

```bash
npm create vite@latest react-todo -- --template react
cd react-todo
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

## 14. After the React todo

| Next | Where |
|------|-------|
| TypeScript + React | [typescript/README.md](../typescript/README.md) |
| Weather in React | Reuse the `fetch` code from [Project 4](../../projects/04-weather-dashboard/README.md) in `useEffect` |
| React Router | Multi-page apps |

---

## The React todo extra

- [React todo: the brief](../../projects/extras/react-todo/README.md)
- [fetch and await](../javascript/README.md) · [JSON](../javascript/json.md) · [The page tree (DOM)](../javascript/dom.md)
