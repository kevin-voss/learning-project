# Students — one home for every learner

Think of this folder like a big school building.

- Every **student** has their own room (a folder with their name).
- In each room there is a **shelf for each subject** (computer science, math, …).
- On the shelf there is a box called **Übungen**. Inside: one folder per **Übung** (one exercise sheet).
- Every Übung has one folder per **Aufgabe** (one task). Every Aufgabe looks the same inside, so you never get lost.

Everyone can open every room. Looking at how someone else solved a task is allowed and useful.

Lessons that are the same for everyone are on the [learning path](../hub/index.html). This folder is only for Übungen that belong to **one** student.

## What is inside

```text
students/
└── becky/                                   ← the student
    └── computer-science/                    ← the subject
        └── uebungen/                        ← all Übungen of this subject
            └── uebung-04-verzweigungen/     ← one Übung: README explains every new idea
                ├── README.md
                ├── aufgabe-04-1-aktenordner/  ← one Aufgabe = one folder
                │   ├── README.md              ← the task, simply said, test examples, helpers
                │   ├── meine-loesung/         ← START HERE: your code goes in this folder
                │   └── musterloesung/         ← the Musterlösung (peek only when done!)
                ├── aufgabe-04-2-dreieck/
                └── aufgabe-04-3-datum/
```

| Folder / file | What it is for |
|---------------|----------------|
| Übung `README.md` | The story and every new idea, explained like for a 6-year-old. Table of Aufgaben with status |
| Aufgabe `README.md` | The original task, the same task in simple words, test examples, little helpers, "done when" |
| `meine-loesung/` | Your desk: half-ready files with `TODO`s. Nothing is solved here |
| `musterloesung/` | One clean, complete solution with a step-by-step walkthrough and common mistakes |

Every folder has a `README.md`, so you can always read where you are.

## How to work on an Aufgabe

You need this repository on your computer and your own branch. If you have not done that yet, follow [Get set up](../sheets/setup/README.md) first.

1. Read the Übung `README.md` (the new ideas).
2. Open the first Aufgabe and read its `README.md`.
3. Write your code in `meine-loesung/`. Run it there (Java: `javac *.java`, then `java <ClassName>`).
4. Try every test example.
5. Done? Compare with `musterloesung/`, set the status to `done` in the Übung table, then save your work:

```bash
git add students/becky
git commit -m "feat(becky): solve Aufgabe 04_1"
git push
```

The website shows all of it too: on the landing page open **My tasks** and pick your name.

## Cursor commands for students

Open your file in `meine-loesung/` and type one of these in the Cursor chat. Cursor finds your current Aufgabe by itself (or add it: `/hint 04_2`). It helps you think. It never writes the solution for you.

| Command | Use it when |
|---------|-------------|
| `/task` | Where am I? What is the next small step? |
| `/hint` | You are stuck. You get one hint, not the answer. Ask again for a bigger one |
| `/explain switch` | A word or idea is new |
| `/error` | The terminal shows red text. Paste it after the command |
| `/check` | Does my program give the right answers? Runs every test example |
| `/review` | Feedback on your code, like from a teacher |
| `/done` | You think you are finished: tests, three questions, then status `done` |

## Add a new Übung (teacher)

Fastest way in Cursor: type **`/new-uebung`** and paste the sheet. The agent builds the folders and writes the explanations, the half-ready files and the Musterlösung.

By hand (only builds the empty folders, you fill them):

```bash
make new-uebung STUDENT=becky SUBJECT=computer-science NUMBER=05 TITLE="Schleifen" AUFGABEN="Einmaleins, Zahlenraten" LANGUAGE=Java
```

Same thing without make:

```bash
node students/scripts/new-uebung.mjs --student becky --subject computer-science --number 05 --title "Schleifen" --aufgaben "Einmaleins, Zahlenraten" --language Java
```

Run it again with the same `NUMBER` to add more Aufgaben to that Übung. New students and subjects are created on the fly, every index page gets a new line, and the landing page lists the Übung under **My tasks**.

Templates for every generated file live in `_template/` (not on the website). Change them there and every **new** Übung uses the change.

## All students

<!-- index:start -->
- [Becky](becky/README.md)
<!-- index:end -->
