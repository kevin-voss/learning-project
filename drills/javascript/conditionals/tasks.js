/**
 * JavaScript drill: if / else (read README.md first)
 * Run the tests from the project folder: make conditionals | make conditionals-task-04
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Sign of a number
 *
 * **Your job:** Tell if a number is below zero, zero, or above zero.
 * **You get:** `n` (a number).
 * **How:** Use `if` / `else if` / `else`. Return `-1` for below zero, `0` for zero, `1` for above zero.
 * **Returns:** Only `-1`, `0` or `1`.
 *
 * **Test it:** `make conditionals-task-01`
 *
 * @example signOf(-3) // → -1
 * @example signOf(0) // → 0
 * @example signOf(5) // → 1
 */
export function signOf(n) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 2 — Bigger of two, without Math.max
 *
 * **Your job:** Return the bigger of two numbers. Do not use `Math.max`.
 * **You get:** `a` and `b` (two numbers).
 * **How:** Compare with `if (a > b)`. Return the bigger one.
 * **Returns:** The bigger number.
 *
 * **Test it:** `make conditionals-task-02`
 *
 * @example maxOfTwo(2, 9) // → 9
 */
export function maxOfTwo(a, b) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 3 — Passed?
 *
 * **Your job:** Check if a score is enough to pass.
 * **You get:** `score` (a number).
 * **How:** 50 or more passes (`true`), less fails (`false`).
 *   You can return `score >= 50` directly, or use `if` / `else`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make conditionals-task-03`
 *
 * @example isPassing(50) // → true
 * @example isPassing(49) // → false
 */
export function isPassing(score) {
  // TODO: write your code here
  return false;
}

/**
 * Task 4 — How does it feel outside?
 *
 * **Your job:** Describe a temperature in one word.
 * **You get:** `celsius` (a temperature).
 * **How:** Below 10 → `"cold"`. Below 22 → `"nice"`. Otherwise → `"warm"`.
 * **Returns:** Exactly one of these strings.
 *
 * **Test it:** `make conditionals-task-04`
 *
 * @example temperatureFeel(5) // → "cold"
 * @example temperatureFeel(15) // → "nice"
 */
export function temperatureFeel(celsius) {
  // TODO: write your code here
  return "";
}

/**
 * Task 5 — Ticket price by age
 *
 * **Your job:** Work out the ticket price for a person.
 * **You get:** `age` (in years).
 * **How:** Younger than 6 → `0` euros. Younger than 18 → `8`. Otherwise → `15`.
 * **Returns:** A whole number (euros).
 *
 * **Test it:** `make conditionals-task-05`
 *
 * @example ticketPrice(5) // → 0
 * @example ticketPrice(10) // → 8
 */
export function ticketPrice(age) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 6 — Leap year
 *
 * **Your job:** Check if a year is a leap year (February has 29 days).
 * **You get:** `year` (a number).
 * **How:** Check in this order. You can divide by 400 with no rest → leap year.
 *   Otherwise you can divide by 100 → not a leap year.
 *   Otherwise you can divide by 4 → leap year. Otherwise → not a leap year.
 *   "No rest" means `year % 400 === 0`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make conditionals-task-06`
 *
 * @example isLeapYear(2024) // → true
 * @example isLeapYear(1900) // → false
 * @example isLeapYear(2000) // → true
 */
export function isLeapYear(year) {
  // TODO: write your code here
  return false;
}

/**
 * Task 7 — Distance from zero, without Math.abs
 *
 * **Your job:** Drop the minus sign. Do not use `Math.abs`.
 * **You get:** `n` (a number).
 * **How:** If `n < 0`, return `-n`. Otherwise return `n`.
 * **Returns:** A number (0 or more).
 *
 * **Test it:** `make conditionals-task-07`
 *
 * @example absoluteNoMath(-4) // → 4
 */
export function absoluteNoMath(n) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 8 — Smaller of two, without Math.min
 *
 * **Your job:** Return the smaller of two numbers. Do not use `Math.min`.
 * **You get:** `a` and `b` (two numbers).
 * **How:** Compare with `if (a < b)`. Return the smaller one.
 * **Returns:** A number.
 *
 * **Test it:** `make conditionals-task-08`
 *
 * @example minOfTwo(3, 1) // → 1
 */
export function minOfTwo(a, b) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 9 — Exactly one is true
 *
 * **Your job:** Return `true` when exactly one of two booleans is `true`.
 * **You get:** `a` and `b` (two booleans).
 * **How:** Exactly one is true when they are different: `a !== b`.
 *   With and/or/not it is `(a && !b) || (!a && b)`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make conditionals-task-09`
 *
 * @example exactlyOneTrue(true, false) // → true
 * @example exactlyOneTrue(true, true) // → false
 */
export function exactlyOneTrue(a, b) {
  // TODO: write your code here
  return false;
}

/**
 * Task 10 — Grade letter
 *
 * **Your job:** Turn a score into a grade letter.
 * **You get:** `score` (a number).
 * **How:** 90 or more → `"A"`. 80 or more → `"B"`. 70 or more → `"C"`. Otherwise → `"D"`.
 *   Check the biggest number first.
 * **Returns:** One letter as a string.
 *
 * **Test it:** `make conditionals-task-10`
 *
 * @example gradeLetter(95) // → "A"
 */
export function gradeLetter(score) {
  // TODO: write your code here
  return "";
}
