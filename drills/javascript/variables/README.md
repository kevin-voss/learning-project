# Drill: variables

> [!PICTURE]
> A variable is a box with a label on it. You put a value in the box. Later you ask for the box by its label and get the value back.

<div data-anim="boxes"></div>

## The idea

A **variable** stores a value under a name. You make one with `const` or `let`.

- `const` is a box you fill once. Use it almost always.
- `let` is a box you may fill again later.
- A value has a **type**: a number like `9`, or a string (text) like `"Ada"`.

## Tiny example

```javascript
const width = 4;
const height = 5;
const area = width * height;   // 20

let score = 0;
score = score + 3;             // now 3

const name = "Ada";
const hello = `Hello, ${name}!`;  // "Hello, Ada!"
```

The text in backticks is a **template string**. `${name}` puts the value of `name` into the text.

> [!TRY]
> 1. Open `drills/javascript/variables/tasks.js` in your editor.
> 2. Find Task 1. Replace `return 0;` with your own code.
> 3. In the terminal, in the project folder, run `make variables-task-01`.
> You should see: `1 pass` in green.

## Run this topic's tests

```bash
make variables            # all 10 tasks
make variables-task-05    # only task 5
```

No `make`? Run `bun test ./drills/javascript/variables/` instead.

## The tasks

1. Rectangle area
2. Celsius to Fahrenheit
3. Minutes to seconds
4. Two words with a space
5. Welcome with a template string
6. Length of a text (`.length`)
7. Number to text (`String`)
8. Text to number (`Number`)
9. Remainder of a division (`%`)
10. Add one, without changing `n`

> [!CHECK]
> 1. What is in the box after `const age = 9`?
>    <details><summary>Answer</summary>The number 9. The label is `age`.</details>
> 2. You write `const x = 1;` and later `x = 2;`. What happens?
>    <details><summary>Answer</summary>An error. A `const` box cannot be filled again. Use `let` if the value must change.</details>
> 3. What does `10 % 3` give?
>    <details><summary>Answer</summary>`1`. It is the rest after dividing 10 by 3.</details>

**Next:** [Drill: math](../math/README.md)
