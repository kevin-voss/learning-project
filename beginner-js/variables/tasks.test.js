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
  sumOfArray
} from "./tasks.js";

// Hilfsfunktion, um bei Fehlern einen Tipp anzuzeigen
function check(fn, args, expected, hint) {
  try {
    expect(fn(...args)).toBe(expected);
  } catch (e) {
    throw new Error(`\n💡 TIPP: ${hint}\n\n${e.message}`);
  }
}

describe("variables-task-01: rectangleArea", () => {
  test("multipliziert Breite und Höhe", () => {
    check(rectangleArea, [4, 5], 20, "Multipliziere width und height mit dem '*' Operator.");
    check(rectangleArea, [2, 3], 6, "Multipliziere width und height mit dem '*' Operator.");
  });
});

describe("variables-task-02: celsiusToFahrenheit", () => {
  test("0 °C ist 32 °F", () => {
    check(celsiusToFahrenheit, [0], 32, "Die Formel lautet: c * 9/5 + 32. Vergiss nicht, das Ergebnis zurückzugeben (return).");
  });
  test("100 °C ist 212 °F", () => {
    check(celsiusToFahrenheit, [100], 212, "Die Formel lautet: c * 9/5 + 32. Vergiss nicht, das Ergebnis zurückzugeben (return).");
  });
});

describe("variables-task-03: minutesToSeconds", () => {
  test("1 Minute = 60 Sekunden", () => {
    check(minutesToSeconds, [1], 60, "Multipliziere die Minuten mit 60.");
  });
  test("5 Minuten", () => {
    check(minutesToSeconds, [5], 300, "Multipliziere die Minuten mit 60.");
  });
});

describe("variables-task-04: concatWithSpace", () => {
  test("zwei Wörter mit Leerzeichen", () => {
    check(concatWithSpace, ["Hallo", "Welt"], "Hallo Welt", "Nutze den '+' Operator, z.B. wordA + ' ' + wordB, oder Template-Strings: `${wordA} ${wordB}`.");
  });
});

describe("variables-task-05: templateWelcome", () => {
  test("Willkommens-Template", () => {
    check(templateWelcome, ["Alex"], "Willkommen, Alex!", "Nutze Backticks (`) für Template-Strings und füge die Variable mit ${name} ein. Achte auf das Ausrufezeichen!");
  });
});

describe("variables-task-06: lengthOfText", () => {
  test("Länge zählen", () => {
    check(lengthOfText, ["abc"], 3, "Jeder Text (String) hat eine Eigenschaft '.length', die die Anzahl der Zeichen speichert (z.B. text.length).");
  });
  test("leerer String", () => {
    check(lengthOfText, [""], 0, "Jeder Text (String) hat eine Eigenschaft '.length', die die Anzahl der Zeichen speichert (z.B. text.length).");
  });
});

describe("variables-task-07: numberToText", () => {
  test("Zahl wird String", () => {
    check(numberToText, [7], "7", "Nutze die Funktion String(n) oder die Methode n.toString(), um eine Zahl in Text umzuwandeln.");
  });
});

describe("variables-task-08: textToNumber", () => {
  test("String wird Zahl", () => {
    check(textToNumber, ["42"], 42, "Nutze die Funktion Number(text), um Text in eine Zahl umzuwandeln.");
  });
});

describe("variables-task-09: remainderDivision", () => {
  test("Rest der Division", () => {
    check(remainderDivision, [10, 3], 1, "Nutze den Modulo-Operator '%' (z.B. a % b), um den Rest zu berechnen.");
  });
});

describe("variables-task-10: incrementValue", () => {
  test("um eins erhöht", () => {
    check(incrementValue, [4], 5, "Addiere 1 zu n (z.B. n + 1) und gib das Ergebnis zurück.");
  });
});

describe("variables-task-11: sum of array", () => {
  test("sum of array", () => {
    check(sumOfArray, [[2, 3, 4]], 9, "Nutze eine for-Schleife, um über das Array zu iterieren. Addiere jedes Element zu einer Summen-Variable.");
    check(sumOfArray, [[3, 9, 2]], 14, "Nutze eine for-Schleife, um über das Array zu iterieren. Addiere jedes Element zu einer Summen-Variable.");
    check(sumOfArray, [[1]], 1, "Achte darauf, dass die Schleife bei 0 beginnt und solange läuft, wie i < array.length.");
    check(sumOfArray, [[2, 9, 8]], 19, "Achte darauf, dass die Schleife bei 0 beginnt und solange läuft, wie i < array.length.");
  });
});
