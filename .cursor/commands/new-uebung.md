# /new-uebung

For teachers: add an Übung (an exercise sheet) with its Aufgaben for one student. Layout and writing rules: [`students.mdc`](../rules/students.mdc). Example to copy the style from: `students/becky/computer-science/uebungen/uebung-04-verzweigungen/`.

## 1. Collect (ask only for what is missing)

- **Student** (e.g. `becky`) and **subject** (e.g. `computer-science`)
- **The sheet:** the original text, pasted as-is
- **Übung number and title** from the sheet (e.g. "Übung 04 Verzweigungen" → `04`, `Verzweigungen`)
- **Aufgaben:** one short title each, in sheet order (e.g. `Aktenordner, Dreieck, Datum`)
- **Language** (e.g. Java)

## 2. Scaffold (never build folders by hand)

```bash
node students/scripts/new-uebung.mjs --student <student> --subject <subject> \
  --number <NN> --title "<title>" --aufgaben "<title 1>, <title 2>" --language <language>
```

Same `--number` again adds Aufgaben to an existing Übung. The script updates every index page and the landing page.

## 3. Fill every `TODO`

| File | Content |
|------|---------|
| Übung `README.md` | The story, then every new idea of the sheet explained **like for a 6-year-old** (real-life picture → tiny code → "in Aufgabe NN_k you use it to …"), words to know, source |
| Aufgabe `README.md` | Original text unchanged · simply said, one step per line · test examples (input → expected output, include the borders) · helpers in `<details>` · done when |
| `meine-loesung/` | A runnable half-ready file: input reading and boring setup done, the thinking left as numbered `TODO`s. `README.md` with exact run commands |
| `musterloesung/` | One clean beginner solution using only what the Übung teaches, comments explain *why*. `README.md`: run commands, step-by-step walkthrough, real test output, common mistakes |

## 4. Verify

- Compile and run every `meine-loesung/` file (must start without errors) and every `musterloesung/` file.
- Run **every** test example against the Musterlösung and paste the real output into its `README.md`.
- `make site` must report 0 broken links.

## 5. Reply

Three bullets: folders created, ideas covered, test results. Do not commit unless asked.
