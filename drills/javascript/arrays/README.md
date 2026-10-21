# Drill: arrays

> [!PICTURE]
> An egg carton with numbered cups. Each cup holds one thing. The first cup is number 0, the next is 1, and so on. You can look into one cup by its number, count the cups, or put a new egg into the next free cup.

<div data-anim="shelf"></div>

## The idea

An **array** is a list of values in square brackets: `[3, 9, 2]`.

- `array[0]` is the first item. `array[array.length - 1]` is the last.
- `array.length` is how many items there are.
- `array.push(x)` puts `x` into a new cup at the end.
- You walk through an array with the same loop you used on strings: `for (let i = 0; i < array.length; i++)`.

## Tiny example

```javascript
const eggs = [3, 9, 2];
eggs[0];          // 3
eggs.length;      // 3

eggs.push(7);     // eggs is now [3, 9, 2, 7]

let total = 0;
for (let i = 0; i < eggs.length; i++) {
  total = total + eggs[i];
}
console.log(total);   // 21
```

> [!NOTE]
> `const` keeps the **label** fixed, not the contents. You may `push` into a `const` array. You may not write `eggs = [1]`.

> [!TRY]
> 1. Open `drills/javascript/arrays/tasks.js` and solve Task 1.
> 2. Run `make arrays-task-01` in the project folder.
> You should see: `1 pass` in green.

## Run this topic's tests

```bash
make arrays            # all 11 tasks
make arrays-task-03    # only task 3
```

No `make`? Run `bun test ./drills/javascript/arrays/` instead.

## The tasks

1. Sum of all numbers
2. Average (empty array → `0`)
3. Biggest item (empty array → `null`)
4. How often is a value there?
5. Double every number (new array)
6. First item or `null`
7. Last item or `null`
8. Range `1 … n`
9. Join two arrays (`[...a, ...b]`)
10. Reversed copy
11. Is there an even number?

> [!CHECK]
> 1. `const pets = ["cat", "dog", "fish"]`. What is `pets[1]`?
>    <details><summary>Answer</summary>`"dog"`. Counting starts at 0.</details>
> 2. What is `pets[pets.length - 1]`?
>    <details><summary>Answer</summary>`"fish"`, the last item. `pets.length` is 3, so this is `pets[2]`.</details>
> 3. Why does `findMax` start with `max = array[0]` and not `max = 0`?
>    <details><summary>Answer</summary>If every number is negative, 0 would win, but 0 is not in the array.</details>

**Next:** the lesson [Arrays: a shelf with numbered boxes](../../../tracks/computer-science/index.html#arrays), then [Drill: functions](../functions/README.md).
