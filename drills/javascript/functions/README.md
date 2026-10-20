# Thema: Funktionen

## Worum es geht

Eine **Funktion** bündelt Logik unter einem Namen, nimmt **Parameter** entgegen und gibt (mit `return`) ein **Ergebnis** zurück. Vorteile: weniger Duplikat, klarere Struktur, einfacher zu testen.

In JavaScript:

```javascript
function add(a, b) {
  return a + b;
}
```

Parameter können **optional** sein: `function greet(name)` — wenn der Aufrufer nichts übergibt, ist `name` `undefined` (siehe Aufgabe `greetOrDefault`).

## Was du in `tasks.js` tun sollst

1. Jede Aufgabe ist eine **eigene** exportierte Funktion — halte sie kurz und lesbar.
2. **`formatEuro`:** Immer **zwei Nachkommastellen** und das Suffix **` €`** (siehe Test mit `12.5` → `"12.50 €"`). Tipp: `toFixed(2)`.
3. **`safeDivideNums`:** Bei Division durch **`0`** exakt **`null`** zurückgeben.
4. **`middleValue`:** Der **mittlere** Wert von drei Zahlen (Median), nicht der Durchschnitt.

## Was wir erwarten

- Überall ein **`return`** mit dem richtigen Typ (Zahl, String, Boolean, `null`).
- **`hypotenuseNumber`:** Satz des Pythagoras, `Math.sqrt` ist erlaubt.

## Testen

```bash
make functions
make functions-task-05
```

## Aufgabenliste (Kurzüberblick)

1. Quadrat  
2. Kubus  
3. Hypotenuse  
4. Begrüßung mit Standardnamen  
5. Euro-Betrag formatieren  
6. Text länger als n?  
7. Sichere Division  
8. `charCodeAt` erstes Zeichen  
9. Zwei Teile verketten  
10. Median von drei Zahlen  
