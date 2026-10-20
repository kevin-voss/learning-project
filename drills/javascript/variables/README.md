# Thema: Variablen (`let`, `const`)

## Worum es geht

Variablen sind **benannte Speicherplätze** für Werte (Zahlen, Text, …). In modernem JavaScript nutzt du fast immer **`const`** oder **`let`** — **`var`** ist veraltet für neuen Code.

### `const` („konstante“ Bindung)

- Die **Variable** darf **nicht neu zugewiesen** werden (`const x = 1; x = 2` → Fehler).
- Der **Inhalt** eines Objekts oder Arrays *kann* sich trotzdem ändern — `const` sichert nur die **Bindung** des Namens, nicht „Unveränderlichkeit“ aller Daten.
- **Standardwahl:** Wenn du keinen guten Grund hast, neu zuzuweisen, nimm `const`.

```javascript
const width = 4;
const height = 5;
const area = width * height; // 20
```

### `let` (veränderbare Bindung)

- Du darfst den Wert **später ändern** (z. B. in einer Schleife oder nach einer Berechnung in mehreren Schritten).

```javascript
let sum = 0;
sum = sum + 3;
```

### Typen (kurz)

JavaScript hat **dynamische Typen**: Eine Variable „hat“ keinen festen Typ, aber jeder **Wert** hat einen Typ (`number`, `string`, …). Für diese Aufgaben reicht: Zahlen rechnen, Text mit `+` oder **Template-Strings** `` `Hallo, ${name}` `` verbinden.

## Was du in `tasks.js` tun sollst

1. Lies jede **Aufgabenbeschreibung und das Beispiel** im Kommentar über der Funktion.
2. Implementiere die Funktion so, dass sie **genau das zurückgibt**, was die Aufgabe verlangt (Rückgabewert ist wichtig — `console.log` allein reicht nicht).
3. Nutze im Funktionskörper ruhig **`const`** für Zwischenergebnisse (gute Übung).

## Was wir erwarten

- **Richtige Rückgabewerte** für alle Tests (siehe `tasks.test.js`).
- Keine Seiteneffekte, wo es nicht verlangt ist (z. B. Parameter nicht „aus Versehen“ überschreiben).
- Bei **Aufgabe 10** (`incrementValue`): Die übergebene Zahl `n` soll **unverändert bleiben**; du gibst nur `n + 1` zurück.

## Testen

```bash
make variables
make variables-task-05
```

## Aufgabenliste (Kurzüberblick)

1. Rechteckfläche  
2. Celsius → Fahrenheit  
3. Minuten → Sekunden  
4. Zwei Wörter mit Leerzeichen  
5. Begrüßung mit Template-String  
6. Textlänge  
7. Zahl → String  
8. String → Zahl  
9. Rest bei Division (`%`)  
10. Wert um 1 erhöhen (ohne `n` zu mutieren)  
