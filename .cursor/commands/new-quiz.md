# /new-quiz

For teachers: turn one lecture PDF (Vorlesung 1, 2, 3, …) into a multiple-choice quiz for one student. The quiz shows on that student's card on the landing page (My tasks). This browser remembers the answers.

Layout: [`students.mdc`](../rules/students.mdc). The player already exists (`hub/quiz/quiz.js`). Fill `quiz.json`. Do not rebuild the player.

Subjects that already have a shelf: `students/becky/statsrecht/` (Statsrecht), `students/becky/verwaltungshandeln/` (Verwaltungshandeln).

## 1. Collect (ask only for what is missing)

- **Student** (e.g. `becky`) and **subject** slug (e.g. `statsrecht`)
- **Lecture number and English title** (e.g. `01`, `The state and the law`)
- **The PDF** as a file in the chat (or page images, if that is what was pasted)

One lecture per run. Finish it before the next PDF.

Do not commit the PDF, and do not copy it into `students/`. Questions are your own English. Same facts and numbers as the lecture. No long quotations.

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
  "ideas": [
    {
      "idea": "One sentence a quiz could ask about",
      "terms": ["English term (German term)"],
      "figure": "What the picture on these pages shows, or \"\"",
      "trap": "A wrong idea a beginner might believe"
    }
  ]
}
```

Short notes. Not a transcript. Not quiz questions.

If the teacher pasted images instead of a PDF, split them into groups of 4. Pass each group with `file_attachments` (the image paths) to one `composer-2.5` sub-agent. The parent does not Read those images.

If a chunk comes back empty, resume that same agent (do not pass `model` on resume) and ask it to look at the figures again.

## 3. Scaffold (never build folders by hand)

```bash
node students/scripts/new-quiz.mjs --student <student> --subject <subject> \
  --number <NN> --title "<English title>"
```

Same command again later updates the question count and checks `quiz.json`. It does not wipe `quiz.json` or the lecture README.

## 4. Write the quiz

English. Short sentences. A German lecture is translated faithfully: same meaning, same numbers. Keep a German term in parentheses when the student must recognise it from class.

The parent writes the files. Sub-agents do not.

| File | Content |
|------|---------|
| Lecture `README.md` | Picture of the main idea, a few sentences on what the lecture is about, words to know, source line (the PDF is not stored here). Replace every `TODO`. No questions in this file |
| `quiz.json` | The questions below |

Aim for **8–12** questions. Fewer only when the lecture is short. One idea per question. Use the figures: ask about them in words. Do not copy images into the repo.

```json
{
  "id": "statsrecht-01",
  "title": "The state and the law",
  "questions": [
    {
      "id": "q1",
      "prompt": "The question, in one or two short sentences.",
      "options": [
        { "id": "a", "text": "…", "correct": false, "why": "One sentence: why this option is wrong or right." },
        { "id": "b", "text": "…", "correct": true, "why": "One sentence." },
        { "id": "c", "text": "…", "correct": false, "why": "One sentence." },
        { "id": "d", "text": "…", "correct": false, "why": "One sentence." }
      ],
      "explain": "Two to five short sentences after the result. A picture or a tiny example. A bit more than the option lines."
    }
  ]
}
```

- Usually **one** right option (the page shows radio buttons). Set several `correct: true` only when the lecture really asks "which of these are true" (the page shows checkboxes).
- Every question has at least one right option and at least one wrong option. Wrong options are believable mix-ups, not jokes.
- `correct` is a boolean. Option ids are `a` `b` `c` `d`. Question ids are `q1`, `q2`, …
- `why` is shown on that option after the answer. `explain` is the extra teaching under the heading "More about this". Neither is shown before the student answers.
- The landing page stores answers under the `localStorage` key `learning-project:quiz`. Do not add another store.

## 5. Verify

- Run the scaffold command again with the same arguments. It must exit 0 (shape check + question count on the lectures index).
- No `TODO` left in the lecture README.
- `quiz.json` has no empty `prompt`, `why`, or `explain`.
- `make site` reports 0 broken links.
- The PDF and the page images are not in the git status.

## 6. Reply

Three bullets: the lecture folder, how many questions, where it sits (the student's card on the home page, under Lecture quizzes). Do not commit unless asked.
