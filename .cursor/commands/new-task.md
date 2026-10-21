# /new-task

Add a new task for one student under `students/<student>/<subject>/<NN-slug>/`. Structure and rules: [`students/README.md`](../../students/README.md), rule [`students.mdc`](../rules/students.mdc).

## 1. Collect (ask only for what is missing)

- **Student** — e.g. `becky`
- **Subject** — e.g. `computer-science`, `math`, `english`
- **Task text** — the original, pasted as-is
- **Language** — e.g. Java, Python, none (for non-coding subjects)
- **Number** — optional; use the course number if the sheet has one (e.g. "Übung 04" → `04`)
- **Short title + slug** — derive from the task (e.g. "Branches (Verzweigungen)", slug `branches`)

## 2. Scaffold (never build folders by hand)

```bash
node students/scripts/new-task.mjs --student <student> --subject <subject> \
  --title "<title>" --slug <slug> --language <language> [--number <NN>]
```

The script creates the student / subject folders if new and updates all three index pages.

## 3. Fill every `TODO` in the new folder

Look at an existing task (e.g. `students/becky/computer-science/04-branches/`) and match its style.

| File | Content |
|------|---------|
| `README.md` | Every new topic the task needs, explained **like for a 6-year-old**: real-life picture → tiny code → "in the task you use it to …". Plus a "Words to know" table (translate foreign terms from the sheet). |
| `TASK.md` | Original text unchanged · the same task in short simple sentences · test examples table (input → expected output) · hints in `<details>` · "Done when" checklist. |
| `starter/` | Runnable skeleton per sub-task: input reading and boring setup done, the thinking left as `TODO` comments. Must compile/run as-is. `README.md` with exact run commands. |
| `solution/` | One clean, complete, beginner-level solution per sub-task. Only use concepts the task teaches. Comments explain *why*. `README.md`: run commands, walkthrough, real test output, common mistakes. |

## 4. Verify

- Compile/run the starter (it must start without errors) and the solution.
- Run **every** test example from `TASK.md` against the solution and paste the real output into `solution/README.md`.
- Max 5 files per folder: put each sub-task in its own subfolder if there are more than 4.

## 5. Reply

Three bullets: folder created, topics covered, test results. Do not commit unless asked.
