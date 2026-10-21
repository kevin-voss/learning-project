# Sample solution · Task 01_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac Task01_2.java
```

```bash
java Task01_2
```

## How it works, step by step

1. **The rule:** one `{` opens a box, its `}` closes it. Everything inside a box moves 4 spaces to the right. The `}` stands straight below the line that opened the box.
2. **The class** is box 1 (no indent). **`main`** is box 2 (4 spaces). The `println("A")` is inside `main`, so 8 spaces.
3. **The trap on the sheet:** `System.out.println("A"); {` looks as if the `{` belongs to the `println`. It does not. After the `;` the statement is over, and the `{` opens a new, nameless box. So it gets its own line.
4. **`{ {` and `} }`** at the end are two boxes, one inside the other. Each `{` and each `}` gets its own line, and `L` ends up 2 boxes deeper than `I`.
5. **Nothing else changes.** No line is added or removed. Java ignores spaces and line breaks between statements, so the output stays the same. That is the whole point of formatting: for humans, not for Java.

Here is how many boxes are around every letter (the class is 1, `main` is 2):

```text
2 boxes:  A                 I
3 boxes:    B C
4 boxes:        D       H       L
5 boxes:          E F G
```

The more boxes, the further right the line stands in the code: 4 spaces per box.

The extra boxes do nothing useful here. The sheet uses them only so you can practise. In real programs a box always comes with a reason: a class, a method, an `if`, a loop (Exercise 04 and later).

**Test run**

```text
A
B
C
D
E
F
G
H
I
L
```

The messy original prints exactly the same 10 lines (tested: same output before and after formatting). Still no `J` and no `K`: they are not on the sheet.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| A `}` deleted or added while moving lines | `reached end of file while parsing` or `class, interface, … expected` | Count: every `{` needs exactly one `}` |
| An extra `System.out.println();` slipped in | An empty line in the output | Formatting never adds statements. Compare with the original output |
| `{` left behind `println("A");` | Works, but readers think the box belongs to the `println` | Put the `{` on its own line |
| Mixing tabs and spaces | Looks straight in one editor, crooked in another | Use 4 spaces everywhere (Cursor does this when you press Tab) |
| `}` not straight below its opening line | Nobody can see where a box ends | Line up each `}` with the first letter of its opening line |

Back to [Task 01_2](../README.md).
