# Project 12: Calculator

> [!PICTURE]
> A set of Russian dolls. A calculation can hold a bracket, the bracket holds a whole calculation again, which can hold another bracket ...
> You open one doll with the **same** method that opened the outer one. That is recursion.

You build a calculator that reads a whole line like `2 + 3 * (4 - 1)` and gets `11`, not `15`. Times before plus, brackets first. No library does the work: you walk the text yourself.

## What you build

```text
> 12 + 3 * (4 - 2)
18
> 20 - 4 - 1
15
> 7 / 2
3
> 4 * -2
-8
> (3 + 4
Missing ')'.
> 4 / (2 - 2)
Division by zero.
> exit
```

A Maven project:

```text
pom.xml
src/main/java/calculator/
  Main.java          the prompt loop (ready)
  Parser.java        expression, term, factor: your work
src/test/java/calculator/
  ParserTest.java    6 tests: your checklist
```

## What you need to know

- [Recursion](../../tracks/java/topics/recursion/index.html): a method that calls itself, and the base case that stops it.
- [Recursion and the call stack](../../tracks/computer-science/index.html#recursion-call-stack).
- [Strings](../../tracks/java/topics/strings/index.html): `charAt`, `length`, `Character.isDigit`.
- [Testing with JUnit](../../tracks/java/topics/testing/index.html) and Maven from [Project 9](../09-household-budget/README.md).

New: a **recursive-descent parser**. Each strength of operator gets its own method, and the methods call each other.

```text
expression = term   { ("+" | "-") term }        weakest: plus and minus
term       = factor { ("*" | "/") factor }      stronger: times and divide
factor     = number | "-" factor | "(" expression ")"
```

`factor` calls `expression` again for a bracket. That is the recursion.

## Rules

- Whole numbers only. `7 / 2` is `3` (the rest is dropped).
- `*` and `/` before `+` and `-`. The same strength goes left to right: `20 - 4 - 1` is `15`, not `17`.
- Spaces do not matter: `  (1+2) * 3 ` is `9`.
- A minus in front means negative: `-3 + 5` is `2`, `4 * -2` is `-8`.
- Bad lines print a message and the prompt comes back: `3 + + 4`, `3 4`, `3..2`, `(3 + 4`, an empty line, `4 / (2 - 2)`.
- No `eval`, no script engine, no parser library.

## Done when

- [ ] `mvn test`: all 6 tests pass.
- [ ] Every line in the session above gives the same answer.
- [ ] A bad line never ends the program. Only `exit` does.
- [ ] You can explain why `12 + 3 * 4` is `24`, by saying which method does the `*`.

**Extra:** decimals. `3.5 * 2` is `7`. Switch from `int` to `double` and read a dot inside numbers. Write the tests first.

## Files

- [step-by-step.md](step-by-step.md): from "only numbers" to brackets, in small steps.
- [starter/pom.xml](starter/pom.xml): the project, with `TODO` comments in `Parser.java` and all tests ready.
- [solution/pom.xml](solution/pom.xml): one finished answer, see [Parser.java](solution/src/main/java/calculator/Parser.java).

> [!CHECK]
> 1. In `2 + 3 * 4`, which method does the multiplication?
>    <details><summary>Answer</summary><code>term</code>. <code>expression</code> asks <code>term</code> for the right side of the <code>+</code>, and <code>term</code> returns 12, not 3. So the result is 14.</details>
> 2. What stops the recursion in `((2))`?
>    <details><summary>Answer</summary>The number. <code>factor</code> sees <code>(</code> twice and calls <code>expression</code> twice, but then it sees the digit 2 and returns it without another call. That is the base case.</details>
> 3. Why is `20 - 4 - 1` computed in a loop and not by calling <code>expression</code> on the right side?
>    <details><summary>Answer</summary>Recursion on the right would compute <code>20 - (4 - 1)</code> = 17. The loop does <code>(20 - 4) - 1</code> = 15, left to right.</details>

**Next:** back to the [learning path](../../hub/index.html) for the next step, or build your own idea.
