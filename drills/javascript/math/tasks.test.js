import { describe, expect, test } from "bun:test";
import {
  absoluteValue,
  averageOfThree,
  ceilValue,
  clampValue,
  floorValue,
  maximumTwo,
  minimumThree,
  percentage,
  powerValue,
  roundTwoDecimals,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("math-task-01: floorValue", () => {
  test("rounds down", () => {
    check(floorValue, [9.9], 9, "Use Math.floor(x) to round down.");
  });
});

describe("math-task-02: ceilValue", () => {
  test("rounds up", () => {
    check(ceilValue, [2.1], 3, "Use Math.ceil(x) to round up.");
  });
});

describe("math-task-03: absoluteValue", () => {
  test("drops the minus sign", () => {
    check(absoluteValue, [-5], 5, "Use Math.abs(x) to get the absolute value.");
  });
});

describe("math-task-04: powerValue", () => {
  test("power", () => {
    check(powerValue, [2, 4], 16, "Use the power operator '**' (base ** exp) or Math.pow(base, exp).");
  });
});

describe("math-task-05: maximumTwo", () => {
  test("bigger of two", () => {
    check(maximumTwo, [3, 7], 7, "Use Math.max(a, b) to find the bigger number.");
  });
});

describe("math-task-06: minimumThree", () => {
  test("smallest of three", () => {
    check(minimumThree, [4, 2, 9], 2, "Use Math.min(a, b, c) to find the smallest number.");
  });
});

describe("math-task-07: clampValue", () => {
  test("keeps the value inside the range", () => {
    const hint = "First Math.max(value, min), then Math.min(thatResult, max). You can write it in one line: Math.min(Math.max(value, min), max).";
    check(clampValue, [5, 0, 10], 5, hint);
    check(clampValue, [-1, 0, 10], 0, hint);
    check(clampValue, [99, 0, 10], 10, hint);
  });
});

describe("math-task-08: averageOfThree", () => {
  test("average", () => {
    const hint = "Add the three numbers and divide by 3. Use brackets: (a + b + c) / 3.";
    check(averageOfThree, [1, 2, 3], 2, hint);
    check(averageOfThree, [2, 4, 9], 5, hint);
  });
});

describe("math-task-09: roundTwoDecimals", () => {
  test("two decimal places", () => {
    check(roundTwoDecimals, [3.146], 3.15, "Multiply by 100, round with Math.round(), then divide by 100 again.");
  });
});

describe("math-task-10: percentage", () => {
  test("percent", () => {
    check(percentage, [25, 200], 12.5, "Divide the part by the whole and multiply the result by 100.");
  });
});
