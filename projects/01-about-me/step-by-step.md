# Project 1: step by step

Build your About-me page in six small steps. Finish each step before you start the next one.

> [!PICTURE]
> First the bones, then the paint. You build the skeleton of the page in HTML (steps 1–3). Then you paint it with CSS (steps 4–6).

**Sheets:** [HTML](../../sheets/html/README.md) · [CSS](../../sheets/css/README.md) · **Brief:** [README](README.md)

## Step 0: open your desk

Your code goes in `starter/`. From the repo root:

```bash
cd projects/01-about-me/starter
ls
```

You should see `index.html` and `style.css`. Open the folder in your editor. Open `index.html` in the browser (double-click it). Keep both windows open: save in the editor, then refresh the browser.

## Step 1: the title

Find `TODO 1` in `index.html`. Write your name inside `<title>`.

```html
<title>About Me · Sam</title>
```

You should see your name on the browser tab.

## Step 2: heading and bio

Find `TODO 2`. Add a `<main class="card">` box. Inside it, add an `<h1>` with your name and one or two `<p>` about you.

```html
<main class="card">
  <h1>Sam Rivera</h1>
  <p>I live in Berlin and I like bikes.</p>
</main>
```

You should see a big heading and a short text. It looks plain. That is fine.

## Step 3: a list and links

Find `TODO 3`. Inside `<main>`, add a list of things you like and one or two links.

```html
<ul>
  <li>Board games</li>
  <li>Fresh bread</li>
</ul>
<a href="https://github.com/">GitHub</a>
```

You should see dots in front of the list items. A click on the link opens the page.

## Step 4: link the CSS

Find `TODO 4` in `<head>`. Add this line:

```html
<link rel="stylesheet" href="style.css" />
```

Test it: in `style.css`, write `background: lightyellow;` inside `body { }`.

You should see a yellow page after a refresh. If nothing changes, check the file name in `href` and do a hard refresh (`Cmd+Shift+R` or `Ctrl+Shift+R`).

## Step 5: the card in the middle

Find `TODO 5` in `style.css`.

1. Give `.card` a white background, some `padding`, a `max-width` and round corners (`border-radius`).
2. Make `body` a flex box that centres the card:

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

> [!NOTE]
> Flexbox is like a shelf. `justify-content` pushes the toys left, right or to the middle. `align-items` does the same up and down.

You should see a white card in the middle of the page.

## Step 6: one media query

Find `TODO 6`. Add one rule that only works on narrow screens:

```css
@media (max-width: 600px) {
  .card {
    padding: 1rem;
  }
}
```

Make the browser window narrow, or open DevTools (F12) and turn on the phone view.

You should see the change when the window is narrow, and the normal look when it is wide.

> [!TRY]
> Change one more thing inside the media query, for example a smaller `h1` with `font-size: 1.5rem;`.
> You should see the heading shrink only on narrow screens.

## Done

Check every box under "Done when" in the [README](README.md). Then compare with the [solution](solution/) (open `solution/index.html` in the browser). Different colours and words are fine: it is your page.

Save your work:

```bash
git add projects/01-about-me/starter
git commit -m "Finish project 1: about-me page"
git push
```
