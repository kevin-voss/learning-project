# TypeScript

**When:** **After** all four projects (or parallel reading once Project 4 is underway). **Zero knowledge is fine.**

This curriculum uses **plain JavaScript** on purpose. TypeScript is where you're heading — not where you start.

---

## One-sentence definition

**TypeScript** is JavaScript with **optional type annotations** — checked before your code runs.

```typescript
// JavaScript
function add(a, b) {
  return a + b;
}

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
```

TypeScript **compiles to JavaScript** — browsers still run JS.

---

## Why it exists

| Problem in JS | TS helps by… |
|---------------|--------------|
| `"5" + 1` → `"51"` | Catching type mistakes early |
| Misspelled property `user.nmae` | Error in editor, not at runtime |
| Unclear function arguments | Types document the contract |
| Large codebases | Safer refactors |

---

## What you need first

Before TypeScript, be comfortable with:

- [ ] Project 4 React (components, props, state)
- [ ] [npm](../npm/README.md) scripts and `package.json`
- [ ] Basic objects and functions in JS

If you haven't finished Project 4, **skip this folder** and come back.

---

## Core ideas (first hour)

### Types on variables

```typescript
const name: string = 'Alice';
const count: number = 0;
const done: boolean = false;
const items: string[] = ['a', 'b'];
```

### Interfaces (object shapes)

```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todo: Todo = { id: 1, text: 'Learn TS', completed: false };
```

### Functions

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

### React + TypeScript (preview)

```tsx
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (/* JSX */);
}
```

Vite template: `npm create vite@latest my-app -- --template react-ts`

---

## TypeScript vs JavaScript in this repo

| Area | Language |
|------|----------|
| Projects 1–4 curriculum | JavaScript |
| [`frontend/`](../../frontend/) CodeStep app | TypeScript |
| [`beginner-js/`](../../beginner-js/) drills | JavaScript |

Learning path: **JS projects → TS in frontend/** or convert todo app to `react-ts`.

---

## Tooling (when you're ready)

```bash
npm install -D typescript
npx tsc --init
```

- **`tsc`** — TypeScript compiler → outputs `.js`
- **IDE** — VS Code underlines type errors
- **Vite** — handles TS in React projects automatically

You don't need to memorize `tsconfig.json` on day one.

---

## What to learn after basics

1. Union types: `string | number`
2. `type` vs `interface`
3. Generics: `Array<Todo>`, `useState<Todo[]>([])`
4. Strict mode benefits
5. Typing fetch responses

---

## Recommended resources

- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — first 3 chapters
- [React TypeScript cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Total TypeScript beginner](https://www.totaltypescript.com/tutorials/beginners-typescript) — free tutorials

---

## Self-check (after 5–10 hours of TS)

- [ ] Add types to a plain JS function
- [ ] Define an interface for a todo object
- [ ] Create a Vite `react-ts` project and fix one type error
- [ ] Explain why TS helps teams, not just "extra syntax"

---

## See also

[Roadmap — after all four](../roadmap.md#after-all-four-projects) · [React](../react/README.md) · [JavaScript](../javascript/README.md)
