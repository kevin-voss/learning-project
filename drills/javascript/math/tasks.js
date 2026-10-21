/**
 * JavaScript drill: math (read README.md first)
 * Run the tests from the project folder: make math | make math-task-05
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Round down
 *
 * **Your job:** Round a number down to the whole number below it.
 * **You get:** `x` (a number like 9.9).
 * **How:** Use `Math.floor(x)` and return the result.
 * **Returns:** A whole number.
 *
 * **Test it:** `make math-task-01`
 *
 * @example floorValue(9.9) // → 9
 */
export function floorValue(x) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 2 — Round up
 *
 * **Your job:** Round a number up to the whole number above it.
 * **You get:** `x` (a number like 2.1).
 * **How:** Use `Math.ceil(x)` and return the result.
 * **Returns:** A whole number.
 *
 * **Test it:** `make math-task-02`
 *
 * @example ceilValue(2.1) // → 3
 */
export function ceilValue(x) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 3 — Distance from zero
 *
 * **Your job:** Drop the minus sign. This is called the absolute value.
 * **You get:** `x` (a number, for example -5).
 * **How:** Use `Math.abs(x)` and return the result.
 * **Returns:** A number (0 or more).
 *
 * **Test it:** `make math-task-03`
 *
 * @example absoluteValue(-5) // → 5
 */
export function absoluteValue(x) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 4 — Power
 *
 * **Your job:** Work out `base` to the power of `exp` (2 to the power of 4 is 2 * 2 * 2 * 2).
 * **You get:** `base` and `exp` (two numbers).
 * **How:** Use the power operator `**` (`base ** exp`) or `Math.pow(base, exp)`.
 * **Returns:** A number.
 *
 * **Test it:** `make math-task-04`
 *
 * @example powerValue(2, 4) // → 16
 */
export function powerValue(base, exp) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 5 — The bigger of two numbers
 *
 * **Your job:** Find the bigger of two numbers.
 * **You get:** `a` and `b` (two numbers).
 * **How:** Use `Math.max(a, b)` and return the result.
 * **Returns:** The bigger number.
 *
 * **Test it:** `make math-task-05`
 *
 * @example maximumTwo(3, 7) // → 7
 */
export function maximumTwo(a, b) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 6 — The smallest of three numbers
 *
 * **Your job:** Find the smallest of three numbers.
 * **You get:** `a`, `b` and `c` (three numbers).
 * **How:** Use `Math.min(a, b, c)` and return the result.
 * **Returns:** The smallest number.
 *
 * **Test it:** `make math-task-06`
 *
 * @example minimumThree(4, 2, 9) // → 2
 */
export function minimumThree(a, b, c) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 7 — Clamp (keep a value inside a range)
 *
 * **Your job:** Keep `value` between `min` and `max`. Too small → `min`. Too big → `max`. Otherwise `value`.
 * **You get:** `value`, `min` and `max` (three numbers).
 * **How:** Two steps. First `Math.max(value, min)` lifts a too-small value up to `min`.
 *   Then `Math.min(thatResult, max)` pulls a too-big value down to `max`.
 * **Returns:** A number between `min` and `max` (both included).
 *
 * **Test it:** `make math-task-07`
 *
 * @example clampValue(5, 0, 10) // → 5
 * @example clampValue(-1, 0, 10) // → 0
 * @example clampValue(99, 0, 10) // → 10
 */
export function clampValue(value, min, max) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 8 — Average of three numbers
 *
 * **Your job:** Work out the average (the mean) of three numbers.
 * **You get:** `a`, `b` and `c` (three numbers).
 * **How:** Add them up, then divide by 3. Use brackets: `(a + b + c) / 3`.
 *   Without brackets, JavaScript divides `c` by 3 first, like in school maths.
 * **Returns:** A number.
 *
 * **Test it:** `make math-task-08`
 *
 * @example averageOfThree(1, 2, 3) // → 2
 * @example averageOfThree(2, 4, 9) // → 5
 */
export function averageOfThree(a, b, c) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 9 — Round to two decimal places
 *
 * **Your job:** Round a number to two digits after the dot.
 * **You get:** `x` (a number like 3.146).
 * **How:** Multiply by 100, round with `Math.round()`, then divide by 100 again.
 * **Returns:** A number with at most two digits after the dot.
 *
 * **Test it:** `make math-task-09`
 *
 * @example roundTwoDecimals(3.146) // → 3.15
 */
export function roundTwoDecimals(x) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 10 — Percentage
 *
 * **Your job:** Work out what percent `part` is of `whole`.
 * **You get:** `part` and `whole` (two numbers, `whole` is never 0).
 * **How:** Divide the part by the whole and multiply by 100: `part / whole * 100`.
 * **Returns:** A number, for example `12.5`.
 *
 * **Test it:** `make math-task-10`
 *
 * @example percentage(25, 200) // → 12.5
 */
export function percentage(part, whole) {
  // TODO: write your code here
  return 0;
}
