import { describe, expect, test } from "bun:test";
import {
  countDigits,
  countInString,
  firstIndexOfChar,
  isPalindromeText,
  productFromOneToN,
  repeatCharacter,
  reverseStringFor,
  stringOfStars,
  sumFromOneToN,
  sumOfEvensUpToN,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("loops-task-01: sumFromOneToN", () => {
  test("sum from 1 to n", () => {
    check(sumFromOneToN, [4], 10, "Loop i from 1 to n (i <= n) and add i to a sum variable each lap.");
    check(sumFromOneToN, [0], 0, "For n === 0 the answer is 0. Did you start with let sum = 0?");
  });
});

describe("loops-task-02: repeatCharacter", () => {
  test("repeat a character", () => {
    check(repeatCharacter, ["a", 3], "aaa", "Loop count times and add ch to a string variable each lap.");
    check(repeatCharacter, ["x", 0], "", "For count === 0 the answer is an empty string.");
  });
});

describe("loops-task-03: countInString", () => {
  test("count a letter", () => {
    check(countInString, ["banana", "a"], 3, "Loop over every position (i < str.length). If str[i] === ch, add 1 to a counter.");
    check(countInString, ["hello", "z"], 0, "When the letter is not there, the answer is 0.");
  });
});

describe("loops-task-04: productFromOneToN", () => {
  test("multiply from 1 to n", () => {
    check(productFromOneToN, [4], 24, "Start with let product = 1. Loop i from 1 to n and multiply product by i.");
    check(productFromOneToN, [5], 120, "Start with let product = 1. Loop i from 1 to n and multiply product by i.");
    check(productFromOneToN, [0], 1, "For n === 0 the answer is 1. Did you start with 1 instead of 0?");
  });
});

describe("loops-task-05: reverseStringFor", () => {
  test("turn a string around", () => {
    check(reverseStringFor, ["abc"], "cba", "Loop backwards from str.length - 1 down to 0 (i--) and add str[i] to a new string.");
    check(reverseStringFor, [""], "", "An empty string stays empty.");
  });
});

describe("loops-task-06: stringOfStars", () => {
  test("a row of stars", () => {
    check(stringOfStars, [3], "***", "Loop n times and add '*' to a string each lap.");
    check(stringOfStars, [0], "", "For n === 0 the answer is an empty string.");
  });
});

describe("loops-task-07: isPalindromeText", () => {
  test("palindrome", () => {
    const hint = "Build the backwards text with a loop (like task 5), then compare: backwards === text.";
    check(isPalindromeText, ["anna"], true, hint);
    check(isPalindromeText, ["level"], true, hint);
    check(isPalindromeText, ["hello"], false, hint);
  });
});

describe("loops-task-08: sumOfEvensUpToN", () => {
  test("sum of the even numbers", () => {
    const hint = "Loop i from 1 to n. Only when i % 2 === 0, add i to the sum.";
    check(sumOfEvensUpToN, [6], 12, hint);
    check(sumOfEvensUpToN, [7], 12, hint);
    check(sumOfEvensUpToN, [0], 0, hint);
  });
});

describe("loops-task-09: firstIndexOfChar", () => {
  test("where is the letter", () => {
    check(firstIndexOfChar, ["hello", "l"], 2, "Loop over the positions. As soon as str[i] === ch, return i.");
    check(firstIndexOfChar, ["hello", "h"], 0, "Positions start at 0.");
    check(firstIndexOfChar, ["hello", "z"], -1, "After the loop, return -1: the letter was not found.");
  });
});

describe("loops-task-10: countDigits", () => {
  test("count the digits", () => {
    const hint = "let digits = 1; let rest = n; while (rest >= 10) { rest = Math.floor(rest / 10); digits = digits + 1; }";
    check(countDigits, [1234], 4, hint);
    check(countDigits, [7], 1, hint);
    check(countDigits, [0], 1, hint);
    check(countDigits, [10], 2, hint);
  });
});
