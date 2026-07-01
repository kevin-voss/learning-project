# Task Manager CLI Option

No external API — practice **fs** (file system) and JSON storage.

## Commands to implement

| Command | Behavior |
|---------|----------|
| `task add "Buy milk" --priority high` | Add task |
| `task list` | Show all tasks with checkboxes |
| `task complete 1` | Mark task #1 done |
| `task clear` | Remove completed tasks |
| `task --help` | Usage |

## Task data shape

```json
[
  {
    "id": 1,
    "text": "Buy groceries",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-07-01T12:00:00.000Z"
  }
]
```

Store in `src/storage/tasks.json` (create on first save).

## Dependencies

```bash
npm install commander chalk inquirer
```

**inquirer** (optional): interactive prompts when user runs `task add` with no text.

## Commander subcommands pattern

```javascript
program
  .command('add')
  .argument('<text>', 'Task description')
  .option('-p, --priority <level>', 'low, medium, high', 'medium')
  .action((text, options) => { /* ... */ });

program
  .command('list')
  .action(() => { /* ... */ });
```

## Display example

```
📋 Your tasks:
[ ] 1. Buy groceries (high)
[x] 2. Learn Docker (medium)
[ ] 3. Build portfolio (low)
```

Use chalk: green for done, yellow for high priority.

## Edge cases

- `task complete 99` when id doesn't exist
- Empty list message
- Duplicate text allowed (different ids)

## Milestones

1. `task add` writes to JSON file
2. `task list` reads and prints
3. `task complete` toggles flag
4. `task clear` removes completed
5. Colored output + `npm link`

## See also

[Code reference](../code-reference.md) · [Node.js fs docs](https://nodejs.org/api/fs.html)
