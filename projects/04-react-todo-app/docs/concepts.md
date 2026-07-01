# Concepts — React Todo App

Read before scaffolding. Official docs: [react.dev/learn](https://react.dev/learn).

## React

**Simple:** A library for building UIs from reusable **components**.

**LEGO analogy:** Small bricks (components) snap together. Each brick has one job. Replace or reuse bricks without rebuilding the whole model.

React is **declarative** — you describe what the UI should look like for a given state, and React updates the DOM when state changes.

## JSX

HTML-like syntax inside JavaScript:

```jsx
const name = 'Alice';
return <h1>Hello, {name}</h1>;
```

Rules:

- One parent element per return (or use `<>...</>` Fragment)
- `className` not `class`
- Self-close tags: `<img />`, `<input />`
- JavaScript expressions in `{curly braces}`

JSX compiles to `React.createElement` calls — you don't write that by hand.

## Component

A function that returns JSX:

```jsx
function Header() {
  return <header><h1>Todos</h1></header>;
}
```

File name convention: `Header.jsx` — capital first letter matches component name.

## Props

Read-only inputs from parent to child:

```jsx
<TodoItem todo={item} onToggle={toggleTodo} />
```

Like function arguments. Child must not modify props.

## State

Data that changes over time inside a component:

```jsx
const [todos, setTodos] = useState([]);
```

When state updates, React re-renders the component.

**Golden rule:** Never mutate state directly.

```jsx
// ❌ Wrong
todos.push(newTodo);

// ✅ Right
setTodos([...todos, newTodo]);
```

## useState

```jsx
const [value, setValue] = useState(initialValue);
```

- `value` — current state
- `setValue` — function to update (triggers re-render)

Works for strings, numbers, booleans, arrays, objects.

## useEffect

Runs side effects after render — API calls, localStorage, subscriptions:

```jsx
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]); // Re-run when todos changes
```

Empty dependency array `[]` = run once on mount.

## useRef

Reference to a DOM element or value that persists without causing re-render:

```jsx
const inputRef = useRef(null);
inputRef.current.focus();
```

Use for focus on edit mode in TodoItem.

## Lifting state up

Shared state lives in the **closest common parent** (`App.jsx`):

- `App` holds `todos` array
- Passes todos down as props
- Passes callback functions (`onToggle`, `onDelete`) down

**Data flows down. Events flow up.**

## Virtual DOM

React keeps a lightweight copy of the UI in memory. On state change:

1. Re-render to new Virtual DOM
2. Diff old vs new
3. Update only changed real DOM nodes

You don't manage the Virtual DOM — just understand why batched updates are fast.

## Controlled inputs

Input value tied to state:

```jsx
const [text, setText] = useState('');
<input value={text} onChange={(e) => setText(e.target.value)} />
```

React controls the input — single source of truth.

## Lists and keys

```jsx
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

`key` helps React identify which items changed. Use stable unique ids (not array index if list reorders).

## Vite

Build tool that provides:

- Dev server with hot reload (`npm run dev`)
- Fast production build (`npm run build`)
- Modern ES modules

Alternative to Create React App (CRA is legacy; Vite is recommended).

## Data flow diagram

```
App (state: todos, filter)
  ├── AddTodo (onAddTodo callback)
  ├── FilterButtons (filter, setFilter)
  └── TodoList (todos filtered)
        └── TodoItem × N (onToggle, onDelete, onEdit)
```

## Further reading

- [React guide](../../docs/react/README.md)
- [Step-by-step plan](./step-by-step.md)
- [Component guide](./component-guide.md)
