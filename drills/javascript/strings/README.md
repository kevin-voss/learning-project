# Drill: strings

> [!PICTURE]
> A string is a necklace of letter beads. Each bead has a number, starting at 0. You can count the beads, look at one bead, or cut off a piece of the necklace. You never change the old necklace: every tool hands you a new one.

## The idea

A **string** is text in quotes: `"hello"` or `'hello'`.

- `text.length` counts the beads.
- `text[0]` is the first bead. `text[text.length - 1]` is the last.
- A **method** is a tool that belongs to the string. You call it with a dot: `text.toUpperCase()`.
- Methods give you a **new** string. The old one stays as it was.

## Tiny example

```javascript
const word = "hello";
word.length;            // 5
word[0];                // "h"
word.toUpperCase();     // "HELLO"
word.includes("ell");   // true
word.slice(1, 3);       // "el"  (start at 1, stop before 3)
```

Useful tools for this drill: `includes`, `startsWith`, `endsWith`, `toLowerCase`, `toUpperCase`, `trim`, `replaceAll`, `slice`.

> [!TRY]
> 1. Open the browser console (F12) and type `"hello".toUpperCase()`.
> 2. Open `drills/javascript/strings/tasks.js` and solve Task 1.
> 3. Run `make strings-task-01` in the project folder.
> You should see: `HELLO` in the console, then `1 pass` in green.

## Run this topic's tests

```bash
make strings            # all 10 tasks
make strings-task-10    # only task 10
```

No `make`? Run `bun test ./drills/javascript/strings/` instead.

## The tasks

1. Does the text contain a piece?
2. Does it start with …?
3. Does it end with …?
4. Small letters
5. Capital letters
6. Cut off spaces (`trim`)
7. Dashes instead of spaces
8. The last letter
9. The first three characters (`slice`)
10. Capital first letter

> [!CHECK]
> 1. What is `"cat"[1]`?
>    <details><summary>Answer</summary>`"a"`. Counting starts at 0, so `[1]` is the second bead.</details>
> 2. After `const name = "ada"; name.toUpperCase();`, what is in `name`?
>    <details><summary>Answer</summary>Still `"ada"`. The method returns a new string; it does not change the old one.</details>
> 3. What does `"banana".slice(0, 3)` give?
>    <details><summary>Answer</summary>`"ban"`. Start at 0, stop before 3.</details>

**Next:** the lesson [True or false: and, or, not](../../../tracks/computer-science/index.html#logical-operators), then [Drill: if / else](../conditionals/README.md).
