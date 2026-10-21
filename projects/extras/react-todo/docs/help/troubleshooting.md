# Troubleshooting — React Todo App

## Dev server

### `npm run dev` fails

```bash
rm -rf node_modules
npm install
npm run dev
```

### Port 5173 in use

Vite picks next port automatically, or set in `vite.config.js`.

---

## Common React errors

### `Too many re-renders`

Usually calling setState during render:

```jsx
// ❌ Wrong — runs every render
setCount(count + 1);

// ✅ In event handler only
<button onClick={() => setCount(c => c + 1)}>
```

### `Each child in a list should have a unique key`

Add `key={todo.id}` on mapped elements — on the outermost element in the map.

### `Cannot read properties of undefined (reading 'map')`

`todos` is undefined. Initialize: `useState([])`.

### Input doesn't type / frozen input

Missing `onChange` on controlled input, or `value` not tied to state.

---

## State bugs

### Toggle doesn't update UI

Mutating array instead of new array:

```jsx
// ❌
todo.completed = true;
setTodos(todos);

// ✅
setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
```

### localStorage infinite loop

Don't call `setTodos` inside `useEffect` that depends on `todos` unless guarded — only **save** in that effect, load in `useState` initializer.

---

## Build errors

### `'React' must be in scope`

React 17+ with new JSX transform doesn't require `import React` — but if ESLint complains, add:

```jsx
import React from 'react';
```

Or update ESLint config per Vite template.

---

## React DevTools

- Component not showing? Check export default and import path
- State empty? Action might not call setter — log in handler
- Profiler tab shows unnecessary re-renders — normal for small apps; optimize later

---

## Import path errors

```jsx
import Header from './components/Header';  // ✅ relative, include extension optional in Vite
import Header from 'components/Header';   // ❌ unless configured alias
```

Case must match filename on Linux/CI.

---

## Getting help

Share: error message, component name, relevant 10 lines of code.

See [FAQ](./faq.md) and [React docs](https://react.dev/reference/react).
