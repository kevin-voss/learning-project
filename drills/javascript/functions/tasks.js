/**
 * JavaScript drill: functions (read README.md first)
 * Run the tests from the project folder: make functions | make functions-task-04
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Square
 *
 * **Your job:** Multiply a number by itself.
 * **You get:** `x` (a number).
 * **How:** Return `x * x`.
 * **Returns:** A number.
 *
 * **Test it:** `make functions-task-01`
 *
 * @example squareNumber(4) // → 16
 */
export function squareNumber(x) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 2 — Cube
 *
 * **Your job:** Work out `x` to the power of 3.
 * **You get:** `x` (a number).
 * **How:** `x * x * x`, or `x ** 3`. Bonus: call your own `squareNumber(x)` and multiply by `x`.
 * **Returns:** A number.
 *
 * **Test it:** `make functions-task-02`
 *
 * @example cubeNumber(3) // → 27
 */
export function cubeNumber(x) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 3 — Long side of a right triangle
 *
 * **Your job:** Work out the longest side (the hypotenuse) of a right-angled triangle.
 * **You get:** `a` and `b` (the two short sides).
 * **How:** Pythagoras: `Math.sqrt(a * a + b * b)`.
 * **Returns:** A number (0 or more).
 *
 * **Test it:** `make functions-task-03`
 *
 * @example hypotenuseNumber(3, 4) // → 5
 */
export function hypotenuseNumber(a, b) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 4 — Greeting with a default
 *
 * **Your job:** Greet a person. If nobody is named, greet the world.
 * **You get:** `name` (a string, or `undefined` when the caller gives nothing).
 * **How:** If `name === undefined`, return `"Hello, world!"`. Otherwise return `"Hello, NAME!"`.
 * **Returns:** A string.
 *
 * **Test it:** `make functions-task-04`
 *
 * @example greetOrDefault() // → "Hello, world!"
 * @example greetOrDefault("Alex") // → "Hello, Alex!"
 */
export function greetOrDefault(name) {
  // TODO: write your code here
  return "";
}

/**
 * Task 5 — Format a price in euros
 *
 * **Your job:** Show an amount with exactly two digits after the dot and a euro sign.
 * **You get:** `amount` (a number).
 * **How:** `amount.toFixed(2)` gives a string like `"12.50"`. Add `" €"` (space, euro sign) at the end.
 * **Returns:** A string like `"12.50 €"`.
 *
 * **Test it:** `make functions-task-05`
 *
 * @example formatEuro(12.5) // → "12.50 €"
 */
export function formatEuro(amount) {
  // TODO: write your code here
  return "";
}

/**
 * Task 6 — Longer than n?
 *
 * **Your job:** Check if a text has more than `n` characters.
 * **You get:** `text` (a string) and `n` (a number).
 * **How:** Return `text.length > n`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make functions-task-06`
 *
 * @example longerThan("abc", 2) // → true
 */
export function longerThan(text, n) {
  // TODO: write your code here
  return false;
}

/**
 * Task 7 — Safe division
 *
 * **Your job:** Divide `a` by `b`. Dividing by 0 makes no sense, so return `null` then.
 * **You get:** `a` and `b` (two numbers).
 * **How:** If `b === 0`, return `null`. Otherwise return `a / b`.
 * **Returns:** A number, or `null`.
 *
 * **Test it:** `make functions-task-07`
 *
 * @example safeDivideNums(10, 2) // → 5
 * @example safeDivideNums(10, 0) // → null
 */
export function safeDivideNums(a, b) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 8 — Code number of the first letter
 *
 * **Your job:** Every character has a code number inside the computer. Return the code of the first one.
 * **You get:** `text` (a string, never empty).
 * **How:** Use `text.charCodeAt(0)`.
 * **Returns:** A whole number ("A" is 65).
 *
 * **Test it:** `make functions-task-08`
 *
 * @example firstCharCodeAt("A") // → 65
 */
export function firstCharCodeAt(text) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 9 — Glue two parts
 *
 * **Your job:** Join two strings into one, with nothing in between.
 * **You get:** `a` and `b` (two strings).
 * **How:** Return `a + b`.
 * **Returns:** A string.
 *
 * **Test it:** `make functions-task-09`
 *
 * @example joinParts("foo", "bar") // → "foobar"
 */
export function joinParts(a, b) {
  // TODO: write your code here
  return "";
}

/**
 * Task 10 — The middle of three numbers
 *
 * **Your job:** Return the number in the middle when you sort the three (not the average).
 * **You get:** `a`, `b` and `c` (three numbers).
 * **How:** Add all three, then take away the biggest (`Math.max`) and the smallest (`Math.min`).
 *   What is left is the middle one.
 * **Returns:** A number.
 *
 * **Test it:** `make functions-task-10`
 *
 * @example middleValue(1, 9, 5) // → 5
 */
export function middleValue(a, b, c) {
  // TODO: write your code here
  return 0;
}
