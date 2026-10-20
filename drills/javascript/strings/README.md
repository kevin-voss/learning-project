# Thema: Text (Strings)

## Worum es geht

Ein **String** ist eine Zeichenkette (`"Hallo"`, `'Welt'`). Strings sind in JavaScript **unveränderlich**: Methoden wie `toLowerCase()` geben einen **neuen** String zurück; der alte bleibt gleich.

Häufige Methoden in diesen Aufgaben:

- **`.length`** — Anzahl Zeichen  
- **`.includes(teilstück)`** — kommt das Teilstück vor?  
- **`.startsWith` / `.endsWith`** — Anfang / Ende  
- **`.toLowerCase()` / `.toUpperCase()`** — Groß/Klein  
- **`.trim()`** — Leerzeichen links/rechts weg  
- **`.replaceAll(...)`** oder **`split` + `join`** — Zeichen ersetzen  
- **`.slice(start, end)`** — Ausschnitt  

## Was du in `tasks.js` tun sollst

1. Nutze die passende **String-Methode** (siehe Kommentar bei der Funktion).
2. Gib **immer einen String oder Boolean** zurück, wie die Aufgabe es verlangt.
3. **Palindrome:** Der Text ist in den Tests nur aus **kleinen Buchstaben** ohne Leerzeichen — du vergleichst vorwärts und rückwärts (z. B. Schleife oder Zeichen für Zeichen).

## Was wir erwarten

- **Keine Mutation** des übergebenen Strings: immer Rückgabewert verwenden.
- **`firstThreeChars`:** Wenn der Text kürzer als 3 ist, gib den **ganzen** Text zurück (siehe Tests mit `"ab"`).

## Testen

```bash
make strings
make strings-task-10
```

## Aufgabenliste (Kurzüberblick)

1. Enthält Teilstück  
2. Beginnt mit …  
3. Endet mit …  
4. Kleinschreibung (Kopie)  
5. Großschreibung (Kopie)  
6. Trim  
7. Leerzeichen → Bindestrich  
8. Zeichen zählen  
9. Erste drei Zeichen  
10. Palindrome  
