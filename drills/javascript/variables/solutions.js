/**
 * JavaScript drill: variables (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
 */

export function rectangleArea(width, height) {
  const area = width * height;
  return area;
}

export function celsiusToFahrenheit(c) {
  const fahrenheit = c * 9 / 5 + 32;
  return fahrenheit;
}

export function minutesToSeconds(minutes) {
  const seconds = minutes * 60;
  return seconds;
}

export function concatWithSpace(wordA, wordB) {
  const sentence = `${wordA} ${wordB}`;
  return sentence;
}

export function templateWelcome(name) {
  const welcome = `Welcome, ${name}!`;
  return welcome;
}

export function lengthOfText(text) {
  const length = text.length;
  return length;
}

export function numberToText(n) {
  const text = String(n);
  return text;
}

export function textToNumber(text) {
  const number = Number(text);
  return number;
}

export function remainderDivision(a, b) {
  const rest = a % b;
  return rest;
}

export function incrementValue(n) {
  const next = n + 1;
  return next;
}
