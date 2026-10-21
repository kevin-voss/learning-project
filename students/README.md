# Students — one home for every learner

Think of this folder like a big school building.

- Every **student** has their own room (a folder with their name).
- In each room there are **shelves**, one for each subject (computer science, math, …).
- On every shelf there are **boxes**. One box = one task.
- Every box always looks the same inside, so you never get lost.

Everyone can open every room. Looking at how someone else solved a task is allowed and useful.

Sheets, projects and courses that are the same for everyone live elsewhere: see the [landing page](../hub/index.html) (tracks, sheets, projects, practice). This folder is only for tasks that belong to **one** student.

## What is inside one task box

```text
students/
└── becky/                          ← the student
    └── computer-science/           ← the subject
        └── 04-branches/            ← one task = one folder
            ├── README.md           ← what you will learn (explained simply)
            ├── TASK.md             ← the task itself
            ├── starter/            ← START HERE: your work goes in this folder
            └── solution/           ← the perfect solution (peek only when done!)
```

| File / folder | Who uses it | What it is for |
|---------------|-------------|----------------|
| `README.md` | Student first | The new ideas, explained like a story, before any code |
| `TASK.md` | Student | The exact task, plus a simple version and test examples |
| `starter/` | Student | Half-ready files to fill in. Nothing is solved here |
| `solution/` | Teacher, then student | One clean, complete solution with explanations |

## Read on the web, work on your computer

The website shows every task, including the code in `starter/` and `solution/`. To **do** a task you need the repository on your computer:

```bash
git clone https://github.com/kevin-voss/learning-project.git
cd learning-project
git switch -c becky/04-branches        # your own branch: <name>/<task>
```

Then:

1. Open `students/<your-name>/<subject>/<task>/README.md` and read it.
2. Read `TASK.md`.
3. Write your code in `starter/`. Run it there (for Java: `javac *.java` then `java <ClassName>`).
4. Done and tested? Compare with `solution/`.
5. Set the status of the task to `done` in your subject `README.md`, then save your work:

```bash
git add students/becky
git commit -m "feat(becky): solve 04-branches"
git push -u origin becky/04-branches
```

Your teacher looks at the branch (or a pull request) and merges it.

## Add a new task (teacher)

Fastest way in Cursor: type **`/new-task`** and paste the task. The agent builds the folder and writes the docs and the solution.

By hand (only builds the empty box, you fill it):

```bash
make new-task STUDENT=becky SUBJECT=computer-science TITLE="Loops" NUMBER=05
```

Same thing without make:

```bash
node students/scripts/new-task.mjs --student becky --subject computer-science --title "Loops" --number 05
```

`NUMBER` is optional. Without it the next free number is used (`01`, `02`, …). New students and new subjects are created on the fly. Every index page gets a new line, and the landing page lists the task in its **Students** section.

Templates for all generated files live in `_template/` (not on the website). Change them there and every **new** task uses the change.

## All students

<!-- index:start -->
- [Becky](becky/README.md)
<!-- index:end -->
