/**
 * JavaScript drill: functions (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
 */

export function squareNumber(x) {
  return x * x;
}

export function cubeNumber(x) {
  return squareNumber(x) * x; // a function can call another function
  // Also works: return x ** 3;
}

export function hypotenuseNumber(a, b) {
  return Math.sqrt(a * a + b * b);
}

export function greetOrDefault(name) {
  if (name === undefined) {
    return "Hello, world!";
  }
  return `Hello, ${name}!`;
  // Shorter, with a default value: function greetOrDefault(name = "world") { return `Hello, ${name}!`; }
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
  const biggest = Math.max(a, b, c);
  const smallest = Math.min(a, b, c);
  return a + b + c - biggest - smallest;
  // With an array: const sorted = [a, b, c].sort((x, y) => x - y); return sorted[1];
}
