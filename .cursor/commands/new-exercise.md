# /new-exercise

For teachers: add an exercise (one exercise sheet) with its tasks for one student. Layout and writing rules: [`students.mdc`](../rules/students.mdc). Example to copy the style from: `students/becky/computer-science/exercises/exercise-04-branching/` (code) or `students/becky/mathematical-foundations/exercises/exercise-04-logic-ii/` (written).

## 1. Collect (ask only for what is missing)

- **Student** (e.g. `becky`) and **subject** (e.g. `computer-science`)
- **The sheet:** the original text, pasted as-is (any language)
- **Exercise number and title** from the sheet, in English (e.g. sheet 04 about branching → `04`, `Branching`)
- **Tasks:** one short English title each, in sheet order (e.g. `File folders, Triangle, Date`)
- **Language** (e.g. Java, or `Written` for math / Informatik sheets without programs)

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
| Exercise `README.md` | The story, then every new idea of the sheet explained **like for a 6-year-old** (real-life picture → tiny example → "in task NN_k you use it to …"), words to know, source. Prefer `> [!PICTURE]` boxes and Mermaid / Markdown tables over image files |
| Task `README.md` | The task from the sheet, translated faithfully into English · simply said, one step per line · test examples (input → expected output, include the borders) · helpers in `<details>` · done when |
| `my-solution/` | **No code / no filled answers.** Only `README.md`: the file and class name to create, exact run commands, and empty spaces for written answers. The student starts alone |
| `tests.json` | 4–10 black-box tests (typed input → printed output), tagged by part. Rules: "Tests" in [`students.mdc`](../rules/students.mdc). Written-only parts may use `"tests": []` |
| `solution/` | See **Programming vs written solutions** below |

Code (and printed text) is English too: class names, variable names, comments and everything the program prints.

### Programming vs written solutions

**Programming** (Java, … — Programmieren / computer-science with code):

- Put the sample program in `solution/` (only place for code).
- `solution/README.md`: exact run commands · short walkthrough of *why* the code works · **real** output of every test example · common mistakes.

**Written** (Mathematical Foundations, Informatik, proofs, truth tables, circuits on paper, … — no runnable program):

- `solution/` holds only `README.md` (plus a sketch file only if the sheet needs one).
- `solution/README.md` must **teach how you got there**, not only show the final answer. A beginner should be able to redo the work by reading the steps alone.
- Shape of the walkthrough:
  1. Aim in one sentence (what we must show / find).
  2. Tiny numbered steps — **one idea per step** (one rewrite, one row, one bit, one clause).
  3. After each important step: a short *why* or a mini-check.
  4. Show intermediate values (partial formulas, half-filled table rows, nibbles, …).
  5. Final answer boxed clearly at the end.
  6. Common mistakes table.
- Do **not** dump a finished table or formula with “therefore done”. Build it. Same numbers and letters as the sheet.

## 4. Verify

- Check that `my-solution/` holds only its `README.md`.
- **Programming:** compile and run every `solution/` file; paste real output into each `solution/README.md`; `make test-task TASK=<NN_k> SOLUTION=1` passes.
- **Written:** re-read every `solution/README.md` — a beginner must understand each small step; empty `tests.json` is OK when there is nothing to run.
- `make site` must report 0 broken links.

## 5. Reply

Three bullets: folders created, ideas covered, test results (`make test-task … SOLUTION=1`, or “written — no automated tests”). Do not commit unless asked.
