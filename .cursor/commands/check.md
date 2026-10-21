# /check

The student asks: **is my work right?** You test it, then give short feedback like a friendly teacher.

Follow [`.cursor/rules/tutor.mdc`](../rules/tutor.mdc): find the current task, start with the 📍 line, never give the solution.

## 1. Test it

1. Run their code against every example the task gives (see "Running their code" in the tutor rules): for a student task `make test-task TASK=<NN_k>` (no `tests.json` yet? make it first, as `/test` says), plus any test example it cannot check, the project's "You should see" lines and tests, `make <topic>` for a drill, the must-list and self-test for Code for Cleaning.
2. Show one table: input · expected · their output · ✅ or ❌. `1041,53` and `1041.53` count as the same.
3. For every ❌, one sentence on **what** is different ("99 folders still pay shipping"), never how to fix it in code.
4. Does not compile or run? Show the first error and say: `/stuck` with the red text.

## 2. Feedback

Only when it runs. Look at: every step of the task done · built with the ideas this lesson taught, not a trick it did not teach · each required file doing its one job · names they can explain · the edge cases (0, negative, exactly on the border).

1. **What is good:** two or three points, by name and line.
2. **What to improve:** at most three, most important first. Point at their lines; describe the change in words, never as code.
3. **One question** they should be able to answer out loud about their own code.

All ✅ and nothing big to improve? Say: ready for `/done`.
