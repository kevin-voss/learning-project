# Step-by-Step — Static About-Me Page

Follow phases in order. Each phase has **Goal → Why → Do → Checkpoint**.

**Big picture:** [Learning path — Phase 2](../../../docs/LEARNING_PATH.md#phase-2--html--css-sheets--tiny-site)

**Sheets:** [HTML](../../docs/html/README.md) · [CSS](../../docs/css/README.md)

## How to use this guide

Do not rush. If a checkpoint fails, fix that before the next phase.

---

## Phase 1: HTML skeleton (≈45–90 min)

**Learn:** [HTML sheet](../../docs/html/README.md)

**Goal:** A real page that shows your name and a short bio — even if it looks plain.

**Why:** HTML is the skeleton. Paint (CSS) comes after bones exist.

**Do:**

```bash
cd projects/00-static-page
pwd
mkdir -p css
touch index.html css/styles.css
```

In `index.html`:

- [ ] Add `<!DOCTYPE html>` and `<html lang="en">`
- [ ] In `<head>`: charset, a `<title>`, and (optional for now) leave CSS for Phase 2
- [ ] In `<body>`: an `<h1>` with your name
- [ ] One or two `<p>` tags about you
- [ ] At least one `<a href="...">` link
- [ ] Open the file in a browser and check the tab title

Tiny shape (fill in your own words):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>About Me</title>
  </head>
  <body>
    <h1>Your Name</h1>
    <p>A short sentence about you.</p>
    <a href="https://example.com">A link</a>
  </body>
</html>
```

**Checkpoint:** Browser shows your heading and paragraph. No CSS required yet. The page can look boring — that is fine.

---

## Phase 2: CSS link + flex card (≈45–90 min)

**Learn:** [CSS sheet](../../docs/css/README.md) — especially linking CSS and flex ideas

**Goal:** The bio sits in a centered card that looks intentional.

**Why:** Flexbox is like lining toys on a shelf and pushing the shelf to the middle of the room.

**Do:**

In `index.html` `<head>`:

- [ ] Add `<link rel="stylesheet" href="css/styles.css">`
- [ ] Wrap your content in a container if you want, e.g. `<main class="card">...</main>`

In `css/styles.css`:

- [ ] Set a background color on `body`
- [ ] Style `.card` (or your main box): padding, max-width, background, maybe border-radius
- [ ] Use flex on `body` (or a full-page wrapper): center the card horizontally and vertically
  - Hint ideas: `display: flex`, `min-height: 100vh`, `justify-content: center`, `align-items: center`
- [ ] Refresh the browser — hard refresh if styles look stuck (`Cmd+Shift+R` / `Ctrl+Shift+R`)

**Checkpoint:** Content sits in a clear card near the middle of the page. Changing a color in CSS changes what you see after refresh.

---

## Phase 3: One media query (≈30–60 min)

**Goal:** On a narrow window, the page still feels comfortable (not cramped or overflowing).

**Why:** Phones are small. A media query is a rule that says “if the screen is this skinny, use these styles instead.”

**Do:**

- [ ] At the bottom of `styles.css`, add one `@media` block (e.g. `max-width: 600px`)
- [ ] Inside it, change something visible: smaller padding, smaller `h1`, or full-width card with less side margin
- [ ] Resize the browser window (or use DevTools device mode) and watch the change

Example shape (use your own numbers):

```css
@media (max-width: 600px) {
  .card {
    margin: 1rem;
    padding: 1rem;
  }
}
```

**Checkpoint:** Wide window = your desktop look. Narrow window = your media-query look. You can point to the `@media` rule and say what it changes.

---

## Done

You finished Phase 2 of the learning path for HTML/CSS. Next up in the spine: JavaScript drills, then [01-weather-dashboard](../../01-weather-dashboard/).
