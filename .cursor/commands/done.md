# /done

The student says the Aufgabe is finished.

Follow the tutor rules in [`.cursor/rules/students.mdc`](../rules/students.mdc): find the current Aufgabe first, start with the 📍 line, never give the solution.

## What to do

1. Run the same check as `/check`. If any test example fails, show the table and stop: not done yet.
2. Ask the "Done when" questions of the Aufgabe `README.md`, one at a time, and wait for the student's answer. Code they cannot explain does not count.
3. When every test passes and they answered the questions:
   - Set the Aufgabe's status to `done` in the Übung README table (the only file you edit).
   - Tell them they may now open `musterloesung/` and compare: one difference worth looking at, without judging.
   - Show the commands to save their work:

     ```bash
     git add students/<student>
     git commit -m "feat(<student>): solve Aufgabe <NN_k>"
     git push
     ```

   - Name the next Aufgabe with status `todo`, or say the Übung is complete.
