/**
 * JavaScript-Übungen — Thema: Funktionen (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function squareNumber(x) {
  return x * x;
}

export function cubeNumber(x) {
  return x * x * x;
  // Alternativ: return x ** 3;
}

export function hypotenuseNumber(a, b) {
  return Math.sqrt(a * a + b * b);
}

export function greetOrDefault(name) {
  if (name === undefined) {
    return "Hallo, Welt!";
  }
  return `Hallo, ${name}!`;
}

export function formatEuro(amount) {
  return `${amount.toFixed(2)} €`;
}

export function longerThan(text, n) {
  return text.length > n;
}

export function safeDivideNums(a, b) {
  if (b === 0) {
    return null;
  }
  return a / b;
}

export function firstCharCodeAt(text) {
  return text.charCodeAt(0);
}

export function joinParts(a, b) {
  return a + b;
}

export function middleValue(a, b, c) {
  const arr = [a, b, c];
  arr.sort((x, y) => x - y);
  return arr[1];
}
