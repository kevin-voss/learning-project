import { describe, expect, test } from "bun:test";
import {
  add,
  average,
  countOccurrences,
  doubleAll,
  findMax,
  firstOrNull,
  lastOrNull,
  mergeArrays,
  range,
  reversedCopy,
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

describe("arrays-task-01: add", () => {
  test("Summe aller Zahlen", () => {
    check(add, [[1, 2, 3]], 6, "Nutze eine Schleife oder die Methode .reduce((acc, val) => acc + val, 0), um alle Elemente zu addieren.");
    check(add, [[]], 0, "Ein leeres Array ergibt die Summe 0.");
  });
});

describe("arrays-task-02: average", () => {
  test("Durchschnitt", () => {
    check(average, [[2, 4, 6]], 4, "Teile die Summe aller Elemente durch die Anzahl der Elemente (array.length).");
    check(average, [[]], 0, "Ein leeres Array ergibt 0 (nicht NaN). Prüfe mit if (array.length === 0).");
  });
});

describe("arrays-task-03: findMax", () => {
  test("Größtes Element", () => {
    check(findMax, [[3, 9, 2]], 9, "Nutze eine Schleife, um das größte Element zu finden, oder die Funktion Math.max(...array).");
    check(findMax, [[]], null, "Ein leeres Array ergibt null.");
  });
});

describe("arrays-task-04: countOccurrences", () => {
  test("Vorkommen zählen", () => {
    check(countOccurrences, [[1, 2, 2, 3], 2], 2, "Nutze eine Schleife oder .filter(v => v === value).length, um die Vorkommen von value zu zählen.");
    check(countOccurrences, [[1, 2, 3], 4], 0, "Wenn der Wert nicht vorkommt, ist das Ergebnis 0.");
  });
});

describe("arrays-task-05: doubleAll", () => {
  test("Werte verdoppeln", () => {
    const original = [1, 2, 3];
    check(doubleAll, [original], [2, 4, 6], "Nutze eine Schleife und .push(), oder die Methode .map(v => v * 2).");
    expect(original).toEqual([1, 2, 3]); // Original darf nicht mutiert sein
  });
});

describe("arrays-task-06: firstOrNull", () => {
  test("Erstes Element", () => {
    check(firstOrNull, [[7, 8]], 7, "Wenn das Array nicht leer ist, gib array[0] zurück.");
    check(firstOrNull, [[]], null, "Wenn das Array leer ist, gib null zurück.");
  });
});

describe("arrays-task-07: lastOrNull", () => {
  test("Letztes Element", () => {
    check(lastOrNull, [[7, 8]], 8, "Wenn das Array nicht leer ist, gib das Element am Index array.length - 1 zurück.");
    check(lastOrNull, [[]], null, "Wenn das Array leer ist, gib null zurück.");
  });
});

describe("arrays-task-08: range", () => {
  test("Range 1 ... n", () => {
    check(range, [4], [1, 2, 3, 4], "Nutze eine Schleife von 1 bis n und füge jede Zahl mit .push() zu einem neuen Array hinzu.");
    check(range, [0], [], "Für n === 0 gib ein leeres Array [] zurück.");
  });
});

describe("arrays-task-09: mergeArrays", () => {
  test("Arrays verketten", () => {
    const a = [1, 2];
    const b = [3, 4];
    check(mergeArrays, [a, b], [1, 2, 3, 4], "Nutze den Spread-Operator (z.B. [...a, ...b]) oder die Methode a.concat(b).");
    expect(a).toEqual([1, 2]); // Original darf nicht mutiert sein
    expect(b).toEqual([3, 4]); // Original darf nicht mutiert sein
  });
});

describe("arrays-task-10: reversedCopy", () => {
  test("Umgekehrtes Kopie-Array", () => {
    const original = [1, 2, 3];
    check(reversedCopy, [original], [3, 2, 1], "Nutze eine rückwärts laufende Schleife und .push(), oder erstelle eine Kopie und drehe sie um (z.B. [...array].reverse()).");
    expect(original).toEqual([1, 2, 3]); // Original darf nicht mutiert sein
  });
});
