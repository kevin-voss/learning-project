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

// Hilfsfunktion, um bei Fehlern einen Tipp anzuzeigen
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\n💡 TIPP: ${hint}\n\n${e.message}`);
  }
}

describe("functions-task-01: squareNumber", () => {
  test("Quadrat", () => {
    check(squareNumber, [4], 16, "Multipliziere x mit sich selbst (x * x).");
  });
});

describe("functions-task-02: cubeNumber", () => {
  test("Kubus", () => {
    check(cubeNumber, [3], 27, "Rechne x * x * x oder nutze den Potenz-Operator x ** 3.");
  });
});

describe("functions-task-03: hypotenuseNumber", () => {
  test("Hypotenuse", () => {
    check(hypotenuseNumber, [3, 4], 5, "Die Formel lautet Math.sqrt(a*a + b*b).");
  });
});

describe("functions-task-04: greetOrDefault", () => {
  test("mit Name", () => {
    check(greetOrDefault, ["Alex"], "Hallo, Alex!", "Prüfe mit if (name === undefined), ob ein Name übergeben wurde. Wenn nicht, gib 'Hallo, Welt!' zurück. Ansonsten gib 'Hallo, NAME!' zurück.");
  });
  test("ohne Parameter", () => {
    check(greetOrDefault, [], "Hallo, Welt!", "Prüfe mit if (name === undefined), ob ein Name übergeben wurde. Wenn nicht, gib 'Hallo, Welt!' zurück. Ansonsten gib 'Hallo, NAME!' zurück.");
  });
});

describe("functions-task-05: formatEuro", () => {
  test("Euro-Format", () => {
    check(formatEuro, [12.5], "12.50 €", "Nutze die Methode .toFixed(2) auf der Zahl, um sie auf zwei Nachkommastellen zu formatieren. Hänge dann das Euro-Zeichen mit einem Leerzeichen davor an.");
  });
});

describe("functions-task-06: longerThan", () => {
  test("Länger als n?", () => {
    check(longerThan, ["abc", 2], true, "Vergleiche text.length mit n (z.B. text.length > n) und gib das Ergebnis (true oder false) zurück.");
    check(longerThan, ["ab", 2], false, "Vergleiche text.length mit n (z.B. text.length > n) und gib das Ergebnis (true oder false) zurück.");
  });
});

describe("functions-task-07: safeDivideNums", () => {
  test("Sichere Division", () => {
    check(safeDivideNums, [10, 2], 5, "Prüfe mit if (b === 0). Wenn ja, gib null zurück. Ansonsten gib a / b zurück.");
    check(safeDivideNums, [10, 0], null, "Prüfe mit if (b === 0). Wenn ja, gib null zurück. Ansonsten gib a / b zurück.");
  });
});

describe("functions-task-08: firstCharCodeAt", () => {
  test("Erstes Zeichen Code", () => {
    check(firstCharCodeAt, ["A"], 65, "Nutze die Methode .charCodeAt(0) auf dem String.");
  });
});

describe("functions-task-09: joinParts", () => {
  test("Zwei Teile", () => {
    check(joinParts, ["foo", "bar"], "foobar", "Nutze den '+' Operator (z.B. a + b).");
  });
});

describe("functions-task-10: middleValue", () => {
  test("Median", () => {
    check(middleValue, [1, 9, 5], 5, "Erstelle ein Array aus den drei Zahlen ([a, b, c]), sortiere es mit .sort((x, y) => x - y) und gib das mittlere Element (Index 1) zurück.");
    check(middleValue, [10, 2, 8], 8, "Erstelle ein Array aus den drei Zahlen ([a, b, c]), sortiere es mit .sort((x, y) => x - y) und gib das mittlere Element (Index 1) zurück.");
  });
});
