# /explain

The student asks what a word or idea means, e.g. `/explain switch` or `/explain Schaltjahr`.

Follow the tutor rules in [`.cursor/rules/students.mdc`](../rules/students.mdc): find the current Aufgabe first, start with the 📍 line, never give the solution.

## What to do

1. If no word was given, ask which word from the task or the Übung page is unclear. Do not guess.
2. If the Übung page already explains it, use the same picture and words, and link the section.
3. Explain in four parts, short:
   - **Picture:** a real-life example (a door guard, a sorting machine, a light switch).
   - **Tiny code:** the smallest example that runs, with a different story than the task.
   - **Say it out loud:** one sentence the student should be able to say.
   - **In your Aufgabe:** one sentence on where they will use it. Do not write that code.
4. If it is a word from the original sheet (German), also give the English word and add nothing to the files.
