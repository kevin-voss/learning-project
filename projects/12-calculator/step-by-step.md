# Calculator: step by step

> [!PICTURE]
> Your finger moves along the line, one character at a time, and never goes back.
> `pos` is your finger. Every method looks at what is under the finger and moves it forward.

Do one step, run the tests, see the result. Then go on. Do not start with brackets: they come in step 5.

## Step 1: Run the starter

1. Copy the whole `starter/` folder to your own place, for example `my-calculator/`, and go into it.
2. Run the program:

```bash
mvn -q compile exec:java
```

3. Type `12`, then `2+3`, then `exit`.

You should see: `12`, then `I don't understand this expression.` The starter knows numbers only.

## Step 2: Read the parts you get for free

Open `Parser.java` and read these. You will use them all the time.

| Method | What it does |
|---|---|
| `evaluate(line)` | Starts at `pos = 0`, calls `expression()`, checks that nothing is left over. |
| `number()` | Reads digits: `'1'` then `'2'` becomes `0 * 10 + 1 = 1`, then `1 * 10 + 2 = 12`. |
| `next(c)` | If the character under the finger is `c`, it moves past it and returns `true`. |
| `skipSpaces()` | Moves the finger over spaces. |
| `fail(message)` | Throws an `IllegalArgumentException`. `Main` catches it and prints the message. |

Then run the tests:

```bash
mvn test
```

You should see: `Tests run: 6` and `BUILD FAILURE`. The tests are your checklist.

## Step 3: Plus and minus

`expression` gets a first value from `term()`, then loops:

```java
int value = term();
while (true) {
    skipSpaces();
    if (next('+')) {
        value = value + term();
    } else if (next('-')) {
        // your turn
    } else {
        return value;
    }
}
```

1. Finish the loop in `expression`.
2. Run the program and try `2+3`, `20 - 4 - 1` and `3 + + 4`.

You should see: `5`, `15`, and `I don't understand this expression.`

> [!NOTE]
> `20 - 4 - 1` is 15 because the loop goes left to right: first `20 - 4`, then `- 1`.

## Step 4: Times and divide

`term` has the very same shape as `expression`, but it calls `factor()` and looks for `*` and `/`.

1. Write the loop in `term`.
2. Try `2 + 3 * 4` and `8 / 2 / 2`.

You should see: `14` (not 20) and `2`.

This is the magic: `expression` asks `term` for each side of a `+`. `term` eats the whole `3 * 4` before it answers. So times always happens first.

## Step 5: Brackets (the recursion)

When `factor` sees `(`, a whole new calculation starts inside. You already have a method for a whole calculation: `expression`.

```java
if (next('(')) {
    int value = expression();   // the method calls back up: recursion
    skipSpaces();
    if (!next(')')) {
        fail("Missing ')'.");
    }
    return value;
}
```

1. Add this at the top of `factor`, after `skipSpaces()`.
2. Try `(1 + 2) * 3`, `((2 + 3) * (4 - 1))` and `(3 + 4`.

You should see: `9`, `15` and `Missing ')'.`

> [!NOTE]
> The **base case** is the number. Every bracket calls `expression` once more, but sooner or later `factor` finds a digit and returns without calling anything. Then the calls finish, one by one, from the inside out.

## Step 6: Minus in front, and division by zero

1. In `factor`: if `next('-')`, return `-factor()`. That is recursion too: `--3` is `3`.
2. In `term`: before you divide, check the divisor. `0` calls `fail("Division by zero.")`.
3. Run `mvn test`.

You should see: `Tests run: 6, Failures: 0, Errors: 0` and `BUILD SUCCESS`.

> [!TRY]
> Add a test of your own to `ParserTest.java`:
>
> ```java
> @Test
> void deepBrackets() {
>     assertEquals(1, parser.evaluate("((((((1))))))"));
> }
> ```
>
> Run `mvn test`. You should see: `Tests run: 7`, all green. Six brackets meant six extra calls of `expression`, and all six came back.

> [!CHECK]
> 1. Which method would you change to add `%` (the rest of a division)?
>    <details><summary>Answer</summary><code>term</code>. <code>%</code> is as strong as <code>*</code> and <code>/</code>, so it goes into the same loop.</details>
> 2. Why does `evaluate` check that `pos` reached the end?
>    <details><summary>Answer</summary>For <code>3 4</code>, <code>expression</code> stops after the 3 and returns. Without the check, the answer would be 3 and the 4 would be ignored silently.</details>

Stuck? Compare with the [solution](solution/src/main/java/calculator/Parser.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
