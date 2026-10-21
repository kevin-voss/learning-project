# CSS: paint for the page

> [!PICTURE]
> HTML built the dollhouse. CSS **paints** it: colours, space, sizes. It also says whether the toys sit in a row or in a pile. Same house, nicer look.

## The idea

A CSS rule has a **selector** (what you style) and **properties** (what changes). You put the rules in their own file and link it in `<head>`:

```html
<link rel="stylesheet" href="css/styles.css" />
```

## Tiny example

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 { color: #0f3d2e; }

.card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #ccc;
  padding: 1rem;
}

@media (max-width: 600px) {
  body { margin: 1rem auto; }
}
```

| Word | Meaning |
|------|---------|
| Selector | what you style: `h1`, `.card` (a class) |
| Property | what changes: `color`, `margin` |
| Flex | puts the children in a row or a column |
| Media query | extra rules for small screens |

> [!TRY]
> 1. Next to your `hello.html`, make `css/styles.css` with the example. Link it in `<head>`.
> 2. Open the page with Live Server.
> 3. Change the `h1` colour, save, and look.
> 4. Make the browser window very narrow.
>
> You should see: the page in the middle of the screen, the new heading colour, and a smaller top margin when the window is narrow.

> [!WARN]
> Change one thing, save, look. Pick two colours, not twenty. The full flexbox guide is on [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox), not here.

> [!CHECK]
> 1. In `.card { padding: 1rem; }`, what is the selector and what is the property?
>    <details><summary>Answer</summary>The selector is <code>.card</code>. The property is <code>padding</code>.</details>
> 2. What does `display: flex` do?
>    <details><summary>Answer</summary>It puts the children of that element in a row (or a column with <code>flex-direction: column</code>).</details>
> 3. When does a rule inside `@media (max-width: 600px)` work?
>    <details><summary>Answer</summary>Only when the screen is 600 pixels wide or narrower, like a phone.</details>

**Next:** [Project 1: About-me page](../../projects/01-about-me/README.md)
