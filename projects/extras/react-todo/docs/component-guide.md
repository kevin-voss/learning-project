# Component Guide — React Todo App

What each component should do. Build in this order.

---

## App.jsx (brain)

**Owns:**

- `todos` state (array of objects)
- `filter` state (`'all' | 'active' | 'completed'`)
- All handlers: add, toggle, delete, edit, clear completed

**Renders:**

```jsx
<div className="app">
  <Header />
  <main>
    <AddTodo onAddTodo={addTodo} />
    <FilterButtons ... />
    <TodoList todos={filteredTodos} onToggle={...} onDelete={...} onEdit={...} />
    {todos.length === 0 && <p>No todos yet</p>}
  </main>
</div>
```

**Does not:** Put every JSX line here — delegate to children.

---

## Header.jsx

Simple presentational component.

- App title
- Optional subtitle or tagline
- No props required (or pass `title` string for practice)

---

## AddTodo.jsx

**Props:** `onAddTodo(text: string) => void`

**Local state:** `text` for controlled input

**Behavior:**

1. User types → update `text`
2. Submit form → call `onAddTodo(text)` if trimmed non-empty
3. Clear input

**Accessibility:** `<label htmlFor="...">` or `aria-label` on input

---

## FilterButtons.jsx

**Props:**

- `filter` — current filter
- `onFilterChange(filter)` — callback
- `remainingCount`, `completedCount`, `totalCount`
- `onClearCompleted` — optional

**Behavior:**

- Three buttons; highlight active filter
- Show "X items left"
- "Clear completed" only if completedCount > 0

---

## TodoList.jsx

**Props:**

- `todos` — already filtered array
- `onToggle`, `onDelete`, `onEdit`

**Behavior:**

- If empty array → optional message or let App handle empty state
- Map todos to `TodoItem` with stable `key`

```jsx
<ul className="todo-list">
  {todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={onToggle}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ))}
</ul>
```

---

## TodoItem.jsx

**Props:**

- `todo` — `{ id, text, completed }`
- `onToggle(id)`, `onDelete(id)`, `onEdit(id, newText)`

**Local state:**

- `isEditing` — boolean
- `editText` — string while editing

**Behavior:**

| User action | Result |
|-------------|--------|
| Click checkbox | `onToggle(todo.id)` |
| Click delete | `onDelete(todo.id)` |
| Double-click text | Enter edit mode |
| Enter in edit | Save via `onEdit` |
| Escape | Cancel edit |
| Blur input | Save edit |

**useRef:** Focus edit input when `isEditing` becomes true.

---

## Props drilling note

This app is small — passing callbacks through one level is fine. For deeper trees you'd learn Context API later.

---

## Testing each component in isolation

Use React DevTools:

1. Select `App` — inspect `todos` and `filter` hooks state
2. Select `TodoItem` — inspect props
3. Trigger action — watch state update in parent

---

## Next

[Code reference](./code-reference.md) · [Step-by-step](./step-by-step.md)
