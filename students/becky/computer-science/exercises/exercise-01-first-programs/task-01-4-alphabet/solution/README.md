# Sample solution · Task 01_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac Task01_4.java
```

```bash
java Task01_4
```

## How it works, step by step

1. **a)** `println("ABCDEFGHIJKL")`: twelve letters inside quotes, no spaces, because spaces in quotes would be printed too.
2. Between the parts, `println()` with nothing inside prints an empty line, so you can tell the parts apart. The sheet does not ask for it, it just helps reading.
3. **b)** `"ABC\nDEF\tGHI"`. The backslash `\` says "the next letter is a command":
   - `\n` (new line) ends the line right there and continues on the next one, like pressing Enter.
   - `\t` (tab) jumps to the next tab stop, like pressing the Tab key. That is a gap of **up to** 8 places in the terminal: it goes to the next column that is a multiple of 8, so the gap after `DEF` is 5 places, not 8.
   - The two characters `\` and `n` are written, but only **one** invisible character arrives in the text.
4. **c)** Say the grid out loud: "tab A tab B tab C tab D, new line, tab E …". Every "tab" becomes `\t`, every "new line" becomes `\n`:

   ```text
   \tA\tB\tC\tD \n \tE\tF\tG\tH \n \tI\tJ\tK\tL
   ```

   (Spaces in this picture only to show the three rows. In the code there are none.) After `L` there is no `\n`: `println` ends the line by itself.

**Test run**

```text
ABCDEFGHIJKL

ABC
DEF     GHI

        A       B       C       D
        E       F       G       H
        I       J       K       L
```

Tabs made visible with `java Task01_4 | cat -t` (`^I` = one tab):

```text
ABCDEFGHIJKL

ABC
DEF^IGHI

^IA^IB^IC^ID
^IE^IF^IG^IH
^II^IJ^IK^IL
```

Every row of c) starts with `^I` and has a `^I` before each letter: exactly the sheet's pattern, and not a single space.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `/n` instead of `\n` | `/n` is printed as text | It is the **back**slash `\` |
| No `\t` at the very start | Rows `A`, `E`, `I` start at the left edge | Start the text with `\t` |
| `\n` after `L` too | An extra empty line at the end | `println` already ends the last line |
| Spaces next to `\t` | Gaps look uneven, and the sheet says no spaces | Only `\t`, nothing else |
| 3 letters per row | 4 rows instead of 3 | `\n` after every **4th** letter: after `D` and after `H` |
| Several `println` for c) | Right picture, but not what c) asks | One `println`, the rows come from `\n` |

Back to [Task 01_4](../README.md).
