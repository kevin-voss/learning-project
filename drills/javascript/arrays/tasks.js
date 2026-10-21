/**
 * JavaScript drill: arrays (read README.md first)
 * Run the tests from the project folder: make arrays | make arrays-task-01
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Sum of all numbers
 *
 * **Your job:** Add up every number in the array.
 * **You get:** `array` (an array of numbers).
 * **How:** Like the loops drill: `let sum = 0`, loop `i` from 0 to `array.length - 1`, add `array[i]`.
 * **Returns:** A number (`0` for an empty array).
 *
 * **Test it:** `make arrays-task-01`
 *
 * @example add([1, 2, 3]) // → 6
 * @example add([]) // → 0
 */
export function add(array) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 2 — Average
 *
 * **Your job:** Work out the average of all numbers in the array.
 * **You get:** `array` (an array of numbers).
 * **How:** Divide the sum by the number of items (`array.length`).
 *   An empty array must give `0`, not `NaN` ("not a number"), so check `array.length === 0` first.
 * **Returns:** A number.
 *
 * **Test it:** `make arrays-task-02`
 *
 * @example average([2, 4, 6]) // → 4
 * @example average([]) // → 0
 */
export function average(array) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 3 — Biggest item
 *
 * **Your job:** Find the biggest number in the array.
 * **You get:** `array` (an array of numbers).
 * **How:** Empty array → return `null`. Otherwise start with `let max = array[0]`,
 *   loop over the rest, and replace `max` whenever you find something bigger.
 * **Returns:** A number, or `null`.
 *
 * **Test it:** `make arrays-task-03`
 *
 * @example findMax([3, 9, 2]) // → 9
 * @example findMax([]) // → null
 */
export function findMax(array) {
  // TODO: write your code here
  return null;
}

/**
 * Task 4 — How often is it there?
 *
 * **Your job:** Count how often `value` appears in the array.
 * **You get:** `array` and `value`.
 * **How:** Loop over the array. If `array[i] === value`, add 1 to a counter.
 * **Returns:** A whole number (0 or more).
 *
 * **Test it:** `make arrays-task-04`
 *
 * @example countOccurrences([1, 2, 2, 3], 2) // → 2
 */
export function countOccurrences(array, value) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 5 — Double every number
 *
 * **Your job:** Make a new array where every number is doubled. Do not change the old array.
 * **You get:** `array` (an array of numbers).
 * **How:** Start with `const result = []`. Loop over `array` and `result.push(array[i] * 2)`.
 * **Returns:** A new array with the same length.
 *
 * **Test it:** `make arrays-task-05`
 *
 * @example doubleAll([1, 2, 3]) // → [2, 4, 6]
 */
export function doubleAll(array) {
  // TODO: write your code here
  return [];
}

/**
 * Task 6 — First item or null
 *
 * **Your job:** Return the first item of the array.
 * **You get:** `array` (any array).
 * **How:** If the array is empty, return `null`. Otherwise return `array[0]`.
 * **Returns:** An item, or `null`.
 *
 * **Test it:** `make arrays-task-06`
 *
 * @example firstOrNull([7, 8]) // → 7
 * @example firstOrNull([]) // → null
 */
export function firstOrNull(array) {
  // TODO: write your code here
  return null;
}

/**
 * Task 7 — Last item or null
 *
 * **Your job:** Return the last item of the array.
 * **You get:** `array` (any array).
 * **How:** If the array is empty, return `null`. Otherwise return `array[array.length - 1]`.
 * **Returns:** An item, or `null`.
 *
 * **Test it:** `make arrays-task-07`
 *
 * @example lastOrNull([7, 8]) // → 8
 */
export function lastOrNull(array) {
  // TODO: write your code here
  return null;
}

/**
 * Task 8 — Range 1 … n
 *
 * **Your job:** Make an array with all numbers from 1 to `n`.
 * **You get:** `n` (a number, 0 or more).
 * **How:** Start with `const result = []`. Loop `i` from 1 to `n` and `result.push(i)`.
 * **Returns:** An array of numbers (`[]` when `n` is 0).
 *
 * **Test it:** `make arrays-task-08`
 *
 * @example range(4) // → [1, 2, 3, 4]
 * @example range(0) // → []
 */
export function range(n) {
  // TODO: write your code here
  return [];
}

/**
 * Task 9 — Join two arrays
 *
 * **Your job:** Make a new array with all items of `a`, then all items of `b`. Do not change `a` or `b`.
 * **You get:** `a` and `b` (two arrays).
 * **How:** Use the spread operator: `[...a, ...b]`. The `...` tips all items out of an array.
 * **Returns:** A new array.
 *
 * **Test it:** `make arrays-task-09`
 *
 * @example mergeArrays([1, 2], [3, 4]) // → [1, 2, 3, 4]
 */
export function mergeArrays(a, b) {
  // TODO: write your code here
  return [];
}

/**
 * Task 10 — Reversed copy
 *
 * **Your job:** Make a new array with the items in the opposite order. Do not change the old array.
 * **You get:** `array` (any array).
 * **How:** Loop backwards (from `array.length - 1` down to 0) and `push` each item into a new array.
 * **Returns:** A new array.
 *
 * **Test it:** `make arrays-task-10`
 *
 * @example reversedCopy([1, 2, 3]) // → [3, 2, 1]
 */
export function reversedCopy(array) {
  // TODO: write your code here
  return [];
}

/**
 * Task 11 — Is there an even number?
 *
 * **Your job:** Check if at least one number in the array is even.
 * **You get:** `array` (an array of numbers).
 * **How:** Loop over the array. As soon as `array[i] % 2 === 0`, return `true`.
 *   If the loop ends without finding one, return `false`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make arrays-task-11`
 *
 * @example hasEven([1, 3, 4]) // → true
 * @example hasEven([1, 3, 5]) // → false
 */
export function hasEven(array) {
  // TODO: write your code here
  return false;
}
