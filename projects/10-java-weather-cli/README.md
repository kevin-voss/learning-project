# Project 10: Java weather CLI

> [!PICTURE]
> You send a messenger on a bike with a letter: "Where is Berlin?" He comes back with a lunchbox full of labelled notes (JSON).
> You send him again: "How warm is it at 52.5, 13.4?" Another lunchbox. You take out one note: `13.3`.
> `HttpClient` is the messenger. **Jackson** opens the lunchbox for you.

Same weather as your browser dashboard in [Project 4](../04-weather-dashboard/README.md), now in the terminal with Java.

## What you build

```text
$ mvn -q compile exec:java -Dexec.args="Berlin"
Berlin (Germany): 13.3 °C, wind 7.9 km/h

$ mvn -q compile exec:java -Dexec.args="Qwxyzzz"
No place called "Qwxyzzz" was found.
```

Your numbers differ: it is the weather right now. The free [Open-Meteo](https://open-meteo.com/en/docs) service needs no account and no key.

Two questions, one after the other:

```text
1. https://geocoding-api.open-meteo.com/v1/search?count=1&name=Berlin
   -> {"results":[{"name":"Berlin","country":"Germany","latitude":52.52,"longitude":13.41, ...}]}
2. https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m&latitude=52.52&longitude=13.41
   -> {"current":{"temperature_2m":13.3,"wind_speed_10m":7.9, ...}, ...}
```

A Maven project with these files:

```text
pom.xml                          Java 21, Jackson, JUnit
src/main/java/weather/
  Main.java                      reads the city from args, prints the line (ready)
  Place.java                     name, country, latitude, longitude (ready)
  Weather.java                   temperature and wind (ready)
  WeatherClient.java             the HTTP requests and the JSON reading (your work)
src/test/java/weather/
  WeatherClientTest.java         3 tests with saved JSON, no internet needed
```

## What you need to know

- [REST and HTTP methods](../../tracks/java/topics/rest-and-http/index.html): GET, status codes like 200 and 404.
- [HTTP requests and responses](../../tracks/computer-science/index.html#http-requests-responses).
- [Build tools: Maven](../../tracks/java/topics/build-tools/index.html): a library (a "dependency") in `pom.xml`.
- [Testing with JUnit](../../tracks/java/topics/testing/index.html) and the Maven layout from [Project 9](../09-household-budget/README.md).

New: `java.net.http.HttpClient` for web requests, and the Jackson library to read JSON.

## Rules

- The city comes from the command line. No city prints a short "Usage" line.
- A city with a space (`New York`) works.
- An unknown city prints a clear sentence, not a stack trace.
- A status other than 200, or no internet, prints `Could not get the weather: ...`.
- No searching inside the JSON text with `indexOf`. Jackson reads it.

## Done when

- [ ] `mvn test` passes all 3 tests.
- [ ] Berlin, `New York` and your own town print a temperature and wind.
- [ ] `Qwxyzzz` prints `No place called "Qwxyzzz" was found.`
- [ ] No city prints the usage line.
- [ ] With Wi-Fi off, you get one friendly line.

**Extra:** also ask for `relative_humidity_2m` and print it. Add a test for it first.

## Files

- [step-by-step.md](step-by-step.md): build it in small steps.
- [starter/pom.xml](starter/pom.xml): the project with `TODO` comments in `WeatherClient.java`, and 3 tests that fail until you are done.
- [solution/pom.xml](solution/pom.xml): one finished answer, see [WeatherClient.java](solution/src/main/java/weather/WeatherClient.java).

> [!CHECK]
> 1. Why are there two requests, not one?
>    <details><summary>Answer</summary>The forecast service wants coordinates, not a name. Geocoding turns the name into latitude and longitude first.</details>
> 2. Why do the tests use saved JSON instead of the real service?
>    <details><summary>Answer</summary>The real weather changes every hour, and the internet can be off. Saved JSON always gives the same answer, so a test only fails when your code is wrong.</details>
> 3. What does <code>path("results")</code> give when there is no "results" key?
>    <details><summary>Answer</summary>An empty "missing" node, not null. <code>isEmpty()</code> is true, so you can print "not found" without a crash.</details>

**Next:** [How a Java server is structured](../../sheets/java/server-layers.md), then Postgres and the [Parcel database](../11-parcel-database/README.md).
