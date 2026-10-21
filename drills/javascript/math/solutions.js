/**
 * JavaScript drill: math (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
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
  return base ** exp; // or: Math.pow(base, exp)
}

export function maximumTwo(a, b) {
  return Math.max(a, b);
}

export function minimumThree(a, b, c) {
  return Math.min(a, b, c);
}

export function clampValue(value, min, max) {
  const notTooSmall = Math.max(value, min);
  const notTooBig = Math.min(notTooSmall, max);
  return notTooBig;
  // In one line: return Math.min(Math.max(value, min), max);
}

export function averageOfThree(a, b, c) {
  const sum = a + b + c;
  return sum / 3;
}

export function roundTwoDecimals(x) {
  return Math.round(x * 100) / 100;
}

export function percentage(part, whole) {
  return (part / whole) * 100;
}
