# Writing and design rules

Every page on the path follows the same shape. A student who has seen one page knows how every page works.

## The page shape

```text
Picture  →  One idea  →  Tiny example  →  Try it  →  Check  →  Next
```

1. **Picture first.** A real thing a child knows: a toy box, a kitchen, a post office, a traffic light, a shelf, a vending machine, a photo album.
2. **One idea.** Two to five short sentences. One idea per page. If a page needs a second idea, it gets a second page.
3. **Tiny example.** At most ~15 lines of code. It runs as it is.
4. **Try it.** Numbered steps the student does now. End with "You should see …".
5. **Check.** Two or three questions with hidden answers.
6. **Next.** One link: where the path goes now.

## Sentences

- Short sentences. Most are under 15 words.
- Say "you". Use present tense.
- Explain a new word the first time you use it, or link to the [glossary](../sheets/start/glossary.md).
- No "simply", "just", "obviously", "trivial".
- English everywhere on the path. Student tasks keep the original task text in its own language.
- Never say "Phase", "Layer" or "Gate A–F". The path has **levels** and **stages**.

## Markdown boxes

Sheets, project pages and the Spring course are Markdown. Five boxes are styled by the site (see `hub/theme/components.css`):

```markdown
> [!PICTURE]
> A variable is a labelled box. You put a value in and read it later by its label.

> [!TRY]
> 1. Open the browser console (F12).
> 2. Type `let age = 9` and press Enter.
> You should see: `undefined`. Then type `age` and you see `9`.

> [!CHECK]
> 1. What is inside the box after `let age = 9`?
>    <details><summary>Answer</summary>The number 9.</details>

> [!NOTE]
> Extra facts that help but are not needed now.

> [!WARN]
> A mistake many people make.
```

## One home per topic

Every topic is taught in exactly one place. Everywhere else writes one sentence and links there. The list of homes is in [LEARNING_PATH.md](LEARNING_PATH.md#one-home-per-topic).

## Files and folders

- `kebab-case` names. A folder opens on `README.md` (or `index.html` for apps).
- `NN-` prefix only where order matters: projects, Spring steps, student Übungen.
- A project folder: `README.md` (the brief and a check), `step-by-step.md`, `starter/`, `solution/`, and `help/` for extras.
- At most 5 files per folder. About 400 lines per file at most.
- Step ids in `hub/path.mjs` are never renamed or reused. Retire them in `RETIRED`.

## Design

One theme for the whole site lives in `hub/theme/`. Use its tokens (`--bg`, `--surface`, `--text`, `--accent`, `--read`, `--do`, `--check` …), never your own hex colours. Animations respect `prefers-reduced-motion`.
