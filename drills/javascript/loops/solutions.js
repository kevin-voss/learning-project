/**
 * JavaScript-Übungen — Thema: Schleifen (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function sumFromOneToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

export function repeatCharacter(ch, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += ch;
  }
  return result;
  // Alternativ: return ch.repeat(count);
}

export function countInString(str, ch) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) {
      count++;
    }
  }
  return count;
}

export function indexOfInArray(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
  // Alternativ: return arr.indexOf(val);
}

export function productFromOneToN(n) {
  let product = 1;
  for (let i = 1; i <= n; i++) {
    product *= i;
  }
  return product;
}

export function sumArrayFor(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

export function reverseStringFor(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

export function countdownArrayFor(n) {
  const result = [];
  for (let i = n; i >= 1; i--) {
    result.push(i);
  }
  return result;
}

export function hasEvenFor(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      return true;
    }
  }
  return false;
}

export function stringOfStars(n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "*";
  }
  return result;
  // Alternativ: return "*".repeat(n);
}
