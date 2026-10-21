/**
 * JavaScript drill: loops (read README.md first)
 * Run the tests from the project folder: make loops | make loops-task-03
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Sum from 1 to n
 *
 * **Your job:** Add up all numbers from 1 to `n`.
 * **You get:** `n` (a number, 0 or more).
 * **How:** Start with `let sum = 0`. Loop `i` from 1 to `n` and add `i` to `sum` each lap.
 *   For `n === 0` the loop never runs, so the answer is `0`.
 * **Returns:** A whole number.
 *
 * **Test it:** `make loops-task-01`
 *
 * @example sumFromOneToN(4) // → 10   (1 + 2 + 3 + 4)
 * @example sumFromOneToN(0) // → 0
 */
export function sumFromOneToN(n) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 2 — Repeat a character
 *
 * **Your job:** Build a string that has `ch` in it `count` times.
 * **You get:** `ch` (one character) and `count` (a number).
 * **How:** Start with `let result = ""`. Loop `count` times and add `ch` to `result` each lap.
 * **Returns:** A string (`""` when `count` is 0).
 *
 * **Test it:** `make loops-task-02`
 *
 * @example repeatCharacter("a", 3) // → "aaa"
 */
export function repeatCharacter(ch, count) {
  // TODO: write your code here
  return "";
}

/**
 * Task 3 — Count a letter
 *
 * **Your job:** Count how often `ch` appears in `str`.
 * **You get:** `str` (a text) and `ch` (one character).
 * **How:** Loop `i` from 0 to `str.length - 1`. If `str[i] === ch`, add 1 to a counter.
 * **Returns:** A whole number (0 or more).
 *
 * **Test it:** `make loops-task-03`
 *
 * @example countInString("banana", "a") // → 3
 */
export function countInString(str, ch) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 4 — Multiply from 1 to n (factorial)
 *
 * **Your job:** Multiply all numbers from 1 to `n`. Mathematicians call this "n factorial" and write `n!`.
 * **You get:** `n` (a number, 0 or more).
 * **How:** Start with `let product = 1` (not 0!). Loop `i` from 1 to `n` and multiply `product` by `i`.
 *   For `n === 0` the loop never runs, so the answer is `1`.
 * **Returns:** A whole number.
 *
 * **Test it:** `make loops-task-04`
 *
 * @example productFromOneToN(4) // → 24   (1 * 2 * 3 * 4)
 * @example productFromOneToN(0) // → 1
 */
export function productFromOneToN(n) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 5 — Turn a string around
 *
 * **Your job:** Write a text backwards.
 * **You get:** `str` (a string).
 * **How:** Loop backwards: start `i` at `str.length - 1`, go down to 0 with `i--`.
 *   Add `str[i]` to a new string each lap.
 * **Returns:** A string.
 *
 * **Test it:** `make loops-task-05`
 *
 * @example reverseStringFor("abc") // → "cba"
 */
export function reverseStringFor(str) {
  // TODO: write your code here
  return "";
}

/**
 * Task 6 — A row of stars
 *
 * **Your job:** Build a string of `n` stars (`*`).
 * **You get:** `n` (a number, 0 or more).
 * **How:** Loop `n` times and add `"*"` to a string each lap.
 * **Returns:** A string (`""` when `n` is 0).
 *
 * **Test it:** `make loops-task-06`
 *
 * @example stringOfStars(3) // → "***"
 */
export function stringOfStars(n) {
  // TODO: write your code here
  return "";
}

/**
 * Task 7 — Palindrome
 *
 * **Your job:** Check if a word reads the same forwards and backwards, like "anna" or "level".
 * **You get:** `text` (small letters, no spaces).
 * **How:** Build the backwards text with a loop (like Task 5), then compare it with `text` using `===`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make loops-task-07`
 *
 * @example isPalindromeText("anna") // → true
 * @example isPalindromeText("hello") // → false
 */
export function isPalindromeText(text) {
  // TODO: write your code here
  return false;
}

/**
 * Task 8 — Sum of the even numbers
 *
 * **Your job:** Add up only the even numbers from 1 to `n`.
 * **You get:** `n` (a number, 0 or more).
 * **How:** Loop `i` from 1 to `n`. If `i % 2 === 0`, add `i` to the sum.
 * **Returns:** A whole number.
 *
 * **Test it:** `make loops-task-08`
 *
 * @example sumOfEvensUpToN(6) // → 12   (2 + 4 + 6)
 * @example sumOfEvensUpToN(7) // → 12
 */
export function sumOfEvensUpToN(n) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 9 — Where is the letter?
 *
 * **Your job:** Find the position of the first `ch` in `str`.
 * **You get:** `str` (a text) and `ch` (one character).
 * **How:** Loop over the positions. As soon as `str[i] === ch`, `return i` (this stops the loop).
 *   If the loop ends without finding it, return `-1`.
 * **Returns:** A whole number, or `-1` when `ch` is not in `str`.
 *
 * **Test it:** `make loops-task-09`
 *
 * @example firstIndexOfChar("hello", "l") // → 2
 * @example firstIndexOfChar("hello", "z") // → -1
 */
export function firstIndexOfChar(str, ch) {
  // TODO: write your code here
  return -1;
}

/**
 * Task 10 — Count the digits (while loop)
 *
 * **Your job:** Count how many digits a whole number has.
 * **You get:** `n` (a whole number, 0 or more).
 * **How:** Use a `while` loop. Start with `let digits = 1` and `let rest = n`.
 *   While `rest >= 10`: chop off the last digit with `rest = Math.floor(rest / 10)` and add 1 to `digits`.
 * **Returns:** A whole number (1 or more).
 *
 * **Test it:** `make loops-task-10`
 *
 * @example countDigits(1234) // → 4
 * @example countDigits(7) // → 1
 */
export function countDigits(n) {
  // TODO: write your code here
  return 0;
}
