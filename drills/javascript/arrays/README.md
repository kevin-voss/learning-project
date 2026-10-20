# Thema: Arrays (Listen)

## Worum es geht

Ein **Array** ist eine geordnete Liste von Werten: `[1, 2, 3]`. Zugriff mit Index: `arr[0]` ist das erste Element, `arr[arr.length - 1]` das letzte. **Länge:** `arr.length`.

Viele Aufgaben hier üben:

- **Durchlaufen** mit `for` oder `for...of`
- **Neue Arrays bilden**, ohne das Original zu verändern (Kopie / neues Array)
- **Randfälle:** leeres Array → Summe `0`, Maximum oft `null`, etc.

## Was du in `tasks.js` tun sollst

1. Lies pro Funktion, ob du ein **neues Array** zurückgeben musst (`doubleAll`, `mergeArrays`, `reversedCopy`) — dann darfst du das Eingabe-Array **nicht** „in place“ zerstören.
2. **`range(n)`:** Für `n === 0` ein **leeres** Array `[]`; sonst `[1, 2, …, n]`.
3. **`firstOrNull` / `lastOrNull`:** Bei leerem Array **`null`** zurückgeben (nicht `undefined`, es sei denn die Tests erlauben es — hier erwarten wir `null`).

## Was wir erwarten

- Stabile Rückgaben genau wie in `tasks.test.js`.
- **`mergeArrays`:** `a` und `b` unverändert lassen; Ergebnis z. B. mit Spread: `[...a, ...b]`.

## Testen

```bash
make arrays
make arrays-task-01
```

## Aufgabenliste (Kurzüberblick)

1. Summe aller Zahlen  
2. Durchschnitt  
3. Maximum (oder `null`)  
4. Vorkommen zählen  
5. Alle Werte verdoppeln (neues Array)  
6. Erstes Element oder `null`  
7. Letztes Element oder `null`  
8. `range(n)`  
9. Zwei Arrays verketten  
10. Umgekehrtes Kopie-Array  
