/**
 * JavaScript-Übungen — Thema: Verzweigungen (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
 */

export function signOf(n) {
  if (n < 0) return -1;
  if (n > 0) return 1;
  return 0;
  // Alternativ: return Math.sign(n);
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
  // Alternativ: if (score >= 50) return true; else return false;
}

export function temperatureFeel(celsius) {
  if (celsius < 10) {
    return "kalt";
  } else if (celsius < 22) {
    return "angenehm";
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
  // Alternativ: return (a && !b) || (!a && b);
}

export function gradeLetter(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "D";
}
