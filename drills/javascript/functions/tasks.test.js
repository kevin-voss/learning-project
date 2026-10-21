import { describe, expect, test } from "bun:test";
import {
  cubeNumber,
  firstCharCodeAt,
  formatEuro,
  greetOrDefault,
  hypotenuseNumber,
  joinParts,
  longerThan,
  middleValue,
  safeDivideNums,
  squareNumber,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("functions-task-01: squareNumber", () => {
  test("square", () => {
    check(squareNumber, [4], 16, "Multiply x by itself: x * x.");
  });
});

describe("functions-task-02: cubeNumber", () => {
  test("cube", () => {
    check(cubeNumber, [3], 27, "x * x * x, or x ** 3.");
  });
});

describe("functions-task-03: hypotenuseNumber", () => {
  test("long side", () => {
    check(hypotenuseNumber, [3, 4], 5, "Use Math.sqrt(a * a + b * b).");
  });
});

describe("functions-task-04: greetOrDefault", () => {
  const hint = "If name === undefined, return 'Hello, world!'. Otherwise return `Hello, ${name}!`.";
  test("with a name", () => {
    check(greetOrDefault, ["Alex"], "Hello, Alex!", hint);
  });
  test("without a name", () => {
    check(greetOrDefault, [], "Hello, world!", hint);
  });
});

describe("functions-task-05: formatEuro", () => {
  test("euro format", () => {
    const hint = "amount.toFixed(2) gives '12.50'. Then add a space and the euro sign.";
    check(formatEuro, [12.5], "12.50 €", hint);
    check(formatEuro, [3], "3.00 €", hint);
  });
});

describe("functions-task-06: longerThan", () => {
  test("longer than n?", () => {
    const hint = "Return text.length > n.";
    check(longerThan, ["abc", 2], true, hint);
    check(longerThan, ["ab", 2], false, hint);
  });
});

describe("functions-task-07: safeDivideNums", () => {
  test("safe division", () => {
    const hint = "If b === 0, return null. Otherwise return a / b.";
    check(safeDivideNums, [10, 2], 5, hint);
    check(safeDivideNums, [10, 0], null, hint);
  });
});

describe("functions-task-08: firstCharCodeAt", () => {
  test("code of the first letter", () => {
    check(firstCharCodeAt, ["A"], 65, "Use text.charCodeAt(0).");
  });
});

describe("functions-task-09: joinParts", () => {
  test("glue two parts", () => {
    check(joinParts, ["foo", "bar"], "foobar", "Use '+': a + b.");
  });
});

describe("functions-task-10: middleValue", () => {
  test("middle of three", () => {
    const hint = "a + b + c, minus Math.max(a, b, c), minus Math.min(a, b, c).";
    check(middleValue, [1, 9, 5], 5, hint);
    check(middleValue, [10, 2, 8], 8, hint);
  });
});
