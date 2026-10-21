# Project Structure — Java Weather CLI

Folders and files **you** create. Guides live in `docs/`; your Java source does not get committed as a finished solution from this repo.

## Where to run commands

```bash
cd projects/10-java-weather-cli
pwd
```

`pwd` should end with `projects/10-java-weather-cli`.

## Two simple layouts (pick one)

### Option A — single file (fastest for beginners)

```text
05-java-weather-cli/
├── WeatherCli.java       # main + HTTP + print
├── .gitignore
├── README.md
└── docs/
```

Compile and run from this folder:

```bash
javac WeatherCli.java
java WeatherCli London
```

### Option B — small package (closer to “real” Java)

```text
05-java-weather-cli/
├── src/
│   └── com/
│       └── learning/
│           └── weather/
│               └── WeatherCli.java
├── .gitignore
├── README.md
└── docs/
```

In the file: `package com.learning.weather;`

Compile and run (from project root):

```bash
mkdir -p out
javac -d out src/com/learning/weather/WeatherCli.java
java -cp out com.learning.weather.WeatherCli London
```

Either option is fine. Prefer **A** if packages confuse you; switch to **B** when you want practice with folders matching package names.

## What the program is responsible for

Imagine three toy jobs (they can live in one class at first):

1. **Reader** — take a city name from `args[0]`
2. **Messenger** — HTTP GET to Open-Meteo (geocode, then forecast)
3. **Speaker** — `System.out.println` the temperature

Later you *may* split into more classes. Not required for this small project.

## Suggested Open-Meteo URLs

Geocoding (city → latitude / longitude):

```text
https://geocoding-api.open-meteo.com/v1/search?name=CITY&count=1
```

Forecast (coordinates → current temperature):

```text
https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m
```

No API key. Be polite — do not loop requests forever while testing.

## JSON: library or manual?

For this beginner project, either is OK:

- **Library** (e.g. org.json) if you already use Maven/Gradle and want clear field access
- **Manual** — find one field in the response string (or a tiny regex) just to print temperature

Prefer **`java.net.http.HttpClient`** for the HTTP part either way. Avoid copying a huge finished program; keep parsing as small as you can.

## Next

[Step-by-step plan](./step-by-step.md)
