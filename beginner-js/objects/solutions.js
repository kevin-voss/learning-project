/**
 * JavaScript-Übungen — Thema: Objekte (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function fullNameFromPerson(person) {
  return `${person.firstName} ${person.lastName}`;
}

export function bumpPatchVersion(version) {
  return {
    ...version,
    patch: version.patch + 1
  };
}

export function countKeys(obj) {
  return Object.keys(obj).length;
}

export function objectHasKey(obj, key) {
  return key in obj;
  // Alternativ: return Object.hasOwn(obj, key);
}

export function pickTitleAuthor(book) {
  return `${book.title} von ${book.author}`;
}

export function makePoint(x, y) {
  return { x: x, y: y };
  // Alternativ kürzer: return { x, y };
}

export function incrementPersonAge(person) {
  return {
    ...person,
    age: person.age + 1
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
    y: a.y + b.y
  };
}
