# Drill: loops

> [!PICTURE]
> Running laps on a track. You start at the line, run one lap, and add one to your lap counter. You stop when the counter says you are done. A loop runs the same code lap after lap, and `i` is the lap counter.

<div data-anim="laps"></div>

## The idea

A **loop** repeats a block of code.

- A `for` loop has three parts: where the counter starts, when to keep going, and how the counter changes.
- `for (let i = 1; i <= 3; i++)` runs three laps with `i` = 1, 2, 3. `i++` means "add 1 to `i`".
- A `while` loop keeps going as long as its condition is `true`.
- Most tasks need a box **outside** the loop (a sum, a counter, a string) that grows a little each lap.

## Tiny example

```javascript
let sum = 0;
for (let i = 1; i <= 3; i++) {
  sum = sum + i;
}
console.log(sum);   // 6  (1 + 2 + 3)

const word = "cat";
for (let i = 0; i < word.length; i++) {
  console.log(word[i]);   // "c", then "a", then "t"
}
```

> [!WARN]
> A loop whose condition never becomes `false` runs forever. If the terminal hangs, press `Ctrl + C` and check how your counter changes.

> [!TRY]
> 1. Save the example above as `laps.js` and run `bun laps.js`.
> 2. Change `i <= 3` to `i <= 5` and run it again.
> You should see: `6`, the three letters, and then `15` after your change.

## Run this topic's tests

```bash
make loops            # all 10 tasks
make loops-task-07    # only task 7
```

No `make`? Run `bun test ./drills/javascript/loops/` instead.

## The tasks

1. Sum from 1 to n
2. Repeat a character
3. Count a letter in a text
4. Multiply from 1 to n (factorial)
5. Turn a string around
6. A row of stars
7. Palindrome ("anna" backwards is "anna")
8. Sum of the even numbers
9. Where is the letter? (or `-1`)
10. Count the digits (`while`)

> [!CHECK]
> 1. How many laps does `for (let i = 0; i < 4; i++)` run?
>    <details><summary>Answer</summary>Four: `i` is 0, 1, 2, 3. At 4 the condition `i < 4` is `false`.</details>
> 2. Why does the product in task 4 start at `1` and not `0`?
>    <details><summary>Answer</summary>Anything times 0 is 0. Starting at 1 does not change the result.</details>
> 3. Where must `let sum = 0` go: inside or outside the loop?
>    <details><summary>Answer</summary>Outside, before the loop. Inside, it would reset to 0 every lap.</details>

**Next:** [Drill: arrays](../arrays/README.md)
