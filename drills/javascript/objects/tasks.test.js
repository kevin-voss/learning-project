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

// Helper: when a check fails, show a hint above the error.
// Objects are compared field by field (toEqual), everything else exactly (toBe).
function check(fn, args, expected, hint) {
  try {
    if (typeof expected === "object" && expected !== null) {
      expect(fn(...args)).toEqual(expected);
    } else {
      expect(fn(...args)).toBe(expected);
    }
  } catch (e) {
    throw new Error(`\nHINT: ${hint}\n\n${e.message}`);
  }
}

describe("objects-task-01: fullNameFromPerson", () => {
  test("first and last name", () => {
    check(
      fullNameFromPerson,
      [{ firstName: "Ada", lastName: "Lovelace" }],
      "Ada Lovelace",
      "Read person.firstName and person.lastName and put one space between them."
    );
  });
});

describe("objects-task-02: bumpPatchVersion", () => {
  test("next patch", () => {
    const original = { major: 1, minor: 2, patch: 3 };
    check(
      bumpPatchVersion,
      [original],
      { major: 1, minor: 2, patch: 4 },
      "Return { ...version, patch: version.patch + 1 }."
    );
    expect(original.patch).toBe(3); // the old object must stay the same
  });
});

describe("objects-task-03: countKeys", () => {
  test("number of fields", () => {
    const hint = "Object.keys(obj) gives an array of the keys. Return its .length.";
    check(countKeys, [{ a: 1, b: 2 }], 2, hint);
    check(countKeys, [{}], 0, hint);
  });
});

describe("objects-task-04: objectHasKey", () => {
  test("is the field there", () => {
    const hint = "Use key in obj, or Object.hasOwn(obj, key).";
    check(objectHasKey, [{ x: 1 }, "x"], true, hint);
    check(objectHasKey, [{ x: 1 }, "y"], false, hint);
  });
});

describe("objects-task-05: pickTitleAuthor", () => {
  test("title and author", () => {
    check(
      pickTitleAuthor,
      [{ title: "1984", author: "Orwell" }],
      "1984 by Orwell",
      "Use a template string: `${book.title} by ${book.author}`."
    );
  });
});

describe("objects-task-06: makePoint", () => {
  test("make a point", () => {
    check(makePoint, [2, 3], { x: 2, y: 3 }, "Return { x: x, y: y }.");
  });
});

describe("objects-task-07: incrementPersonAge", () => {
  test("one year older", () => {
    const original = { name: "Bo", age: 20 };
    check(
      incrementPersonAge,
      [original],
      { name: "Bo", age: 21 },
      "Return { ...person, age: person.age + 1 }."
    );
    expect(original.age).toBe(20); // the old object must stay the same
  });
});

describe("objects-task-08: sumCartTotal", () => {
  test("cart total", () => {
    check(
      sumCartTotal,
      [[{ price: 2, qty: 3 }, { price: 5, qty: 1 }]],
      11,
      "Loop over items. Add items[i].price * items[i].qty to a sum each lap."
    );
    check(sumCartTotal, [[]], 0, "An empty cart gives 0.");
  });
});

describe("objects-task-09: listSortedKeys", () => {
  test("sorted field names", () => {
    check(listSortedKeys, [{ b: 1, a: 2 }], "a,b", "Object.keys(obj).sort().join(',')");
  });
});

describe("objects-task-10: addCoords", () => {
  test("add two points", () => {
    check(
      addCoords,
      [{ x: 1, y: 2 }, { x: 3, y: 4 }],
      { x: 4, y: 6 },
      "Return a new object: x is a.x + b.x, y is a.y + b.y."
    );
  });
});
