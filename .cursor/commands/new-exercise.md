# /new-exercise

For teachers: add an exercise (one exercise sheet) with its tasks for one student. Layout and writing rules: [`students.mdc`](../rules/students.mdc). Example to copy the style from: `students/becky/computer-science/exercises/exercise-04-branching/`.

## 1. Collect (ask only for what is missing)

- **Student** (e.g. `becky`) and **subject** (e.g. `computer-science`)
- **The sheet:** the original text, pasted as-is (any language)
- **Exercise number and title** from the sheet, in English (e.g. sheet 04 about branching → `04`, `Branching`)
- **Tasks:** one short English title each, in sheet order (e.g. `File folders, Triangle, Date`)
- **Language** (e.g. Java)

## 2. Scaffold (never build folders by hand)

```bash
node students/scripts/new-exercise.mjs --student <student> --subject <subject> \
  --number <NN> --title "<title>" --tasks "<title 1>, <title 2>" --language <language>
```

Same `--number` again adds tasks to an existing exercise. The script updates every index page and the landing page.

## 3. Fill every `TODO`

Everything is written in English. A sheet in another language is translated faithfully: same meaning, every number and value exactly as on the sheet.

| File | Content |
|------|---------|
| Exercise `README.md` | The story, then every new idea of the sheet explained **like for a 6-year-old** (real-life picture → tiny code → "in task NN_k you use it to …"), words to know, source |
| Task `README.md` | The task from the sheet, translated faithfully into English · simply said, one step per line · test examples (input → expected output, include the borders) · helpers in `<details>` · done when |
| `my-solution/` | **No code.** Only `README.md`: the file and class name to create, exact run commands, and empty spaces for written answers. The student starts alone, from an empty file |
| `solution/` | One clean beginner sample solution using only what the exercise teaches, comments explain *why*. `README.md`: run commands, step-by-step walkthrough, real test output, common mistakes |

Code is English too: class names, variable names, comments and everything the program prints.

## 4. Verify

- Check that `my-solution/` holds only its `README.md`. Compile and run every `solution/` file.
- Run **every** test example against the sample solution and paste the real output into its `README.md`.
- `make site` must report 0 broken links.

## 5. Reply

Three bullets: folders created, ideas covered, test results. Do not commit unless asked.
