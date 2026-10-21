# Java weather CLI: step by step

> [!PICTURE]
> Messenger first, lunchbox second. You first make sure the messenger comes back at all (HTTP).
> Then you learn to open the lunchbox (JSON).

Do one step, run the command, see the result. Then go on.

## Step 1: Run the starter

1. Copy the whole `starter/` folder to your own place, for example `my-weather/`, and go into it.
2. Run:

```bash
mvn -q compile exec:java -Dexec.args="Berlin"
```

You should see: `Berlin (?): 0.0 °C, wind 0.0 km/h`. The program runs, but it does not ask anybody yet.

> [!NOTE]
> `exec:java` starts `weather.Main` (see the `exec-maven-plugin` in `pom.xml`). `-Dexec.args="Berlin"` becomes `args[0]` in `main`.
> Without `-q`, Maven prints a lot of extra lines. `-q` means quiet.

## Step 2: Send the messenger (HttpClient)

Try the first question in the terminal:

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?count=1&name=Berlin"
```

You should see: one long line of JSON with `"latitude"` and `"longitude"`.

Now do the same in Java:

```java
HttpRequest request = HttpRequest.newBuilder(URI.create(url)).GET().build();
HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());
int status = response.statusCode();   // 200 means OK
String body = response.body();        // the JSON text
```

1. Fill in `get(String url)` in `WeatherClient`. Throw an `IOException` when the status is not 200.
2. For a moment, add `System.out.println(json);` as the first line of `parsePlace`.
3. Run with `Berlin` again.

You should see: the same JSON as with `curl`. Then remove the print line.

## Step 3: Open the lunchbox (Jackson)

`pom.xml` already lists Jackson as a dependency. Maven downloaded it for you.
Jackson turns JSON text into a tree of `JsonNode`s. You walk the tree by name.

```java
JsonNode root = JSON.readTree(json);
JsonNode results = root.path("results");   // the list [ ... ]
JsonNode first = results.get(0);            // the first place in it
String name = first.path("name").asText();  // "Berlin"
double lat = first.path("latitude").asDouble();
```

1. Write `parsePlace`. If `results.isEmpty()`, throw an `IllegalArgumentException` with the "No place called ..." sentence.
2. Run `mvn test`.

You should see: 2 of the 3 tests pass. `parseWeatherReadsTemperatureAndWind` still fails.

> [!NOTE]
> `path("x")` never returns null. A missing key gives an empty node. That is why it is safer than `get("x")` for beginners.

## Step 4: Read the weather

The forecast answer looks like `{"current":{"temperature_2m":13.3,"wind_speed_10m":7.9}}`.

1. Write `parseWeather`. Read `current`, then the two numbers inside it.
2. If `current` has no `temperature_2m`, throw an `IOException`.
3. Run `mvn test`.

You should see: `Tests run: 3, Failures: 0` and `BUILD SUCCESS`.

## Step 5: The second request

1. Write `currentWeather(Place place)`. The URL is `FORECAST_URL + "&latitude=" + ... + "&longitude=" + ...`.
2. Return `parseWeather(get(url))`.
3. Run it:

```bash
mvn -q compile exec:java -Dexec.args="Berlin"
mvn -q compile exec:java -Dexec.args="New York"
mvn -q compile exec:java -Dexec.args="Qwxyzzz"
```

You should see: two weather lines with real numbers, then `No place called "Qwxyzzz" was found.`

> [!NOTE]
> `URLEncoder.encode("New York", UTF_8)` gives `New+York`. A space is not allowed inside a URL.

## Step 6: When things go wrong

1. Turn off your Wi-Fi and run with `Berlin`.
2. Read what `Main` does with an `IOException`.

You should see: `Could not get the weather: ...` and no stack trace.

> [!TRY]
> Change `GEOCODING_URL` for a moment so the path ends in `/v1/searchX`. Run it.
> You should see: `Could not get the weather: Open-Meteo answered with status 404`. Then change it back.

> [!CHECK]
> 1. Which part of the program talks to the network, and which part only reads text?
>    <details><summary>Answer</summary><code>get</code>, <code>findPlace</code> and <code>currentWeather</code> use the network. <code>parsePlace</code> and <code>parseWeather</code> only read a String. That is why the tests can test them without internet.</details>
> 2. What does Maven do with the Jackson lines in <code>pom.xml</code>?
>    <details><summary>Answer</summary>It downloads the Jackson library once, keeps it in <code>~/.m2</code>, and puts it on the classpath when it compiles and runs your code.</details>

Stuck? Compare with the [solution](solution/src/main/java/weather/WeatherClient.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
