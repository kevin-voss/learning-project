# Thema: Objekte

## Worum es geht

Ein **Objekt** bündelt benannte Eigenschaften:

```javascript
const person = { firstName: "Ada", lastName: "Lovelace", age: 36 };
person.firstName; // "Ada"
person["age"];    // 36
```

- **`Object.keys(obj)`** — Liste der Schlüssel  
- **`Object.values(obj)`** — Liste der Werte  
- **`key in obj`** oder **`Object.hasOwn`** — Eigenschaft vorhanden?  

Oft erstellst du **Kopien** mit veränderten Feldern (Spread):

```javascript
const next = { ...person, age: person.age + 1 };
```

So bleibt `person` unverändert — das erwarten mehrere Tests.

## Was du in `tasks.js` tun sollst

1. **`bumpPatchVersion`:** Neues Objekt zurückgeben; das übergebene `version`-Objekt **nicht** mutieren.
2. **`incrementPersonAge`:** Ebenfalls neues Objekt; Original-Person unverändert lassen.
3. **`sumCartTotal`:** Für jedes Element `price * qty` addieren; leeres Array → `0`.
4. **`listSortedKeys`:** Keys **sortieren**, mit **Komma** verbinden (ohne Leerzeichen), z. B. `"a,b"`.

## Was wir erwarten

- Zugriff auf verschachtelte Daten über **Punktschreibweise** oder Klammern, wo es passt.
- **`addCoords`:** Neues Objekt `{ x: ..., y: ... }`, keine Mutation von `a` oder `b`.

## Testen

```bash
make objects
make objects-task-08
```

## Aufgabenliste (Kurzüberblick)

1. Vollständiger Name aus Person  
2. Patch-Version erhöhen (neues Objekt)  
3. Anzahl Keys  
4. Key vorhanden?  
5. Titel und Autor als Text  
6. Punkt `{ x, y }` erzeugen  
7. Alter +1 (neues Objekt)  
8. Warenkorb-Summe  
9. Sortierte Keys als String  
10. Zwei Punkte addieren  
