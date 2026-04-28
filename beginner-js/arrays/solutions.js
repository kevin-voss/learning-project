/**
 * JavaScript-Übungen — Thema: Arrays (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function add(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
  // Alternativ: return array.reduce((acc, val) => acc + val, 0);
}

export function average(array) {
  if (array.length === 0) return 0;
  return add(array) / array.length;
}

export function findMax(array) {
  if (array.length === 0) return null;
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
  // Alternativ: return Math.max(...array);
}

export function countOccurrences(array, value) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      count++;
    }
  }
  return count;
  // Alternativ: return array.filter(v => v === value).length;
}

export function doubleAll(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(array[i] * 2);
  }
  return result;
  // Alternativ: return array.map(v => v * 2);
}

export function firstOrNull(array) {
  if (array.length === 0) return null;
  return array[0];
}

export function lastOrNull(array) {
  if (array.length === 0) return null;
  return array[array.length - 1];
}

export function range(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}

export function mergeArrays(a, b) {
  return [...a, ...b];
  // Alternativ: return a.concat(b);
}

export function reversedCopy(array) {
  const result = [];
  for (let i = array.length - 1; i >= 0; i--) {
    result.push(array[i]);
  }
  return result;
  // Alternativ: return [...array].reverse();
}
