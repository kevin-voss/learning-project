import { describe, expect, test } from "bun:test";
import {
  capitalizeWord,
  containsText,
  dashInsteadOfSpaces,
  endsWithText,
  firstThreeChars,
  lastCharacter,
  startsWithText,
  toLowerCaseCopy,
  toUpperCaseCopy,
  trimWhitespace,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("strings-task-01: containsText", () => {
  test("contains a piece", () => {
    check(containsText, ["hello", "ll"], true, "Use text.includes(fragment).");
    check(containsText, ["hello", "x"], false, "Use text.includes(fragment).");
  });
});

describe("strings-task-02: startsWithText", () => {
  test("starts with", () => {
    check(startsWithText, ["Hello", "Hel"], true, "Use text.startsWith(prefix).");
    check(startsWithText, ["Hello", "ell"], false, "Use text.startsWith(prefix).");
  });
});

describe("strings-task-03: endsWithText", () => {
  test("ends with", () => {
    check(endsWithText, ["Hello", "llo"], true, "Use text.endsWith(suffix).");
    check(endsWithText, ["Hello", "Hel"], false, "Use text.endsWith(suffix).");
  });
});

describe("strings-task-04: toLowerCaseCopy", () => {
  test("small letters", () => {
    check(toLowerCaseCopy, ["Hi"], "hi", "Use text.toLowerCase().");
  });
});

describe("strings-task-05: toUpperCaseCopy", () => {
  test("capital letters", () => {
    check(toUpperCaseCopy, ["hi"], "HI", "Use text.toUpperCase().");
  });
});

describe("strings-task-06: trimWhitespace", () => {
  test("cuts off spaces", () => {
    check(trimWhitespace, ["  a  "], "a", "Use text.trim().");
  });
});

describe("strings-task-07: dashInsteadOfSpaces", () => {
  test("dashes instead of spaces", () => {
    check(dashInsteadOfSpaces, ["a b c"], "a-b-c", "Use text.replaceAll(' ', '-').");
  });
});

describe("strings-task-08: lastCharacter", () => {
  test("last letter", () => {
    const hint = "Letters are numbered from 0. The last one is text[text.length - 1].";
    check(lastCharacter, ["hello"], "o", hint);
    check(lastCharacter, ["a"], "a", hint);
  });
});

describe("strings-task-09: firstThreeChars", () => {
  test("first three characters", () => {
    check(firstThreeChars, ["abcdef"], "abc", "Use text.slice(0, 3).");
    check(firstThreeChars, ["ab"], "ab", "If the text is shorter than 3, slice gives you the whole text.");
  });
});

describe("strings-task-10: capitalizeWord", () => {
  test("capital first letter", () => {
    const hint = "word[0].toUpperCase() gives the big first letter. word.slice(1) gives the rest. Glue them with +.";
    check(capitalizeWord, ["anna"], "Anna", hint);
    check(capitalizeWord, ["hello"], "Hello", hint);
  });
});
