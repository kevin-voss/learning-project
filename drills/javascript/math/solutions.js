/**
 * JavaScript-Übungen — Thema: Math (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function floorValue(x) {
  const floor = Math.floor(x);
  return floor;
}

export function ceilValue(x) {
  const ceil = Math.ceil(x);
  return ceil;
}

export function absoluteValue(x) {
  const absolute = Math.abs(x);
  return absolute;
}

export function powerValue(base, exp) {
  return Math.pow(base, exp); // oder base ** exp
}

export function maximumTwo(a, b) {
  return Math.max(a, b);
}

export function minimumThree(a, b, c) {
  return Math.min(a, b, c);
}

export function clampValue(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
  // Alternativ: return Math.min(Math.max(value, min), max);
}

export function factorialMath(n) {
  if (n === 0) return 1;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function roundTwoDecimals(x) {
  return Math.round(x * 100) / 100;
}

export function percentage(part, whole) {
  return (part / whole) * 100;
}
