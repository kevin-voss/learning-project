# Thema: Verzweigungen (`if` / `else`)

## Worum es geht

Programme entscheiden anhand von **Bedingungen**, welcher Code läuft:

- **Vergleiche:** `===`, `!==`, `<`, `>`, `<=`, `>=`
- **`if` / `else if` / `else`** — verschiedene Fälle
- **Booleans:** `true` / `false`; Kombination mit `&&`, `||`, `!`

Manche Aufgaben sagen **bewusst**: „ohne `Math.max`“ — dann löst du es nur mit Vergleichen und Verzweigungen.

## Was du in `tasks.js` tun sollst

1. Überlege für jede Funktion: **welche Fälle** gibt es (negativ / null / positiv; verschiedene Altersstufen; …)?
2. Gib **exakt** die geforderten Strings oder Zahlen zurück (z. B. `"kalt"`, nicht `"Kalt"`).
3. **`isLeapYear`:** Klassische Regeln — durch 4, außer Jahrhundert außer durch 400. Die Tests decken typische Jahre ab.

## Was wir erwarten

- **`signOf`:** nur `-1`, `0` oder `1`.
- **`exactlyOneTrue`:** genau dann `true`, wenn **eine** der beiden Variablen `true` ist (XOR-Logik).
- **`gradeLetter`:** Grenzen wie beschrieben (`>= 90` → `"A"`, usw.).

## Testen

```bash
make conditionals
make conditionals-task-06
```

## Aufgabenliste (Kurzüberblick)

1. Vorzeichen  
2. Maximum zweier Zahlen (ohne `Math.max`)  
3. Bestanden ab 50 Punkten  
4. Temperaturgefühl (`"kalt"` / `"angenehm"` / `"warm"`)  
5. Ticketpreis nach Alter  
6. Schaltjahr  
7. Betrag ohne `Math.abs`  
8. Minimum zweier Zahlen (ohne `Math.min`)  
9. Genau eine wahr (XOR)  
10. Notenbuchstabe  
