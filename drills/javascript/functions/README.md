# Drill: functions

> [!PICTURE]
> A vending machine. You put coins and a button number in. The machine works inside, where you cannot see. One snack comes out of the slot. A function works the same way: values go in, one value comes out with `return`.

<div data-anim="vending"></div>

## The idea

You have filled in function bodies in every drill so far. Now you look at the machine itself.

- `function name(a, b) { … }` builds a machine called `name`.
- `a` and `b` are **parameters**: the slots where values go in.
- `return` pushes one value out of the slot. The function stops right there.
- **Calling** the function uses the machine: `name(2, 3)`. The values you pass are the **arguments**.
- If the caller gives nothing for a parameter, it is `undefined`.
- One function may call another one. Small machines build bigger ones.

## Tiny example

```javascript
function add(a, b) {
  return a + b;
}

function double(x) {
  return add(x, x);   // one function calls another
}

console.log(add(2, 3));   // 5
console.log(double(4));   // 8
```

> [!WARN]
> `console.log` shows a value on the screen. It does **not** give it back. The tests only see what you `return`.

> [!TRY]
> 1. Save the example above as `machines.js` and run `bun machines.js`.
> 2. Add a function `triple(x)` that returns `x * 3`, and print `triple(5)`.
> You should see: `5`, `8` and then `15`.

## Run this topic's tests

```bash
make functions            # all 10 tasks
make functions-task-05    # only task 5
```

No `make`? Run `bun test ./drills/javascript/functions/` instead.

## The tasks

1. Square
2. Cube (bonus: reuse your square function)
3. Long side of a right triangle (`Math.sqrt`)
4. Greeting with a default name
5. Format a price in euros (`toFixed(2)`)
6. Longer than n?
7. Safe division (`null` when dividing by 0)
8. Code number of the first letter (`charCodeAt`)
9. Glue two parts
10. The middle of three numbers

> [!CHECK]
> 1. In `function area(w, h) { return w * h; }`, what are `w` and `h`?
>    <details><summary>Answer</summary>Parameters: the slots where values go in.</details>
> 2. What does `area(3, 4)` give?
>    <details><summary>Answer</summary>`12`. The function returns `3 * 4`.</details>
> 3. A function has `console.log(x * 2)` but no `return`. What does a call give back?
>    <details><summary>Answer</summary>`undefined`. It prints the value but gives nothing back.</details>

**Next:** [Drill: objects](../objects/README.md)
