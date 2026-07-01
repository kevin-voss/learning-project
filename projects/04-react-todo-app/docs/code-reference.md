# Code Reference — React Todo App

Patterns to read and implement yourself — not copy-paste without understanding.

---

## App.jsx — state and handlers (core patterns)

```jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (!text.trim()) return;
    setTodos(prev => [
      { id: Date.now(), text: text.trim(), completed: false },
      ...prev,
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter(t => !t.completed).length;

  return (
    <div className="app">
      <Header />
      <AddTodo onAddTodo={addTodo} />
      <FilterButtons
        filter={filter}
        onFilterChange={setFilter}
        remainingCount={remainingCount}
        onClearCompleted={clearCompleted}
      />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
```

---

## AddTodo.jsx

```jsx
import { useState } from 'react';

function AddTodo({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit" disabled={!text.trim()}>Add</button>
    </form>
  );
}

export default AddTodo;
```

---

## TodoItem.jsx — edit mode

```jsx
import { useState, useRef, useEffect } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const saveEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') setIsEditing(false);
          }}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
      <button type="button" onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
```

---

## CSS snippets (App.css)

```css
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.add-todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-todo-form input {
  flex: 1;
  padding: 0.75rem;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.completed span {
  text-decoration: line-through;
  color: #888;
}
```

Expand with your own design.

---

## Vite commands

```bash
npm run dev       # Development
npm run build     # Production build → dist/
npm run preview   # Preview dist/
```

---

## Next

[Step-by-step](./step-by-step.md) · [Troubleshooting](./help/troubleshooting.md)
