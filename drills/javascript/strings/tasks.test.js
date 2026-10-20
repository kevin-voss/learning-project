import { describe, expect, test } from "bun:test";
import {
  characterCount,
  containsText,
  dashInsteadOfSpaces,
  endsWithText,
  firstThreeChars,
  isPalindromeText,
  startsWithText,
  toLowerCaseCopy,
  toUpperCaseCopy,
  trimWhitespace,
} from "./tasks.js";

// Hilfsfunktion, um bei Fehlern einen Tipp anzuzeigen
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\n💡 TIPP: ${hint}\n\n${e.message}`);
  }
}

describe("strings-task-01: containsText", () => {
  test("enthält Text", () => {
    check(containsText, ["hallo", "ll"], true, "Nutze die Methode .includes(fragment) auf dem String.");
    check(containsText, ["hallo", "x"], false, "Nutze die Methode .includes(fragment) auf dem String.");
  });
});

describe("strings-task-02: startsWithText", () => {
  test("beginnt mit", () => {
    check(startsWithText, ["Hallo", "Hal"], true, "Nutze die Methode .startsWith(prefix) auf dem String.");
    check(startsWithText, ["Hallo", "all"], false, "Nutze die Methode .startsWith(prefix) auf dem String.");
  });
});

describe("strings-task-03: endsWithText", () => {
  test("endet mit", () => {
    check(endsWithText, ["Hallo", "llo"], true, "Nutze die Methode .endsWith(suffix) auf dem String.");
    check(endsWithText, ["Hallo", "Hal"], false, "Nutze die Methode .endsWith(suffix) auf dem String.");
  });
});

describe("strings-task-04: toLowerCaseCopy", () => {
  test("Kleinschreibung", () => {
    check(toLowerCaseCopy, ["Hi"], "hi", "Nutze die Methode .toLowerCase() auf dem String.");
  });
});

describe("strings-task-05: toUpperCaseCopy", () => {
  test("Großschreibung", () => {
    check(toUpperCaseCopy, ["hi"], "HI", "Nutze die Methode .toUpperCase() auf dem String.");
  });
});

describe("strings-task-06: trimWhitespace", () => {
  test("Leerzeichen abschneiden", () => {
    check(trimWhitespace, ["  a  "], "a", "Nutze die Methode .trim() auf dem String.");
  });
});

describe("strings-task-07: dashInsteadOfSpaces", () => {
  test("Bindestrich statt Leerzeichen", () => {
    check(dashInsteadOfSpaces, ["a b c"], "a-b-c", "Nutze die Methode .replaceAll(' ', '-') auf dem String.");
  });
});

describe("strings-task-08: characterCount", () => {
  test("Zeichen zählen", () => {
    check(characterCount, ["abc"], 3, "Frage die Eigenschaft .length des Strings ab.");
  });
});

describe("strings-task-09: firstThreeChars", () => {
  test("erste drei Zeichen", () => {
    check(firstThreeChars, ["abcdef"], "abc", "Nutze die Methode .slice(0, 3) auf dem String.");
    check(firstThreeChars, ["ab"], "ab", "Wenn der Text kürzer als 3 Zeichen ist, wird der ganze Text zurückgegeben.");
  });
});

describe("strings-task-10: isPalindromeText", () => {
  test("Palindrom", () => {
    check(isPalindromeText, ["anna"], true, "Wandle den String in ein Array um (.split('')), drehe das Array um (.reverse()), füge es wieder zu einem String zusammen (.join('')) und vergleiche es mit dem Originaltext.");
    check(isPalindromeText, ["hallo"], false, "Wandle den String in ein Array um (.split('')), drehe das Array um (.reverse()), füge es wieder zu einem String zusammen (.join('')) und vergleiche es mit dem Originaltext.");
  });
});
