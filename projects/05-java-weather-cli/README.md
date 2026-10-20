# Project 05: Java Weather CLI

**Same weather idea as the browser dashboard — but in the terminal with Java.**

Build a small command-line program that asks Open-Meteo for a city, then prints the temperature. No API key. No Spring yet.

## Status

This folder is **guides only**. You write every `.java` file yourself.

## Where this sits

[Learning path — Phase 4 (Java)](../../docs/LEARNING_PATH.md#phase-4--java-main-focus)

Same public API as [01-weather-dashboard](../01-weather-dashboard/) — city → coordinates → forecast — only now with `HttpClient` instead of browser `fetch`.

## Prerequisites

1. [Java sheet](../docs/java/README.md) — class / object / `main` in toy words
2. [Java hub](../../tracks/java/) through **basics** (getting started → classes/objects is enough to start; keep going as needed)
3. Hub topic **REST & HTTP** — [`tracks/java/topics/rest-and-http/`](../../tracks/java/topics/rest-and-http/)
4. **Ubuntu + Java 21** — follow the hub setup:

```bash
sudo apt update
sudo apt install openjdk-21-jdk
java --version
javac --version
```

Both should report `21.x`. Details: [tracks/java/README.md](../../tracks/java/README.md).

Optional but helpful: finished [01-weather-dashboard](../01-weather-dashboard/) so geocoding + forecast already feel familiar.

## Project goal

By the end, something like this works in the terminal:

```text
$ java WeatherCli London
London: 15.2°C
```

(Your class name and args style can differ — see [structure.md](./docs/structure.md).)

**Time estimate:** about 3–5 hours

## Read this order

| Doc | Read when |
|-----|-----------|
| [Project structure](./docs/structure.md) | First — packages and files you will create |
| [Step-by-step plan](./docs/step-by-step.md) | **Main build guide** |

## First terminal commands

From the repo root (Ubuntu terminal):

```bash
cd projects/05-java-weather-cli
pwd
mkdir -p src
# pick one layout from structure.md, then create your .java file(s)
```

## Learning goals

When finished, you can explain:

- Why Java needs `javac` then `java` (bake, then eat)
- How `java.net.http.HttpClient` does an HTTP GET
- Why weather needs two steps (city name → lat/lon → temperature)
- One way to pull a number out of a JSON string (library **or** a careful manual parse)

## Quick start

1. Confirm `java` / `javac` are 21.x.
2. Open [structure.md](./docs/structure.md) and create your source file(s).
3. Follow [step-by-step.md](./docs/step-by-step.md) phase by phase.

## Resources

- [Open-Meteo docs](https://open-meteo.com/en/docs) (no signup)
- [HttpClient (Java SE)](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html)
- Geocoding test:

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?name=London&count=1"
```

## Next

Keep going in [tracks/java](../../tracks/java/) (collections, exceptions, build tools), then later Spring path projects in the learning spine.
