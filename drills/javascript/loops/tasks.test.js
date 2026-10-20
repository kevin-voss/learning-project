import { describe, expect, test } from "bun:test";
import {
  countInString,
  countdownArrayFor,
  hasEvenFor,
  indexOfInArray,
  productFromOneToN,
  repeatCharacter,
  reverseStringFor,
  stringOfStars,
  sumArrayFor,
  sumFromOneToN,
} from "./tasks.js";

// Hilfsfunktion, um bei Fehlern einen Tipp anzuzeigen
function check(fn, args, expected, hint) {
  try {
    if (typeof expected === "object" && expected !== null) {
      expect(fn(...args)).toEqual(expected);
    } else {
      expect(fn(...args)).toBe(expected);
    }
  } catch (e) {
    throw new Error(`\n💡 TIPP: ${hint}\n\n${e.message}`);
  }
}

describe("loops-task-01: sumFromOneToN", () => {
  test("Summe von 1 bis n", () => {
    check(sumFromOneToN, [4], 10, "Nutze eine for-Schleife, die von 1 bis n läuft, und addiere in jedem Schritt die Schleifenvariable zu einer Summen-Variable.");
    check(sumFromOneToN, [0], 0, "Für n === 0 soll das Ergebnis 0 sein.");
  });
});

describe("loops-task-02: repeatCharacter", () => {
  test("Zeichen wiederholen", () => {
    check(repeatCharacter, ["a", 3], "aaa", "Nutze eine for-Schleife, die count-mal läuft, und hänge in jedem Schritt ch an eine String-Variable an.");
    check(repeatCharacter, ["x", 0], "", "Für count === 0 soll das Ergebnis ein leerer String sein.");
  });
});

describe("loops-task-03: countInString", () => {
  test("Buchstaben zählen", () => {
    check(countInString, ["banana", "a"], 3, "Nutze eine Schleife, um über alle Zeichen von str zu iterieren (str.length). Wenn das aktuelle Zeichen gleich ch ist, erhöhe einen Zähler.");
    check(countInString, ["hello", "z"], 0, "Wenn das Zeichen nicht im String vorkommt, soll das Ergebnis 0 sein.");
  });
});

describe("loops-task-04: indexOfInArray", () => {
  test("Erster Index", () => {
    check(indexOfInArray, [[1, 2, 3], 2], 1, "Nutze eine Schleife, um über das Array zu iterieren. Wenn arr[i] === val ist, gib i zurück. Wenn die Schleife durchläuft, ohne den Wert zu finden, gib -1 zurück.");
    check(indexOfInArray, [[1, 2, 3], 9], -1, "Wenn der Wert nicht im Array vorkommt, soll das Ergebnis -1 sein.");
  });
});

describe("loops-task-05: productFromOneToN", () => {
  test("Produkt von 1 bis n", () => {
    check(productFromOneToN, [4], 24, "Nutze eine Schleife, die von 1 bis n läuft, und multipliziere die Schleifenvariable mit einer Produkt-Variable (die mit 1 initialisiert sein sollte).");
    check(productFromOneToN, [0], 1, "Für n === 0 soll das Ergebnis 1 sein (leeres Produkt).");
  });
});

describe("loops-task-06: sumArrayFor", () => {
  test("Array-Summe", () => {
    check(sumArrayFor, [[1, 2, 3]], 6, "Nutze eine Schleife, um über das Array zu iterieren, und addiere jedes Element zu einer Summen-Variable.");
    check(sumArrayFor, [[]], 0, "Ein leeres Array ergibt 0.");
  });
});

describe("loops-task-07: reverseStringFor", () => {
  test("String umdrehen", () => {
    check(reverseStringFor, ["abc"], "cba", "Nutze eine Schleife, die rückwärts über den String läuft (von str.length - 1 bis 0), und hänge jedes Zeichen an einen neuen String an.");
    check(reverseStringFor, [""], "", "Ein leerer String bleibt leer.");
  });
});

describe("loops-task-08: countdownArrayFor", () => {
  test("Countdown-Array", () => {
    check(countdownArrayFor, [3], [3, 2, 1], "Nutze eine Schleife, die von n bis 1 rückwärts läuft, und füge jede Zahl mit .push() zu einem Array hinzu.");
    check(countdownArrayFor, [0], [], "Für n === 0 soll das Ergebnis ein leeres Array sein.");
  });
});

describe("loops-task-09: hasEvenFor", () => {
  test("Gerade Zahl vorhanden?", () => {
    check(hasEvenFor, [[1, 3, 4]], true, "Nutze eine Schleife. Wenn ein Element durch 2 teilbar ist (% 2 === 0), gib sofort true zurück.");
    check(hasEvenFor, [[1, 3, 5]], false, "Wenn die Schleife durchläuft, ohne eine gerade Zahl zu finden, gib false zurück.");
  });
});

describe("loops-task-10: stringOfStars", () => {
  test("Sterne-Zeile", () => {
    check(stringOfStars, [3], "***", "Nutze eine Schleife, die n-mal läuft, und hänge in jedem Schritt ein '*' an einen String an.");
    check(stringOfStars, [0], "", "Für n === 0 soll das Ergebnis ein leerer String sein.");
  });
});
