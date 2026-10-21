import { describe, expect, test } from "bun:test";
import {
  celsiusToFahrenheit,
  concatWithSpace,
  incrementValue,
  lengthOfText,
  minutesToSeconds,
  numberToText,
  rectangleArea,
  remainderDivision,
  templateWelcome,
  textToNumber,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("variables-task-01: rectangleArea", () => {
  test("multiplies width and height", () => {
    check(rectangleArea, [4, 5], 20, "Multiply width and height with the '*' operator.");
    check(rectangleArea, [2, 3], 6, "Multiply width and height with the '*' operator.");
  });
});

describe("variables-task-02: celsiusToFahrenheit", () => {
  test("0 °C is 32 °F", () => {
    check(celsiusToFahrenheit, [0], 32, "The formula is c * 9 / 5 + 32. Do not forget to return the result.");
  });
  test("100 °C is 212 °F", () => {
    check(celsiusToFahrenheit, [100], 212, "The formula is c * 9 / 5 + 32. Do not forget to return the result.");
  });
});

describe("variables-task-03: minutesToSeconds", () => {
  test("1 minute is 60 seconds", () => {
    check(minutesToSeconds, [1], 60, "Multiply the minutes by 60.");
  });
  test("5 minutes", () => {
    check(minutesToSeconds, [5], 300, "Multiply the minutes by 60.");
  });
});

describe("variables-task-04: concatWithSpace", () => {
  test("two words with a space", () => {
    check(concatWithSpace, ["Hello", "World"], "Hello World", "Use '+', for example wordA + ' ' + wordB, or a template string: `${wordA} ${wordB}`.");
  });
});

describe("variables-task-05: templateWelcome", () => {
  test("welcome text", () => {
    check(templateWelcome, ["Alex"], "Welcome, Alex!", "Use backticks (`) and put the name in with ${name}. Mind the comma and the exclamation mark!");
  });
});

describe("variables-task-06: lengthOfText", () => {
  test("counts characters", () => {
    check(lengthOfText, ["abc"], 3, "Every string has a '.length' property with the number of characters, for example text.length.");
  });
  test("empty string", () => {
    check(lengthOfText, [""], 0, "Every string has a '.length' property with the number of characters, for example text.length.");
  });
});

describe("variables-task-07: numberToText", () => {
  test("number becomes string", () => {
    check(numberToText, [7], "7", "Use String(n) or n.toString() to turn a number into text.");
  });
});

describe("variables-task-08: textToNumber", () => {
  test("string becomes number", () => {
    check(textToNumber, ["42"], 42, "Use Number(text) to turn text into a number.");
  });
});

describe("variables-task-09: remainderDivision", () => {
  test("remainder of a division", () => {
    check(remainderDivision, [10, 3], 1, "Use the remainder operator '%', for example a % b.");
  });
});

describe("variables-task-10: incrementValue", () => {
  test("one bigger", () => {
    check(incrementValue, [4], 5, "Add 1 to n (n + 1) and return the result.");
  });
});
