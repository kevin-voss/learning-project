# Students — one home for every learner

Think of this folder like a big school building.

- Every **student** has their own room (a folder with their name).
- In each room there is a **shelf for each subject** (computer science, math, …).
- On the shelf there is a box called **exercises**. Inside: one folder per **exercise** (one exercise sheet).
- Every exercise has one folder per **task**. Every task looks the same inside, so you never get lost.

Everyone can open every room. Looking at how someone else solved a task is allowed and useful.

Lessons that are the same for everyone are on the [learning path](../hub/index.html). This folder is only for exercise sheets that belong to **one** student.

## What is inside

```text
students/
└── becky/                                   ← the student
    └── computer-science/                    ← the subject
        └── exercises/                       ← all exercises of this subject
            └── exercise-04-branching/       ← one exercise: README explains every new idea
                ├── README.md
                ├── task-04-1-file-folders/  ← one task = one folder
                │   ├── README.md            ← the task, simply said, test examples, helpers
                │   ├── tests.json           ← the tests: make test-task TASK=04_1
                │   ├── my-solution/         ← START HERE: your code goes in this folder
                │   └── solution/            ← the sample solution (peek only when done!)
                ├── task-04-2-triangle/
                └── task-04-3-date/
```

| Folder / file | What it is for |
|---------------|----------------|
| Exercise `README.md` | The story and every new idea, explained like for a 6-year-old. Table of tasks with status |
| Task `README.md` | The task from the sheet (in English), the same task in simple words, test examples, little helpers, "done when" |
| `tests.json` | The task's tests: what gets typed in, what your program must print. Run them with `make test-task TASK=04_1` |
| `my-solution/` | Your desk. It starts empty: you write the whole program yourself. Its `README.md` says which file to create and how to run it |
| `solution/` | The sample solution: one clean, complete solution with a step-by-step walkthrough and common mistakes |

Every folder has a `README.md`, so you can always read where you are.

## How to work on a task

You need this repository on your computer and your own branch. If you have not done that yet, follow [Get set up](../sheets/setup/README.md) first.

1. Read the exercise `README.md` (the new ideas).
2. Open the first task and read its `README.md`.
3. Write your code in `my-solution/`. Run it there (Java: `javac *.java`, then `java <ClassName>`).
4. Test it after every part you finish, from the main folder of the repo:

   ```bash
   make test-task TASK=04_1
   ```

   Only part a) so far? Add `PART=a`. Any file and class name works: the tests only look at what you type in and what your program prints.
5. Done? Compare with `solution/`, set the status to `done` in the exercise table, then save your work:

```bash
git add students/becky
git commit -m "feat(becky): solve task 04_1"
git push
```

The website shows all of it too: on the landing page open **My tasks** and pick your name.

## Cursor commands for students

Open your file in `my-solution/` and type one of these in the Cursor chat. Cursor finds your current task by itself (or add it: `/stuck 04_2`). It helps you think. It never writes the solution for you. Use them in this order:

| Command | Use it when |
|---------|-------------|
| `/next` | Where am I? What is the next small step? |
| `/stuck` | You are stuck. Add what you have: the red error text, a new word (`/stuck switch`), or what you tried. You get one hint; ask again for a bigger one |
| `/test` | One part is written: runs the task's tests and explains the first ❌. Ask for edge cases and it adds a few more tests |
| `/check` | You think it works: runs every test example, then says what is good and what to improve |
| `/done` | You are finished: tests, three questions, status `done`, what comes next |

## Add a new exercise sheet (teacher)

Fastest way in Cursor: type **`/new-exercise`** and paste the sheet. The agent builds the folders, translates the sheet into English and writes the explanations, the desk README and the sample solution.

By hand (only builds the empty folders, you fill them):

```bash
make new-exercise STUDENT=becky SUBJECT=computer-science NUMBER=05 TITLE="Loops" TASKS="Times table, Guess the number" LANGUAGE=Java
```

Same thing without make:

```bash
node students/scripts/new-exercise.mjs --student becky --subject computer-science --number 05 --title "Loops" --tasks "Times table, Guess the number" --language Java
```

Run it again with the same `NUMBER` to add more tasks to that exercise. New students and subjects are created on the fly, every index page gets a new line, and the landing page lists the exercise under **My tasks**.

Templates for every generated file live in `_template/` (not on the website). Change them there and every **new** exercise uses the change.

## All students

<!-- index:start -->
- [Becky](becky/README.md)
- [Kevin](kevin/README.md)
<!-- index:end -->
