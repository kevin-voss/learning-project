# Step-by-Step — Java Weather CLI

Follow phases in order. Each phase has **Goal → Why → Do → Checkpoint**.

**Big picture:** [Learning path — Phase 4](../../../docs/LEARNING_PATH.md#phase-4--java-main-focus)

**Sheets / hub:** [Java sheet](../../docs/java/README.md) · [Java hub](../../../tracks/java/) · [REST & HTTP](../../../tracks/java/topics/rest-and-http/)

**API:** [Open-Meteo](https://open-meteo.com/) — no account, no API key. Same idea as the browser weather project.

## Toy words (keep these in your head)

| Java idea | Toy picture |
|-----------|-------------|
| Class | Cookie cutter |
| Object | One cookie |
| `main` | Front door — program starts here |
| `HttpClient` | A messenger bike that fetches a letter (HTTP response) |
| JSON | A labeled lunchbox of data from the server |

---

## Phase 1: Hello `main` (≈30–60 min)

**Goal:** A Java program that prints a greeting and reads a city from the command line.

**Why:** If `main` and `args` work, every later piece has a place to plug in.

**Do:**

- [ ] Confirm Ubuntu Java 21: `java --version` and `javac --version` show `21`
- [ ] Create your file (`WeatherCli.java` or package path from [structure.md](./structure.md))
- [ ] Add `public static void main(String[] args)`
- [ ] If `args.length < 1`, print a short usage message and exit
- [ ] Otherwise print something like `Hello, weather for CITY` using `args[0]`
- [ ] Compile and run:

```bash
# Option A example
javac WeatherCli.java
java WeatherCli London
```

**Checkpoint:** Running with a city prints that city name. Running with no args shows a friendly usage line. No internet calls yet.

---

## Phase 2: HttpClient GET geocoding (≈60–90 min)

**Goal:** Your program asks Open-Meteo “where is this city?” and prints the raw response body (or at least latitude/longitude).

**Why:** Weather needs coordinates. Geocoding turns a name into numbers on the map — like asking “which shelf is London on?”

**Do:**

- [ ] Skim [REST & HTTP](../../../tracks/java/topics/rest-and-http/) if HTTP verbs / status codes feel fuzzy
- [ ] Build a URL with the city name (use URI encoding for spaces, e.g. `New%20York`)
- [ ] Use `java.net.http.HttpClient`, `HttpRequest`, `HttpResponse`
- [ ] Send a **GET** to:

```text
https://geocoding-api.open-meteo.com/v1/search?name=CITY&count=1
```

- [ ] Print `statusCode()` and the response body string
- [ ] Optional: test the same URL with `curl` in another terminal first

**Checkpoint:** For `London` (or another city), you see JSON that includes something like `"latitude"` and `"longitude"`. A bad city name may return empty `results` — notice that without crashing silently.

---

## Phase 3: Parse JSON simply + forecast temp (≈60–120 min)

**Goal:** Print one clear line: city and current temperature.

**Why:** The messenger brought a lunchbox (JSON). You only need one snack: `temperature_2m`.

**Do:**

1. **Pull lat/lon** from the geocoding JSON  
   - Beginner-friendly options:
     - A small JSON library (e.g. org.json) **or**
     - Manual parse of one field (careful string search / simple regex) — OK for learning, not for huge APIs later
2. **Second GET** to the forecast API:

```text
https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m
```

3. **Read** `current.temperature_2m` (or the matching place in the JSON)
4. **Print** a friendly line, e.g. `London: 15.2°C`
5. Handle empty geocode results with a clear message

Prefer keeping HTTP on `HttpClient`. Do not paste a whole finished app from the internet — write the steps yourself.

**Checkpoint:**

- [ ] `java … London` prints a temperature number
- [ ] A nonsense city prints an error you understand
- [ ] You can say out loud: geocode first, forecast second

---

## Done

You applied Java + HTTP to the same Open-Meteo flow as the browser project. Next: keep following [tracks/java](../../../tracks/java/) (exceptions, collections, build tools), then later Spring projects on the learning path.
