# /check

The student wants to know: **does my program give the right answers?**

Follow the tutor rules in [`.cursor/rules/students.mdc`](../rules/students.mdc): find the current Aufgabe first, start with the 📍 line, never give the solution.

## What to do

1. Compile and run the student's code from `meine-loesung/`, with every test example from the Aufgabe `README.md`. Feed the input through standard input, for example:

   ```bash
   cd <aufgabe>/meine-loesung
   mkdir -p /tmp/lp-check && javac -d /tmp/lp-check *.java
   printf '80\n' | java -cp /tmp/lp-check FolderOrder
   ```

   The temporary folder keeps `.class` files out of their desk.
2. Show one table: input · expected · their output · ✅ or ❌. Different decimal signs (`1041,53` vs `1041.53`) count as the same.
3. For every ❌, one sentence on **what** is different ("99 folders still pay shipping"), never **how** to fix it in code.
4. If it does not compile, show the first error and say: use `/error`.
5. All ✅? Say so, and suggest `/review` for feedback, then `/done`.

Do not edit their files. Do not run the Musterlösung in front of them.
