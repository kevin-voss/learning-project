# Drill: math

> [!PICTURE]
> `Math` is a calculator that comes with JavaScript. It has a button for each job: round down, round up, biggest, smallest, square root. You press a button by writing its name and putting your numbers in the brackets.

## The idea

You already know `+`, `-`, `*`, `/` and `%`. For everything else, JavaScript has `Math`:

- `Math.floor(x)` rounds down. `Math.ceil(x)` rounds up. `Math.round(x)` rounds to the nearest.
- `Math.abs(x)` drops the minus sign.
- `Math.max(a, b, …)` gives the biggest, `Math.min(a, b, …)` the smallest.
- `a ** b` (or `Math.pow(a, b)`) is a power. `Math.sqrt(x)` is a square root.

Brackets work like in school maths: `(1 + 2) * 3` is `9`, but `1 + 2 * 3` is `7`.

## Tiny example

```javascript
const price = 4.6;
const roundedDown = Math.floor(price);   // 4
const roundedUp = Math.ceil(price);      // 5
const biggest = Math.max(3, 9, 2);       // 9
const square = 3 ** 2;                   // 9
```

> [!TRY]
> 1. Open `drills/javascript/math/tasks.js`.
> 2. Solve Task 1 with `Math.floor`.
> 3. Run `make math-task-01` in the project folder.
> You should see: `1 pass` in green.

## Run this topic's tests

```bash
make math            # all 10 tasks
make math-task-08    # only task 8
```

No `make`? Run `bun test ./drills/javascript/math/` instead.

## The tasks

1. Round down (`Math.floor`)
2. Round up (`Math.ceil`)
3. Distance from zero (`Math.abs`)
4. Power (`**`)
5. Bigger of two (`Math.max`)
6. Smallest of three (`Math.min`)
7. Clamp: keep a value inside a range
8. Average of three numbers
9. Round to two decimal places
10. Percentage

> [!CHECK]
> 1. What is `Math.floor(7.9)`?
>    <details><summary>Answer</summary>`7`. Floor always goes down.</details>
> 2. What is `Math.max(4, 11, 6)`?
>    <details><summary>Answer</summary>`11`, the biggest number.</details>
> 3. Why is `(2 + 4) / 2` different from `2 + 4 / 2`?
>    <details><summary>Answer</summary>Division runs before addition. The first gives `3`, the second gives `4`.</details>

**Next:** [Drill: strings](../strings/README.md)
