# /new-quiz

For teachers: turn one lecture PDF (Vorlesung 1, 2, 3, …) into a multiple-choice quiz for one student. The student's card on the home page links to the subject folder. The quiz plays on the lecture page in that folder. This browser remembers the answers.

Layout: [`students.mdc`](../rules/students.mdc). The player already exists (`hub/quiz/quiz.js`). Fill `quiz.json`. Do not rebuild the player.

Subjects that already have a shelf: `students/becky/staatsrecht/` (Staatsrecht), `students/becky/verwaltungshandeln/` (Verwaltungshandeln).

## 1. Collect (ask only for what is missing)

- **Student** (e.g. `becky`) and **subject** slug (e.g. `staatsrecht`)
- **Lecture number and German title** (e.g. `01`, `Einführung und der Begriff des Staates`)
- **The PDF** as a file in the chat (or page images, if that is what was pasted)

One lecture per run. Finish it before the next PDF.

Do not commit the PDF, and do not copy it into `students/`. Questions are your own German. Same facts and numbers as the lecture. No long quotations.

## 2. Read the PDF only with Composer 2.5 sub-agents

The parent agent does **not** read the PDF and does **not** read page images. No Read on the PDF. No `pdftotext` in the parent. No opening the attachment to skim it.

The parent may only:

1. Take the PDF's file path from the attachment. If there is no path, ask for one. Stop.
2. Run `pdfinfo` and read the page count. If `pdfinfo` is missing, stop and say `poppler-utils` is needed. Do not switch to another way of reading the file.
3. Split into chunks of **4 pages** (1–4, 5–8, …). The last chunk may be shorter. Never give an agent more than 4 pages. A PDF of 1–4 pages is still one sub-agent, not the parent.

Launch sub-agents with the **Task** tool, in parallel (one message, several calls). Waves of at most 4 agents. Wait for the wave before the next wave.

Each call:

- `subagent_type`: `generalPurpose`
- `model`: `composer-2.5` (this exact slug; not `composer-2.5-fast`, not the parent model)
- `run_in_background`: false
- `description`: `Lecture pages 1-4` (the real range)
- Do not set `environment` to cloud
- The prompt is self-contained. The sub-agent cannot see this chat. Give the absolute PDF path, the page range, and the rules below.

The sub-agent, and only the sub-agent:

- Runs `pdftotext -layout -f N -l M` for its range
- Renders those pages with `pdftoppm -f N -l M -png` into a temp dir outside the repo (`mktemp -d`) and **Reads every page image** (figures, slides, tables)
- Deletes that temp dir before it finishes
- Does not edit the repo

It returns **only** this JSON:

```json
{
  "pages": "1-4",
  "points": [
    {
      "rule": "Die Rechtsregel, Definition oder das Verfahren, so wie die Vorlesung es lehrt. Ein oder zwei Sätze.",
      "exam": "Wie eine Klausur das prüfen würde: kurzer Fall, Abgrenzung oder Zitieraufgabe.",
      "terms": ["Begriff genau wie auf der Folie"],
      "numbers": "Artikel, Paragraphen, Zahlen, Abkürzungen, genau wie auf der Folie, oder \"\"",
      "trap": "Ein Fehler, der in der Klausur Punkte kostet",
      "figure": "Was das Bild auf diesen Seiten zeigt, oder \"\""
    }
  ]
}
```

Short notes, in German. Not a transcript. Not quiz questions. One point per idea the exam could ask. Keep statute names, article numbers and abbreviations exactly. If a slide is a worked example, note the facts and which part of the rule fails. Skip decoration. Keep organization only when it is itself an exam rule (the allowed aid, how to cite).

If the teacher pasted images instead of a PDF, split them into groups of 4. Pass each group with `file_attachments` (the image paths) to one `composer-2.5` sub-agent. The parent does not Read those images.

If a chunk comes back empty, resume that same agent (do not pass `model` on resume) and ask it to look at the figures again.

## 3. Scaffold (never build folders by hand)

```bash
node students/scripts/new-quiz.mjs --student <student> --subject <subject> \
  --number <NN> --title "<German title>"
```

Same command again later updates the question count and checks `quiz.json`. It does not wipe `quiz.json` or the lecture README.

## 4. Write the quiz

**German is the default.** Questions, options, `why`, `explain`, the lecture title, and the lecture `README.md` are German. Short sentences. Same meaning and the same numbers as the lecture. Keep the statute names, article numbers, and abbreviations from the slides (`Art. 20 I GG`, `NPOG`, `EUGH`). Folder slugs stay plain ASCII. Another language only when the teacher asks for it.

**The quiz prepares for the exam.** Each question teaches one rule the student must be able to use in the Klausur.

- Ask the way an exam asks: a short case, a distinction, or "which statement is right". Do not ask what a slide is called, and do not ask the student to remember a list of abbreviations for its own sake.
- The right answer is the rule. Each wrong answer is a mistake that costs points: a swapped court, Art. where a § belongs, a definition with one element missing, a title that looks like a state and is not one.
- `why` gives the legal reason in one sentence. It does not say "the slide says so".
- `explain` teaches the rule so the student can use it on the next question: the definition, the test in order, and one tiny example from the lecture. Two to five short sentences.
- Cover the lecture's exam core. One question on the allowed aid is enough when the lecture sets one. Skip Moodle, room numbers and slide design.
- One idea per question. A definition can be one question ("which set is complete") and a later question applies one part of it to a case from the lecture.
- Do not add doctrine the lecture did not teach.

The parent writes the files. Sub-agents do not.

| File | Content |
|------|---------|
| Lecture `README.md` | Picture of the main idea, a few sentences on what the lecture is about, words to know, source line (the PDF is not stored here). Replace every `TODO`. No questions in this file |
| `quiz.json` | The questions below |

Aim for **8–12** questions. Fewer only when the lecture is short. One idea per question. Use the figures: ask about them in words. Do not copy images into the repo.

```json
{
  "id": "staatsrecht-01",
  "title": "Einführung und der Begriff des Staates",
  "questions": [
    {
      "id": "q1",
      "prompt": "Die Frage, in einem oder zwei kurzen Sätzen.",
      "options": [
        { "id": "a", "text": "…", "correct": false, "why": "Ein Satz: warum diese Antwort falsch oder richtig ist." },
        { "id": "b", "text": "…", "correct": true, "why": "Ein Satz." },
        { "id": "c", "text": "…", "correct": false, "why": "Ein Satz." },
        { "id": "d", "text": "…", "correct": false, "why": "Ein Satz." }
      ],
      "explain": "Zwei bis fünf kurze Sätze nach dem Ergebnis. Ein Bild oder ein kleines Beispiel. Etwas mehr als die Sätze zu den Antworten."
    }
  ]
}
```

- Usually **one** right option (the page shows radio buttons). Set several `correct: true` only when the lecture really asks "which of these are true" (the page shows checkboxes).
- Every question has at least one right option and at least one wrong option. Wrong options are believable mix-ups, not jokes.
- `correct` is a boolean. Option ids are `a` `b` `c` `d`. Question ids are `q1`, `q2`, …
- `why` is shown on that option after the answer. `explain` is the extra teaching under the heading "Mehr dazu". Neither is shown before the student answers.
- The lecture page stores answers under the `localStorage` key `learning-project:quiz`. Do not add another store.

## 5. Verify

- Run the scaffold command again with the same arguments. It must exit 0 (shape check + question count on the lectures index).
- No `TODO` left in the lecture README.
- `quiz.json` has no empty `prompt`, `why`, or `explain`.
- `make site` reports 0 broken links.
- The PDF and the page images are not in the git status.

## 6. Reply

Three bullets: the lecture folder, how many questions, and that the quiz plays on that lecture page. Do not commit unless asked.
