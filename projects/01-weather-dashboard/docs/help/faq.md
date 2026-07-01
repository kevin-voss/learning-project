# FAQ — Weather Dashboard

## Setup

### Do I need an account or API key?

**No.** This project uses [Open-Meteo](https://open-meteo.com/) — free, public, no signup.

### Do I need Node.js?

**No** for Project 1. You need a local server (Live Server or `npx serve .`) so `fetch` works. Node is for Projects 3–4.

### Why can't I double-click `index.html`?

Browsers block `fetch()` from `file://` URLs. Serve over `http://localhost`.

---

## API & Open-Meteo

### Why two API calls?

1. **Geocoding** — turn "London" into latitude/longitude  
2. **Forecast** — get weather for those coordinates  

Real apps often chain APIs like this.

### How many requests can I make?

Open-Meteo is generous for learning. Don't spam requests in a loop. If rate-limited, you'll see errors — wait and retry.

### Can I use a different API?

Yes, but docs and examples use Open-Meteo. Other no-key options: [wttr.in](https://wttr.in/:help) (simpler, less structured).

---

## JavaScript

### `.then()` vs `async/await`?

Same idea — `async/await` is easier to read for chained fetches.

### Why `event.preventDefault()` on the form?

Stops the page from reloading on submit.

### What is `try/catch` for?

Network and "city not found" errors — show a friendly message instead of breaking silently.

---

## Git & deployment

### Anything secret to hide on GitHub Pages?

**No API keys** for this project. Safe to deploy as-is. You'll learn API keys in Project 3 with other patterns.

---

## Still stuck?

[Troubleshooting](./troubleshooting.md) · [Glossary](./glossary.md) · [Open-Meteo docs](https://open-meteo.com/en/docs)
