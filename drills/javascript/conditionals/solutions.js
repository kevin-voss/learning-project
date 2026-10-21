/**
 * JavaScript drill: if / else (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
 */

export function signOf(n) {
  if (n < 0) {
    return -1;
  } else if (n > 0) {
    return 1;
  } else {
    return 0;
  }
}

export function maxOfTwo(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

export function isPassing(score) {
  return score >= 50;
  // Long version: if (score >= 50) { return true; } else { return false; }
}

export function temperatureFeel(celsius) {
  if (celsius < 10) {
    return "cold";
  } else if (celsius < 22) {
    return "nice";
  } else {
    return "warm";
  }
}

export function ticketPrice(age) {
  if (age < 6) {
    return 0;
  } else if (age < 18) {
    return 8;
  } else {
    return 15;
  }
}

export function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

export function absoluteNoMath(n) {
  if (n < 0) {
    return -n;
  }
  return n;
}

export function minOfTwo(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}

export function exactlyOneTrue(a, b) {
  return a !== b;
  // With and/or/not: return (a && !b) || (!a && b);
}

export function gradeLetter(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "D";
}
