# /test

The student asks: **does my program work so far?** You run the task's tests on their code. When the task has no tests yet, you make them first.

Follow [`.cursor/rules/tutor.mdc`](../rules/tutor.mdc): find the current task, start with the 📍 line, never give the solution. `/test a` or `/test 04_2 b` tests one part only.

Not a student task? Use its own tests and stop: drill → `make <topic>`, Maven project → `mvn -q test`.

## 1. Make sure the tests exist

The tests are `tests.json` in the task folder (next to the task `README.md`).

- **Missing or empty:** write them now. Follow "Tests" in [`students.mdc`](../rules/students.mdc): black box, the task's own test examples first, then the borders, one idea per test, 4–10 tests, tagged by part.
- **The student asks for more** ("edge cases", "test my part b better"): add at most 3 new tests, each a new idea, never more than 12 in total.
- **Prove every new test** before you save it: `make test-task TASK=<NN_k> SOLUTION=1` must pass. Never show the solution's code or output; you only need ✅ or ❌.
- Never change a test to make their code pass. A test is fixed only when it disagrees with the task text; then say so.

## 2. Run the tests on their code

```bash
make test-task TASK=<NN_k>
```

Add `PART=<part>` when only some parts are written. Show the runner's output as it is.

## 3. Explain

- Every ✅: nothing to say, it speaks for itself.
- The **first** ❌ only: one sentence on **what** is different ("for 5, 3, 4 your program says it is not right-angled"), never how to fix it in code.
- Does not compile, or crashes: show the first red line and say `/stuck` with that text.
- Show them the line from step 2, so they can run the tests themselves after every change.

End with one command: some ❌ → fix the first one, then `/test` again (lost → `/stuck`) · all ✅ for the whole task → `/check`.
