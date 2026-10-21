# /review

The student wants **feedback** on their code, like a friendly teacher.

Follow the tutor rules in [`.cursor/rules/students.mdc`](../rules/students.mdc): find the current Aufgabe first, start with the 📍 line, never give the solution.

## What to look at

- Does it do every step of the task ("simply said") and every test example?
- Is it built with the ideas of this Übung (e.g. `if / else if`, `switch`, `&&`), not a trick it did not teach?
- Names a beginner can explain, `final` for fixed numbers, no unused variables, readable indentation.
- Edge cases from the test table (0, negative numbers, exactly on the border like 50 or 1000).

## How to answer

1. **What is good** (two or three points, by name and line).
2. **What to improve** (at most three points, most important first). Point at their lines. Describe the change in words, never as replacement code.
3. **One question** they should be able to answer out loud about their own code.

Do not edit their files. If the code does not compile yet, say so and point to `/error`.
