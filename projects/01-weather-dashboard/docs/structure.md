# Project Structure — Weather Dashboard

Folders and files **you** create. Nothing here exists until you make it.

## Where to run commands

Open your terminal at the repo root, then move into this project:

```bash
cd projects/01-weather-dashboard
pwd
```

`pwd` should end with:

```text
projects/01-weather-dashboard
```

If it does not, stop and `cd` to the right place before creating files.

## Create the folders and files

Run:

```bash
mkdir -p css js assets
touch index.html css/styles.css js/api.js js/ui.js js/app.js
```

Check your work:

```bash
ls
ls css
ls js
```

You should see:

- `index.html` in the project folder
- `styles.css` inside `css/`
- `api.js`, `ui.js`, and `app.js` inside `js/`

## Target layout

```
01-weather-dashboard/
├── index.html              # Page structure: search, results, errors, loading
├── css/
│   └── styles.css          # Layout, colors, responsive rules, spinner
├── js/
│   ├── app.js              # Entry point: events, orchestration
│   ├── api.js              # fetch URLs, parse responses, throw errors
│   └── ui.js               # DOM helpers: display, loading, errors
├── assets/
│   ├── icons/              # Optional local icons
│   └── images/             # Backgrounds, placeholders
├── .gitignore
├── README.md
└── docs/                   # Provided — learning material
```

## What goes where?

Imagine your app is a small team:

- `index.html` is the skeleton. It says what boxes exist on the page.
- `css/styles.css` is the clothing. It makes the boxes look nice.
- `js/api.js` is the messenger. It talks to Open-Meteo.
- `js/ui.js` is the painter. It puts weather data on the page.
- `js/app.js` is the coach. It listens for the form submit and tells the messenger and painter what to do.

## Responsibility split (important)

| File | Responsibility | Should NOT |
|------|----------------|------------|
| `api.js` | HTTP, geocode + forecast URLs | Touch DOM |
| `ui.js` | DOM updates, show/hide loading | Call fetch |
| `app.js` | Wire forms, call api + ui | Huge functions |

This separation makes debugging easier.

Simple example:

- If the city search URL is wrong, look in `api.js`.
- If the temperature appears in the wrong place, look in `ui.js`.
- If clicking Search does nothing, look in `app.js`.

## HTML sections to plan

Sketch on paper before coding:

1. **Header** — app title
2. **Search** — `<form>` + text input + submit button
3. **Loading** — hidden by default
4. **Error** — hidden by default
5. **Current weather** — city, temp, description, humidity, wind, icon
6. **Forecast** — list or grid of upcoming days
7. **Recent searches** — clickable chips or list

Give elements **ids** your JS will use: `search-form`, `search-input`, `loading`, `error`, etc.

Tiny starter idea:

```html
<form id="search-form">
  <label for="search-input">City</label>
  <input id="search-input" type="text" placeholder="London" />
  <button type="submit">Search</button>
</form>
```

The `id` values are like name tags. JavaScript uses them to find the right elements.

## Script loading order

In `index.html`, load scripts at end of `<body>`:

```html
<script src="js/api.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>
```

Or use ES modules (advanced):

```html
<script type="module" src="js/app.js"></script>
```

If using modules, use `export`/`import` — optional for first build.

For a first beginner build, use the three normal script tags. Learn modules later.

## CSS organization suggestions

One file is fine for beginners. Optional sections in `styles.css`:

1. Reset / box-sizing
2. Variables (`:root { --primary: #4f46e5; }`)
3. Layout (container, grid)
4. Components (search, card, forecast item)
5. States (`.loading`, `.error`, `.hidden`)
6. Media queries at bottom

## Weather display

Open-Meteo uses **WMO weather codes** (numbers). Map them to emoji or text in `ui.js` — see [code-reference](./code-reference.md).

Optional: put custom icons in `assets/icons/` instead of emoji.

## Git checkpoints

Suggested first commits:

1. `Add HTML skeleton and folder structure`
2. `Add base CSS layout and search form styles`
3. `Add api.js with Open-Meteo geocoding and forecast`
4. `Wire search form and display results`
5. `Add error handling and loading state`
6. `Add localStorage recent searches`
7. `Add forecast and responsive polish`

## Next

[Step-by-step plan](./step-by-step.md)
