import { describe, expect, test } from "bun:test";
import {
  add,
  average,
  countOccurrences,
  doubleAll,
  findMax,
  firstOrNull,
  hasEven,
  lastOrNull,
  mergeArrays,
  range,
  reversedCopy,
} from "./tasks.js";

// Helper: when a check fails, show a hint above the error.
// Arrays are compared item by item (toEqual), everything else exactly (toBe).
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

describe("arrays-task-01: add", () => {
  test("sum of all numbers", () => {
    check(add, [[1, 2, 3]], 6, "let sum = 0, loop over the array and add array[i] each lap.");
    check(add, [[]], 0, "An empty array gives 0.");
  });
});

describe("arrays-task-02: average", () => {
  test("average", () => {
    check(average, [[2, 4, 6]], 4, "Divide the sum by the number of items (array.length).");
    check(average, [[]], 0, "An empty array gives 0, not NaN. Check if (array.length === 0) first.");
  });
});

describe("arrays-task-03: findMax", () => {
  test("biggest item", () => {
    check(findMax, [[3, 9, 2]], 9, "Start with max = array[0]. Loop and replace max when array[i] > max.");
    check(findMax, [[-5, -2, -9]], -2, "Start with max = array[0], not 0. Otherwise negative numbers go wrong.");
    check(findMax, [[]], null, "An empty array gives null.");
  });
});

describe("arrays-task-04: countOccurrences", () => {
  test("count a value", () => {
    check(countOccurrences, [[1, 2, 2, 3], 2], 2, "Loop over the array. If array[i] === value, add 1 to a counter.");
    check(countOccurrences, [[1, 2, 3], 4], 0, "When the value is not there, the answer is 0.");
  });
});

describe("arrays-task-05: doubleAll", () => {
  test("double every number", () => {
    const original = [1, 2, 3];
    check(doubleAll, [original], [2, 4, 6], "const result = []; loop and result.push(array[i] * 2).");
    expect(original).toEqual([1, 2, 3]); // the old array must stay the same
  });
});

describe("arrays-task-06: firstOrNull", () => {
  test("first item", () => {
    check(firstOrNull, [[7, 8]], 7, "If the array is not empty, return array[0].");
    check(firstOrNull, [[]], null, "If the array is empty, return null.");
  });
});

describe("arrays-task-07: lastOrNull", () => {
  test("last item", () => {
    check(lastOrNull, [[7, 8]], 8, "If the array is not empty, return array[array.length - 1].");
    check(lastOrNull, [[]], null, "If the array is empty, return null.");
  });
});

describe("arrays-task-08: range", () => {
  test("range 1 ... n", () => {
    check(range, [4], [1, 2, 3, 4], "Loop i from 1 to n and push each i into a new array.");
    check(range, [0], [], "For n === 0 return an empty array [].");
  });
});

describe("arrays-task-09: mergeArrays", () => {
  test("join two arrays", () => {
    const a = [1, 2];
    const b = [3, 4];
    check(mergeArrays, [a, b], [1, 2, 3, 4], "Use the spread operator: [...a, ...b].");
    expect(a).toEqual([1, 2]); // a must stay the same
    expect(b).toEqual([3, 4]); // b must stay the same
  });
});

describe("arrays-task-10: reversedCopy", () => {
  test("reversed copy", () => {
    const original = [1, 2, 3];
    check(reversedCopy, [original], [3, 2, 1], "Loop backwards from array.length - 1 down to 0 and push each item into a new array.");
    expect(original).toEqual([1, 2, 3]); // the old array must stay the same
  });
});

describe("arrays-task-11: hasEven", () => {
  test("is there an even number", () => {
    check(hasEven, [[1, 3, 4]], true, "Loop. As soon as array[i] % 2 === 0, return true.");
    check(hasEven, [[1, 3, 5]], false, "After the loop, return false: no even number was found.");
    check(hasEven, [[]], false, "An empty array has no even number.");
  });
});
