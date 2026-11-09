# Task 06_1 · Even-sum loop trace

Part of [Exercise 06 · Programming basics](../README.md). New ideas you need: **`for` loop**, **running total**, **even** (`i % 2 === 0`). They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

What output does the following JavaScript code produce? What is being computed?

```js
let a = 1;
let b = 5;
let sum = 0;
for (let i = a; i <= b; i++) {
  if (i % 2 === 0) {
    sum = sum + i;
  }
  console.log(i + " | Sum: " + sum);
}
console.log("Total sum: " + sum);
```

(The original sheet used German labels `Summe` and `Gesamtsumme`; use **English** words `Sum` and `Total sum` like above so your printout matches the tests.)

## The task, simply said

- Run a loop with `i` from `1` to `5`.
- Each time `i` is **even**, add `i` to `sum`.
- After each step, print one line: the current `i` and the current `sum`.
- After the loop, print the **total** `sum`.
- This task is about **tracing** that behavior: your program should **print** exactly what the loop would print (you may paste the same structure).

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| *(nothing — the program takes no input)* | See the exact block below (six lines). |

Program output (exactly):

```text
1 | Sum: 0
2 | Sum: 2
3 | Sum: 2
4 | Sum: 6
5 | Sum: 6
Total sum: 6
```

## Little helpers

<details>
<summary>I am stuck on what happens when `i` is 1</summary>

When `i` is 1, it is **not** even, so the `if` body does **not** run. `sum` stays `0`, but you still print a line for `i === 1`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 06](../README.md).
