# Thema: Mathe mit `Math`

## Worum es geht

JavaScript liefert mit **`Math`** viele fertige Helfer: abrunden, aufrunden, Betrag, Minimum, Maximum, Potenzen, Wurzel, … Statt selbst komplizierte Formeln zu bauen, nutzt du diese Funktionen — außer eine Aufgabe sagt ausdrücklich „ohne `Math.max`“ o. Ä.

Wichtige Bausteine:

- **`Math.floor(x)`** — Abrunden zur nächsten ganzen Zahl nach unten  
- **`Math.ceil(x)`** — Aufrunden nach oben  
- **`Math.abs(x)`** — Betrag (ohne Vorzeichen)  
- **`Math.max(a, b, …)`** / **`Math.min(...)`** — größter / kleinster Wert  
- **`Math.pow(a, b)`** oder **`a ** b`** — Potenz  

## Was du in `tasks.js` tun sollst

1. Jede Funktion soll einen **klaren Zahlenwert** zurückgeben (oder bei Prozent eine Dezimalzahl wie `12.5`).
2. Lies die **Beispiele** in den Kommentaren: sie zeigen typische Ein- und Ausgaben.
3. Bei **Fakultät**: `0! = 1` ist vereinbart; für `n > 0` multiplizierst du `1 * 2 * … * n`.

## Was wir erwarten

- **Rundungen** wie in den Tests (z. B. zwei Nachkommastellen bei `roundTwoDecimals`).
- **`percentage(part, whole)`**: `part / whole * 100`; im Test ist `whole` nie `0`.
- **`clampValue`**: Werte unter `min` werden zu `min`, über `max` zu `max`, dazwischen unverändert.

## Testen

```bash
make math
make math-task-08
```

## Aufgabenliste (Kurzüberblick)

1. Abrunden (`floor`)  
2. Aufrunden (`ceil`)  
3. Betrag (`abs`)  
4. Potenz  
5. Maximum zweier Zahlen  
6. Minimum dreier Zahlen  
7. Clamp (eingrenzen)  
8. Fakultät  
9. Auf zwei Dezimalstellen runden  
10. Prozentanteil  
