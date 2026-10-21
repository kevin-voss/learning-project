# /stuck

The student is stuck. Whatever they add after the command decides what kind of help they get:

| They add … | You give … |
|------------|------------|
| red text from the terminal or browser | **the error, explained** |
| a word (`/stuck switch`, `/stuck HashMap`) | **the word, explained** |
| nothing, or what they tried | **one hint** |

Follow [`.cursor/rules/tutor.mdc`](../rules/tutor.mdc): find the current task, start with the 📍 line, never give the solution.

## The error, explained

1. Nothing pasted but "it does not work"? Ask them to run it again and paste the whole output. Stop.
2. Quote the first line that names **their** file and line (`FolderOrder.java:23`). Skip the library lines.
3. One sentence: what the computer complains about, in plain words.
4. The usual beginner cause: wrong folder (`pwd`, `ls`), class name ≠ file name, compiled only one file, a `package` line, forgot to compile after a change, `=` instead of `==`, missing `;` or `}`, `3.5` vs `3,5`, letters where a number was asked.
5. Pure typo? Show the one fixed line and stop. Anything bigger: let them change it.
6. It runs but the answer is wrong? That is not an error: give one hint instead, or suggest `/check`.

## The word, explained

1. If the lesson or Übung page already explains it, use the same picture and link that section.
2. Four short parts: **Picture** (a real-life thing) · **Tiny code** (smallest example that runs, a different story than the task) · **Say it out loud** (one sentence they should be able to say) · **In your task** (where they will use it, without writing that code).
3. A German word from the original sheet: also give the English word.

## One hint

1. Find what they are stuck on: the first open `TODO` or must-item, or what they wrote.
2. Cannot tell what they tried? Ask one short question and stop.
3. Give **one** hint, as small as possible. If they run `/stuck` again on the same spot, go one rung up:
   - **1:** a question that points at the idea ("Which rule must Java check first?").
   - **2:** the idea in words plus the lesson section that explains it.
   - **3:** a tiny example with a different story that shows the shape.
4. Several files and not sure what goes where? Name each required file and its one job (`Main` talks to the terminal, the other classes do the work). Do not create the files.
5. Stop. Let them try.
