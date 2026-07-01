# JavaScript by project

Concepts in the order you'll **use** them — paired with the [roadmap](../roadmap.md).

You already know: **arrays, functions, loops**.

---

## Project 1 — Weather Dashboard

| Concept | What it is | Phase |
|---------|------------|-------|
| **DOM** | Tree of HTML elements | 2, 4 |
| `document.querySelector` / `getElementById` | Find elements | 4 |
| **Events** | click, submit | 5 |
| `addEventListener` | Attach handlers | 5 |
| `preventDefault()` | Stop form reload | 5 |
| **Objects** | `{ key: value }` | 3 |
| **Template literals** | `` `Hello ${name}` `` | 3 |
| **fetch** | HTTP from browser | 3 |
| **Promises** | Result later | 3 |
| **async / await** | Clean async syntax | 3, 5 |
| `try / catch` | Handle errors | 5 |
| **JSON** | Data as text | 3, 6 |
| `JSON.parse` / `stringify` | ↔ localStorage | 6 |
| **localStorage** | Persist in browser | 6 |
| **Modules** (optional) | Split into files | 3+ |

### Mini progression

```javascript
// You know loops
for (const city of ['London', 'Paris']) console.log(city);

// Objects (Phase 3)
const weather = { temp: 15, city: 'London' };

// DOM (Phase 4)
document.getElementById('temp').textContent = weather.temp;

// Async (Phase 3–5)
async function loadWeather(city) {
  const response = await fetch(url);
  return response.json();
}
```

---

## Project 2 — Docker Portfolio

Minimal new JavaScript.

| Concept | Notes |
|---------|-------|
| Static files | Served as-is by Nginx |
| Relative paths | `css/styles.css` must work in container |
| No new JS required | Portfolio can be HTML/CSS only |

---

## Project 3 — CLI Tool (Node.js)

| Concept | What it is |
|---------|------------|
| **Node runtime** | JS outside browser |
| `require()` / `import` | Load modules & npm packages |
| `process.argv` | CLI arguments |
| `process.env` | Environment variables |
| `process.exit(code)` | Success/failure |
| **fs** | Read/write files |
| **path** | Safe file paths |
| **Shebang** | `#!/usr/bin/env node` |

See [Node.js guide](../nodejs/README.md).

---

## Project 4 — React Todo App

| Concept | What it is |
|---------|------------|
| **JSX** | HTML-like syntax in JS |
| **Components** | Functions returning UI |
| **Props** | Parent → child data |
| **State** | Changing data |
| `useState` | State hook |
| `useEffect` | Side effects (localStorage) |
| `useRef` | DOM refs |
| **Conditional rendering** | `{show && <X />}` |
| **Lists + keys** | `.map()` with `key={id}` |
| **Lifting state up** | Shared state in parent |
| **Immutable updates** | spread, never mutate |
| **Controlled inputs** | `value` + `onChange` |

See [React guide](../react/README.md).

---

## Syntax you'll see for the first time

Read when the roadmap says so — not upfront.

### Arrow functions

```javascript
const double = (n) => n * 2;
items.map(item => item.name);
```

### Destructuring

```javascript
const { temp, humidity } = weather.main;
const [first, second] = array;
```

### Spread operator

```javascript
const updated = { ...todo, completed: true };
const newList = [...todos, newTodo];
```

### Optional chaining

```javascript
error.response?.status
```

---

[← JavaScript index](./README.md) · [Roadmap](../roadmap.md)
