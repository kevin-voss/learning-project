import { describe, expect, test } from "bun:test";
import {
  absoluteValue,
  ceilValue,
  clampValue,
  factorialMath,
  floorValue,
  maximumTwo,
  minimumThree,
  percentage,
  powerValue,
  roundTwoDecimals,
} from "./tasks.js";

// Hilfsfunktion, um bei Fehlern einen Tipp anzuzeigen
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\n💡 TIPP: ${hint}\n\n${e.message}`);
  }
}

describe("math-task-01: floorValue", () => {
  test("abrunden", () => {
    check(floorValue, [9.9], 9, "Nutze die Funktion Math.floor(x), um die Zahl abzurunden.");
  });
});

describe("math-task-02: ceilValue", () => {
  test("aufrunden", () => {
    check(ceilValue, [2.1], 3, "Nutze die Funktion Math.ceil(x), um die Zahl aufzurunden.");
  });
});

describe("math-task-03: absoluteValue", () => {
  test("Betrag", () => {
    check(absoluteValue, [-5], 5, "Nutze die Funktion Math.abs(x), um den absoluten Betrag zu berechnen.");
  });
});

describe("math-task-04: powerValue", () => {
  test("Potenz", () => {
    check(powerValue, [2, 4], 16, "Nutze den Potenz-Operator '**' (z.B. base ** exp) oder die Funktion Math.pow(base, exp).");
  });
});

describe("math-task-05: maximumTwo", () => {
  test("Maximum von zwei", () => {
    check(maximumTwo, [3, 7], 7, "Nutze die Funktion Math.max(a, b), um die größere der beiden Zahlen zu finden.");
  });
});

describe("math-task-06: minimumThree", () => {
  test("Minimum von drei", () => {
    check(minimumThree, [4, 2, 9], 2, "Nutze die Funktion Math.min(a, b, c), um die kleinste der drei Zahlen zu finden.");
  });
});

describe("math-task-07: clampValue", () => {
  test("begrenzen", () => {
    check(clampValue, [5, 0, 10], 5, "Nutze eine if-Abfrage, um zu prüfen, ob der Wert kleiner als das Minimum oder größer als das Maximum ist.");
    check(clampValue, [-1, 0, 10], 0, "Nutze eine if-Abfrage, um zu prüfen, ob der Wert kleiner als das Minimum oder größer als das Maximum ist.");
    check(clampValue, [99, 0, 10], 10, "Nutze eine if-Abfrage, um zu prüfen, ob der Wert kleiner als das Minimum oder größer als das Maximum ist.");
  });
});

describe("math-task-08: factorialMath", () => {
  test("Fakultät", () => {
    check(factorialMath, [0], 1, "Die Fakultät von 0 ist 1. Für n > 0 nutze eine for-Schleife, um alle Zahlen von 1 bis n zu multiplizieren.");
    check(factorialMath, [5], 120, "Die Fakultät von 0 ist 1. Für n > 0 nutze eine for-Schleife, um alle Zahlen von 1 bis n zu multiplizieren.");
  });
});

describe("math-task-09: roundTwoDecimals", () => {
  test("zwei Nachkommastellen", () => {
    check(roundTwoDecimals, [3.146], 3.15, "Multipliziere die Zahl mit 100, runde sie mit Math.round() und teile sie dann wieder durch 100.");
  });
});

describe("math-task-10: percentage", () => {
  test("Prozent", () => {
    check(percentage, [25, 200], 12.5, "Teile den Teil (part) durch das Ganze (whole) und multipliziere das Ergebnis mit 100.");
  });
});
