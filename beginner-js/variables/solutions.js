/**
 * JavaScript-Übungen — Thema: Variablen (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function rectangleArea(width, height) {
  const area = width * height;
  return area;
}

export function celsiusToFahrenheit(c) {
  const fahrenheit = c * 9/5 + 32;
  return fahrenheit;
}

export function minutesToSeconds(minutes) {
  const seconds = minutes * 60;
  return seconds;
}

export function concatWithSpace(wordA, wordB) {
  const wordsWithSpace = `${wordA} ${wordB}`;
  return wordsWithSpace;
}

export function templateWelcome(name) {
  const welcome = `Willkommen, ${name}!`;
  return welcome;
}

export function lengthOfText(text) {
  const length = text.length;
  return length; 
}

export function numberToText(n) {
  const numbers = String(n);
  return numbers;
}

export function textToNumber(text) {
  const numbers2 = Number(text);
  return numbers2;
}

export function remainderDivision(a, b) {
  const division = a % b;
  return division;
}

export function incrementValue(n) {
  const add1 = n + 1;
  return add1;
}

export function sumOfArray(karl, karl2) {
  let sumOfElements = 0;

  for(let i = 0; i < karl.length; i++) {
    const currentElement = karl[i];
    sumOfElements += currentElement;
  }

  return sumOfElements;
}
