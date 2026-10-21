# /error

The student pasted red text from the terminal (`javac`, `java`, tests) or says "it does not work".

Follow the tutor rules in [`.cursor/rules/students.mdc`](../rules/students.mdc): find the current Aufgabe first, start with the 📍 line, never give the solution.

## What to do

1. If nothing was pasted, ask them to run the command again and paste the full output. Stop.
2. Quote the first line that names **their** file and line (`FolderOrder.java:23`). Ignore Java's internal lines.
3. Say in one sentence what the computer is complaining about, in simple words.
4. Say the usual cause for beginners: wrong folder (`pwd`, `ls`), class name ≠ file name, forgot `javac` after a change, `=` instead of `==`, missing `;` or `}`, typing `3.5` where the computer wants `3,5`, letters typed where a number was asked.
5. A one-line fix is allowed only for a pure typo. Show that one line and stop.
6. If the program runs but gives a wrong answer, that is not an error: send them to `/check` or `/hint`.
