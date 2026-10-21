# Musterlösung · Aufgabe 01_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`musterloesung/`), then:

```bash
javac Aufgabe01_3.java
```

```bash
java Aufgabe01_3
```

## How it works, step by step

1. One line of the picture = one `System.out.println("…");`. Nine lines in the picture, so nine `println`.
2. **Going up** (lines 1 to 5): only stars, no spaces. 1, 2, 3, 4, 5 stars: one more each line.
3. **Going down** (lines 6 to 9): one star less each line, and one space **more** in front. Spaces inside quotes are printed, so they push the stars to the right. Because "one star less" and "one space more" happen together, every line is 5 characters wide and the right edge stays in the same column.
4. Nothing else: no variables, no loops. This Übung only knows `println`, and that is enough.

**Test run** (spaces made visible with `cat -e`: every line ends with `$`, so you can see where it ends)

```text
*$
**$
***$
****$
*****$
 ****$
  ***$
   **$
    *$
```

And the normal output:

```text
*
**
***
****
*****
 ****
  ***
   **
    *
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Spaces written outside the quotes: `println(  "***")` | Stars stay on the left | Spaces go **inside** the quotes |
| Spaces written **after** the stars | Stars stay on the left, invisible spaces at the end | Spaces come **before** the stars |
| One line too many or too few | Picture has the wrong height | Count the lines of the sheet and of your output |
| Wrong number of spaces | The right edge is crooked | Line *n* of the falling half has *n* spaces: 1, 2, 3, 4 |
| `print` instead of `println` | Everything in one long line | `println` = print **and** new line |

Back to [Aufgabe 01_3](../README.md).
