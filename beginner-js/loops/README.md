# Thema: Schleifen (`for`, `while`)

## Worum es geht

Schleifen **wiederholen** Code, solange eine Bedingung gilt oder für eine feste Anzahl Schritte.

- **`for`** — oft mit Zähler: `for (let i = 0; i < n; i++)`
- **`for...of`** — Elemente einer Liste durchlaufen: `for (const x of arr)`
- **`while`** — solange Bedingung wahr ist

In diesen Aufgaben übst du **Zählen**, **Akkumulieren** (Summe, Produkt, String zusammenbauen) und **Suche** (erster Index).

## Was du in `tasks.js` tun sollst

1. **`reverseStringFor`:** Baue den neuen String z. B. Zeichen für Zeichen — **nicht** `str.split("").reverse().join("")`, wenn du die Schleifen-Übung ernst meinst (die Aufgabenstellung sagt: mit Schleife).
2. **`indexOfInArray`:** Wenn `val` nicht vorkommt, gib **`-1`** zurück (wie `Array.prototype.indexOf`).
3. **`countdownArrayFor`:** Für `n === 0` → `[]`; sonst `[n, n-1, …, 1]`.

## Was wir erwarten

- **`productFromOneToN(0)`** ist per Definition **`1`** (leeres Produkt).
- **`stringOfStars(0)`** ist **`""`**.

## Testen

```bash
make loops
make loops-task-07
```

## Aufgabenliste (Kurzüberblick)

1. Summe 1…n  
2. Zeichen wiederholen  
3. Buchstaben in String zählen  
4. Index in Array (oder -1)  
5. Produkt 1…n  
6. Array-Summe mit Schleife  
7. String umdrehen (Schleife)  
8. Countdown-Array  
9. Enthält eine gerade Zahl?  
10. Stern-Zeichenkette  
