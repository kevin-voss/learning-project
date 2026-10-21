/**
 * JavaScript drill: loops (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
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
  // Built-in shortcut: return ch.repeat(count);
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

export function productFromOneToN(n) {
  let product = 1;
  for (let i = 1; i <= n; i++) {
    product *= i;
  }
  return product;
}

export function reverseStringFor(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

export function stringOfStars(n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "*";
  }
  return result;
}

export function isPalindromeText(text) {
  let backwards = "";
  for (let i = text.length - 1; i >= 0; i--) {
    backwards += text[i];
  }
  return backwards === text;
}

export function sumOfEvensUpToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
}

export function firstIndexOfChar(str, ch) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) {
      return i;
    }
  }
  return -1;
  // Built-in shortcut: return str.indexOf(ch);
}

export function countDigits(n) {
  let digits = 1;
  let rest = n;
  while (rest >= 10) {
    rest = Math.floor(rest / 10);
    digits++;
  }
  return digits;
}
