# /done

The student says the task is finished.

Follow [`.cursor/rules/tutor.mdc`](../rules/tutor.mdc): find the current task, start with the 📍 line, never give the solution.

## What to do

1. Run the test part of `/check` (student task: `make test-task TASK=<NN_k>`, every test ✅). Anything ❌? Show it and stop: not done yet.
2. Ask the task's "Done when" / check questions one at a time and wait for each answer. Code they cannot explain does not count.
3. When everything passes and they answered:
   - **Student task:** set its status to `done` in the exercise README table.
   - Now they may open the answer (`solution/`, `solutions.js`) and compare: point out one difference worth looking at, without judging.
   - Show the commands to save their work:

     ```bash
     git add <their folder>
     git commit -m "feat(<name>): finish <task>"
     git push
     ```

   - **What next:** the next `todo` task, or the next path step ("tick this step on the website, then press **Step N →** in the header").
4. If the [learner-memory skill](../skills/learner-memory/SKILL.md) is set up, record what was hard and what they asked (it says how). Never store solutions.
