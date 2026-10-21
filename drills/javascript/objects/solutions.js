/**
 * JavaScript drill: objects (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
 */

export function fullNameFromPerson(person) {
  return `${person.firstName} ${person.lastName}`;
}

export function bumpPatchVersion(version) {
  return {
    ...version,
    patch: version.patch + 1,
  };
}

export function countKeys(obj) {
  return Object.keys(obj).length;
}

export function objectHasKey(obj, key) {
  return key in obj;
  // Also works: return Object.hasOwn(obj, key);
}

export function pickTitleAuthor(book) {
  return `${book.title} by ${book.author}`;
}

export function makePoint(x, y) {
  return { x: x, y: y };
  // Shorter, when the names match: return { x, y };
}

export function incrementPersonAge(person) {
  return {
    ...person,
    age: person.age + 1,
  };
}

export function sumCartTotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].price * items[i].qty;
  }
  return sum;
}

export function listSortedKeys(obj) {
  return Object.keys(obj).sort().join(",");
}

export function addCoords(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}
