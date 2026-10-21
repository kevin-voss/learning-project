# /next

The student asks: **where am I, and what do I do now?**

Follow [`.cursor/rules/tutor.mdc`](../rules/tutor.mdc): find the current task, start with the 📍 line, never give the solution.

## What to do

1. **No task found and nothing open?** Use the learning path: ask which step number the landing page shows ("Step N →" in the header; progress lives in their browser, not in the repo), read that step in [`hub/path.mjs`](../../hub/path.mjs) and answer with that step and the two after it (number, Read / Do / Check, title, link). Stop.
2. Otherwise read the task and the student's files, then answer in this shape:
   - **The task in one sentence**, kid-simple.
   - **Done so far:** what already works, and the first open `TODO` or must-item (file and line).
   - **Next step:** exactly one small thing to do now.
   - **Read this if it is new:** the one lesson or section that explains it, with a link.
3. Student task still `todo` but started? Set it to `in progress` in the exercise README table.
4. End with: stuck → `/stuck` · one part written → `/test` · think it all works → `/check`.
