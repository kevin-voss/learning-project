import { describe, expect, test } from "bun:test";
import {
  absoluteNoMath,
  exactlyOneTrue,
  gradeLetter,
  isLeapYear,
  isPassing,
  maxOfTwo,
  minOfTwo,
  signOf,
  temperatureFeel,
  ticketPrice,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("conditionals-task-01: signOf", () => {
  test("sign", () => {
    const hint = "Use if / else if to check below zero, zero, above zero. Return -1, 0 or 1.";
    check(signOf, [-3], -1, hint);
    check(signOf, [0], 0, hint);
    check(signOf, [5], 1, hint);
  });
});

describe("conditionals-task-02: maxOfTwo", () => {
  test("bigger of two without Math.max", () => {
    const hint = "Compare with if (a > b). Return the bigger number.";
    check(maxOfTwo, [2, 9], 9, hint);
    check(maxOfTwo, [10, 5], 10, hint);
  });
});

describe("conditionals-task-03: isPassing", () => {
  test("passed?", () => {
    const hint = "50 or more passes (true), else false. You can return score >= 50 directly.";
    check(isPassing, [50], true, hint);
    check(isPassing, [49], false, hint);
  });
});

describe("conditionals-task-04: temperatureFeel", () => {
  test("how it feels", () => {
    const hint = "Use if / else if / else: below 10 -> 'cold'; below 22 -> 'nice'; otherwise 'warm'.";
    check(temperatureFeel, [5], "cold", hint);
    check(temperatureFeel, [15], "nice", hint);
    check(temperatureFeel, [25], "warm", hint);
  });
});

describe("conditionals-task-05: ticketPrice", () => {
  test("ticket price", () => {
    const hint = "Younger than 6 -> 0; younger than 18 -> 8; otherwise 15.";
    check(ticketPrice, [5], 0, hint);
    check(ticketPrice, [10], 8, hint);
    check(ticketPrice, [20], 15, hint);
  });
});

describe("conditionals-task-06: isLeapYear", () => {
  test("leap year", () => {
    const hint = "Check in order: % 400 === 0 -> true; % 100 === 0 -> false; % 4 === 0 -> true; otherwise false.";
    check(isLeapYear, [2024], true, hint);
    check(isLeapYear, [2023], false, hint);
    check(isLeapYear, [1900], false, hint);
    check(isLeapYear, [2000], true, hint);
    check(isLeapYear, [2400], true, hint);
  });
});

describe("conditionals-task-07: absoluteNoMath", () => {
  test("distance from zero without Math.abs", () => {
    const hint = "If n < 0, return -n. Otherwise return n.";
    check(absoluteNoMath, [-4], 4, hint);
    check(absoluteNoMath, [4], 4, hint);
  });
});

describe("conditionals-task-08: minOfTwo", () => {
  test("smaller of two without Math.min", () => {
    const hint = "Compare with if (a < b). Return the smaller number.";
    check(minOfTwo, [3, 1], 1, hint);
    check(minOfTwo, [1, 3], 1, hint);
  });
});

describe("conditionals-task-09: exactlyOneTrue", () => {
  test("exactly one is true", () => {
    const hint = "Return true when a and b are different (a !== b).";
    check(exactlyOneTrue, [true, false], true, hint);
    check(exactlyOneTrue, [false, true], true, hint);
    check(exactlyOneTrue, [true, true], false, hint);
    check(exactlyOneTrue, [false, false], false, hint);
  });
});

describe("conditionals-task-10: gradeLetter", () => {
  test("grade letter", () => {
    const hint = "90 or more -> 'A', 80 or more -> 'B', 70 or more -> 'C', otherwise 'D'. Check the biggest first.";
    check(gradeLetter, [95], "A", hint);
    check(gradeLetter, [85], "B", hint);
    check(gradeLetter, [75], "C", hint);
    check(gradeLetter, [65], "D", hint);
  });
});
