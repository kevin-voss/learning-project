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

// Hilfsfunktion, um bei Fehlern einen Tipp anzuzeigen
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\n💡 TIPP: ${hint}\n\n${e.message}`);
  }
}

describe("conditionals-task-01: signOf", () => {
  test("Vorzeichen", () => {
    check(signOf, [-3], -1, "Nutze if/else if, um zu prüfen, ob n negativ, null oder positiv ist. Gib -1 für negativ, 0 für null und 1 für positiv zurück.");
    check(signOf, [0], 0, "Nutze if/else if, um zu prüfen, ob n negativ, null oder positiv ist. Gib -1 für negativ, 0 für null und 1 für positiv zurück.");
    check(signOf, [5], 1, "Nutze if/else if, um zu prüfen, ob n negativ, null oder positiv ist. Gib -1 für negativ, 0 für null und 1 für positiv zurück.");
  });
});

describe("conditionals-task-02: maxOfTwo", () => {
  test("Maximum ohne Math.max", () => {
    check(maxOfTwo, [2, 9], 9, "Vergleiche a und b mit if (a > b). Gib die größere Zahl zurück.");
    check(maxOfTwo, [10, 5], 10, "Vergleiche a und b mit if (a > b). Gib die größere Zahl zurück.");
  });
});

describe("conditionals-task-03: isPassing", () => {
  test("Bestanden?", () => {
    check(isPassing, [50], true, "Ab score >= 50 ist es bestanden (true), sonst false. Du kannst direkt score >= 50 zurückgeben oder ein if/else verwenden.");
    check(isPassing, [49], false, "Ab score >= 50 ist es bestanden (true), sonst false. Du kannst direkt score >= 50 zurückgeben oder ein if/else verwenden.");
  });
});

describe("conditionals-task-04: temperatureFeel", () => {
  test("Temperaturgefühl", () => {
    check(temperatureFeel, [5], "kalt", "Nutze if/else if/else: < 10 -> 'kalt'; < 22 -> 'angenehm'; sonst 'warm'.");
    check(temperatureFeel, [15], "angenehm", "Nutze if/else if/else: < 10 -> 'kalt'; < 22 -> 'angenehm'; sonst 'warm'.");
    check(temperatureFeel, [25], "warm", "Nutze if/else if/else: < 10 -> 'kalt'; < 22 -> 'angenehm'; sonst 'warm'.");
  });
});

describe("conditionals-task-05: ticketPrice", () => {
  test("Ticketpreis", () => {
    check(ticketPrice, [5], 0, "Alter < 6 -> 0 Euro; < 18 -> 8 Euro; sonst -> 15 Euro.");
    check(ticketPrice, [10], 8, "Alter < 6 -> 0 Euro; < 18 -> 8 Euro; sonst -> 15 Euro.");
    check(ticketPrice, [20], 15, "Alter < 6 -> 0 Euro; < 18 -> 8 Euro; sonst -> 15 Euro.");
  });
});

describe("conditionals-task-06: isLeapYear", () => {
  test("Schaltjahr", () => {
    check(isLeapYear, [2024], true, "Ein Jahr ist ein Schaltjahr, wenn es durch 400 teilbar ist. Wenn nicht, aber es ist durch 100 teilbar, ist es KEIN Schaltjahr. Wenn nicht, aber es ist durch 4 teilbar, ist es ein Schaltjahr. Sonst nicht.");
    check(isLeapYear, [1900], false, "Ein Jahr ist ein Schaltjahr, wenn es durch 400 teilbar ist. Wenn nicht, aber es ist durch 100 teilbar, ist es KEIN Schaltjahr. Wenn nicht, aber es ist durch 4 teilbar, ist es ein Schaltjahr. Sonst nicht.");
    check(isLeapYear, [2000], false, "Ein Jahr ist ein Schaltjahr, wenn es durch 400 teilbar ist. Wenn nicht, aber es ist durch 100 teilbar, ist es KEIN Schaltjahr. Wenn nicht, aber es ist durch 4 teilbar, ist es ein Schaltjahr. Sonst nicht.");
    check(isLeapYear, [2400], true, "Ein Jahr ist ein Schaltjahr, wenn es durch 400 teilbar ist. Wenn nicht, aber es ist durch 100 teilbar, ist es KEIN Schaltjahr. Wenn nicht, aber es ist durch 4 teilbar, ist es ein Schaltjahr. Sonst nicht.");
  });
});

describe("conditionals-task-07: absoluteNoMath", () => {
  test("Betrag ohne Math.abs", () => {
    check(absoluteNoMath, [-4], 4, "Wenn n < 0 ist, gib -n zurück. Sonst gib n zurück.");
    check(absoluteNoMath, [4], 4, "Wenn n < 0 ist, gib -n zurück. Sonst gib n zurück.");
  });
});

describe("conditionals-task-08: minOfTwo", () => {
  test("Minimum ohne Math.min", () => {
    check(minOfTwo, [3, 1], 1, "Vergleiche a und b mit if (a < b). Gib die kleinere Zahl zurück.");
    check(minOfTwo, [1, 3], 1, "Vergleiche a und b mit if (a < b). Gib die kleinere Zahl zurück.");
  });
});

describe("conditionals-task-09: exactlyOneTrue", () => {
  test("Genau eine wahr", () => {
    check(exactlyOneTrue, [true, false], true, "Gib true zurück, wenn a und b unterschiedlich sind (a !== b).");
    check(exactlyOneTrue, [false, true], true, "Gib true zurück, wenn a und b unterschiedlich sind (a !== b).");
    check(exactlyOneTrue, [true, true], false, "Gib true zurück, wenn a und b unterschiedlich sind (a !== b).");
    check(exactlyOneTrue, [false, false], false, "Gib true zurück, wenn a und b unterschiedlich sind (a !== b).");
  });
});

describe("conditionals-task-10: gradeLetter", () => {
  test("Notenbuchstabe", () => {
    check(gradeLetter, [95], "A", ">= 90 -> 'A', >= 80 -> 'B', >= 70 -> 'C', sonst 'D'. Nutze if/else if/else.");
    check(gradeLetter, [85], "B", ">= 90 -> 'A', >= 80 -> 'B', >= 70 -> 'C', sonst 'D'. Nutze if/else if/else.");
    check(gradeLetter, [75], "C", ">= 90 -> 'A', >= 80 -> 'B', >= 70 -> 'C', sonst 'D'. Nutze if/else if/else.");
    check(gradeLetter, [65], "D", ">= 90 -> 'A', >= 80 -> 'B', >= 70 -> 'C', sonst 'D'. Nutze if/else if/else.");
  });
});
