/**
 * JavaScript drill: objects (read README.md first)
 * Run the tests from the project folder: make objects | make objects-task-06
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Full name
 *
 * **Your job:** Build a full name from a person's first and last name.
 * **You get:** `person` (an object with `firstName` and `lastName`).
 * **How:** Read `person.firstName` and `person.lastName` and put one space between them.
 * **Returns:** A string.
 *
 * **Test it:** `make objects-task-01`
 *
 * @example fullNameFromPerson({ firstName: "Ada", lastName: "Lovelace" }) // → "Ada Lovelace"
 */
export function fullNameFromPerson(person) {
  // TODO: write your code here
  return "";
}

/**
 * Task 2 — Next patch version
 *
 * **Your job:** Add 1 to `patch` in a version object. Do not change the old object.
 * **You get:** `version` (an object with `major`, `minor` and `patch`).
 * **How:** Copy all fields into a new object with `...version`, then set `patch` again:
 *   `{ ...version, patch: version.patch + 1 }`.
 * **Returns:** A new object `{ major, minor, patch }`.
 *
 * **Test it:** `make objects-task-02`
 *
 * @example bumpPatchVersion({ major: 1, minor: 2, patch: 3 }) // → { major: 1, minor: 2, patch: 4 }
 */
export function bumpPatchVersion(version) {
  // TODO: write your code here
  return {};
}

/**
 * Task 3 — How many fields?
 *
 * **Your job:** Count the fields (keys) of an object.
 * **You get:** `obj` (any object).
 * **How:** `Object.keys(obj)` gives an array of all keys. Return its `.length`.
 * **Returns:** A whole number (0 or more).
 *
 * **Test it:** `make objects-task-03`
 *
 * @example countKeys({ a: 1, b: 2 }) // → 2
 * @example countKeys({}) // → 0
 */
export function countKeys(obj) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 4 — Is the field there?
 *
 * **Your job:** Check if an object has a field with this name.
 * **You get:** `obj` (an object) and `key` (the field name as a string).
 * **How:** Use `key in obj`, or `Object.hasOwn(obj, key)`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make objects-task-04`
 *
 * @example objectHasKey({ x: 1 }, "x") // → true
 */
export function objectHasKey(obj, key) {
  // TODO: write your code here
  return false;
}

/**
 * Task 5 — Title and author
 *
 * **Your job:** Describe a book in one line.
 * **You get:** `book` (an object with `title` and `author`).
 * **How:** Read `book.title` and `book.author` and put the word "by" between them.
 * **Returns:** A string like `"1984 by Orwell"`.
 *
 * **Test it:** `make objects-task-05`
 *
 * @example pickTitleAuthor({ title: "1984", author: "Orwell" }) // → "1984 by Orwell"
 */
export function pickTitleAuthor(book) {
  // TODO: write your code here
  return "";
}

/**
 * Task 6 — Make a point
 *
 * **Your job:** Build a new object for a point with `x` and `y`.
 * **You get:** `x` and `y` (two numbers).
 * **How:** Return `{ x: x, y: y }`.
 * **Returns:** An object with exactly these two fields.
 *
 * **Test it:** `make objects-task-06`
 *
 * @example makePoint(2, 3) // → { x: 2, y: 3 }
 */
export function makePoint(x, y) {
  // TODO: write your code here
  return {};
}

/**
 * Task 7 — One year older (new object)
 *
 * **Your job:** Return a new person who is one year older. Do not change the old object.
 * **You get:** `person` (an object with `name` and `age`).
 * **How:** `{ ...person, age: person.age + 1 }`.
 * **Returns:** A new object.
 *
 * **Test it:** `make objects-task-07`
 *
 * @example incrementPersonAge({ name: "Bo", age: 20 }) // → { name: "Bo", age: 21 }
 */
export function incrementPersonAge(person) {
  // TODO: write your code here
  return {};
}

/**
 * Task 8 — Shopping cart total
 *
 * **Your job:** Add up the price of everything in a shopping cart.
 * **You get:** `items` (an array of objects, each with `price` and `qty`, the quantity).
 * **How:** Loop over `items`. For each item add `items[i].price * items[i].qty` to a sum.
 * **Returns:** A number (`0` for an empty cart).
 *
 * **Test it:** `make objects-task-08`
 *
 * @example sumCartTotal([{ price: 2, qty: 3 }, { price: 5, qty: 1 }]) // → 11
 */
export function sumCartTotal(items) {
  // TODO: write your code here
  return 0;
}

/**
 * Task 9 — Sorted field names
 *
 * **Your job:** List all field names in A–Z order, separated by commas.
 * **You get:** `obj` (any object).
 * **How:** `Object.keys(obj)` gives the names. `.sort()` puts them in order. `.join(",")` glues them with commas.
 * **Returns:** A string like `"a,b"`.
 *
 * **Test it:** `make objects-task-09`
 *
 * @example listSortedKeys({ b: 1, a: 2 }) // → "a,b"
 */
export function listSortedKeys(obj) {
  // TODO: write your code here
  return "";
}

/**
 * Task 10 — Add two points
 *
 * **Your job:** Add two points field by field and return a new point.
 * **You get:** `a` and `b` (two objects, each with `x` and `y`).
 * **How:** The new `x` is `a.x + b.x`. The new `y` is `a.y + b.y`.
 * **Returns:** A new object with `x` and `y`.
 *
 * **Test it:** `make objects-task-10`
 *
 * @example addCoords({ x: 1, y: 2 }, { x: 3, y: 4 }) // → { x: 4, y: 6 }
 */
export function addCoords(a, b) {
  // TODO: write your code here
  return {};
}
