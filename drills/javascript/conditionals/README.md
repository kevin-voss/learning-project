# Drill: if / else

> [!PICTURE]
> A traffic light. Red: stop. Yellow: wait. Green: go. The car asks one question at a time and does only the one thing that fits. `if` / `else` lets your code do the same.

<div data-anim="traffic"></div>

## The idea

A **condition** is a question with the answer `true` or `false`, like `age < 18`.

- Compare with `===` (equal), `!==` (not equal), `<`, `>`, `<=`, `>=`.
- `if` runs a block only when the condition is `true`.
- `else if` asks the next question. `else` catches everything left over.
- Only the **first** matching block runs.
- `&&` (and), `||` (or) and `!` (not) combine conditions. You met them in the [and, or, not lesson](../../../tracks/computer-science/index.html#logical-operators).

## Tiny example

```javascript
const light = "yellow";

if (light === "red") {
  console.log("stop");
} else if (light === "yellow") {
  console.log("wait");
} else {
  console.log("go");
}
// prints: wait
```

> [!WARN]
> `=` puts a value in a box. `===` compares two values. Inside `if ( … )` you almost always want `===`.

> [!TRY]
> 1. Open `drills/javascript/conditionals/tasks.js` and solve Task 1.
> 2. Run `make conditionals-task-01` in the project folder.
> You should see: `1 pass` in green.

## Run this topic's tests

```bash
make conditionals            # all 10 tasks
make conditionals-task-06    # only task 6
```

No `make`? Run `bun test ./drills/javascript/conditionals/` instead.

## The tasks

1. Sign of a number (-1, 0, 1)
2. Bigger of two, without `Math.max`
3. Passed? (50 points or more)
4. How does it feel outside? (`"cold"` / `"nice"` / `"warm"`)
5. Ticket price by age
6. Leap year
7. Distance from zero, without `Math.abs`
8. Smaller of two, without `Math.min`
9. Exactly one is true
10. Grade letter

> [!CHECK]
> 1. `const age = 12`. Which block runs: `if (age < 6)`, `else if (age < 18)` or `else`?
>    <details><summary>Answer</summary>The `else if (age < 18)` block. 12 is not below 6, but it is below 18.</details>
> 2. What is `5 === "5"`?
>    <details><summary>Answer</summary>`false`. One is a number, the other a string.</details>
> 3. In the grade task, why must you check `score >= 90` before `score >= 80`?
>    <details><summary>Answer</summary>95 is also `>= 80`. If you check 80 first, a 95 gets a "B".</details>

**Next:** [Drill: loops](../loops/README.md)
