import { describe, expect, test } from "bun:test";
import {
  addCoords,
  bumpPatchVersion,
  countKeys,
  fullNameFromPerson,
  incrementPersonAge,
  listSortedKeys,
  makePoint,
  objectHasKey,
  pickTitleAuthor,
  sumCartTotal,
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

describe("objects-task-01: fullNameFromPerson", () => {
  test("Vorname und Nachname", () => {
    check(
      fullNameFromPerson,
      [{ firstName: "Ada", lastName: "Lovelace" }],
      "Ada Lovelace",
      "Greife auf person.firstName und person.lastName zu und verbinde sie mit einem Leerzeichen (z.B. mit Template-Strings)."
    );
  });
});

describe("objects-task-02: bumpPatchVersion", () => {
  test("Patch erhöhen", () => {
    const original = { major: 1, minor: 2, patch: 3 };
    check(
      bumpPatchVersion,
      [original],
      { major: 1, minor: 2, patch: 4 },
      "Erstelle ein neues Objekt und kopiere alle Eigenschaften des alten Objekts (z.B. mit dem Spread-Operator ...version). Überschreibe dann die Eigenschaft patch mit dem um 1 erhöhten Wert."
    );
    expect(original.patch).toBe(3); // Original darf nicht mutiert sein
  });
});

describe("objects-task-03: countKeys", () => {
  test("Anzahl der Keys", () => {
    check(countKeys, [{ a: 1, b: 2 }], 2, "Nutze die Funktion Object.keys(obj), um ein Array aller Eigenschaften zu erhalten, und frage dann dessen Länge (.length) ab.");
    check(countKeys, [{}], 0, "Nutze die Funktion Object.keys(obj), um ein Array aller Eigenschaften zu erhalten, und frage dann dessen Länge (.length) ab.");
  });
});

describe("objects-task-04: objectHasKey", () => {
  test("Key vorhanden?", () => {
    check(objectHasKey, [{ x: 1 }, "x"], true, "Nutze den in-Operator (z.B. key in obj) oder die Funktion Object.hasOwn(obj, key).");
    check(objectHasKey, [{ x: 1 }, "y"], false, "Nutze den in-Operator (z.B. key in obj) oder die Funktion Object.hasOwn(obj, key).");
  });
});

describe("objects-task-05: pickTitleAuthor", () => {
  test("Titel und Autor", () => {
    check(
      pickTitleAuthor,
      [{ title: "1984", author: "Orwell" }],
      "1984 von Orwell",
      "Greife auf book.title und book.author zu und verbinde sie mit dem Wort 'von' (z.B. `${title} von ${author}`)."
    );
  });
});

describe("objects-task-06: makePoint", () => {
  test("Punkt erzeugen", () => {
    check(makePoint, [2, 3], { x: 2, y: 3 }, "Erstelle ein neues Objekt mit den Eigenschaften x und y und weise ihnen die übergebenen Werte zu (z.B. { x: x, y: y }).");
  });
});

describe("objects-task-07: incrementPersonAge", () => {
  test("Alter erhöhen", () => {
    const original = { name: "Bo", age: 20 };
    check(
      incrementPersonAge,
      [original],
      { name: "Bo", age: 21 },
      "Nutze den Spread-Operator (...person), um alle Eigenschaften in ein neues Objekt zu kopieren, und überschreibe dann die Eigenschaft age mit person.age + 1."
    );
    expect(original.age).toBe(20); // Original unberührt
  });
});

describe("objects-task-08: sumCartTotal", () => {
  test("Warenkorb-Summe", () => {
    check(
      sumCartTotal,
      [[{ price: 2, qty: 3 }, { price: 5, qty: 1 }]],
      11,
      "Nutze eine Schleife, um über das Array zu iterieren. Multipliziere für jedes Element price mit qty und addiere das Ergebnis zu einer Summen-Variable."
    );
    check(sumCartTotal, [[]], 0, "Ein leeres Array sollte 0 ergeben.");
  });
});

describe("objects-task-09: listSortedKeys", () => {
  test("Sortierte Keys", () => {
    check(listSortedKeys, [{ b: 1, a: 2 }], "a,b", "Nutze Object.keys(obj), um ein Array der Keys zu erhalten. Sortiere das Array mit .sort() und verbinde die Elemente mit .join(',').");
  });
});

describe("objects-task-10: addCoords", () => {
  test("Koordinaten addieren", () => {
    check(
      addCoords,
      [{ x: 1, y: 2 }, { x: 3, y: 4 }],
      { x: 4, y: 6 },
      "Erstelle ein neues Objekt mit den Eigenschaften x und y. Der Wert für x ist a.x + b.x, der Wert für y ist a.y + b.y."
    );
  });
});
