# CSS — sheet (style project 00)

**Scope:** Phase 2 / before Java Layer A (web craft).  
**Time:** ~15 minutes. **Apply on:** [`../../00-static-page/`](../../projects/01-about-me).

CSS paints the dollhouse: colors, space, size. Same HTML, nicer look.

## Toy story

HTML put toys in rooms. CSS says:

- How big is the sign?  
- How much empty floor between toys?  
- Do toys sit in a row (flex) or a pile?

## Link CSS to HTML

```html
<link rel="stylesheet" href="css/styles.css" />
```

Put that in `<head>`.

## Tiny example

```css
body {
  font-family: system-ui, sans-serif;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
  line-height: 1.5;
}

h1 {
  color: #0f3d2e;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (max-width: 600px) {
  body {
    margin: 1rem auto;
  }
}
```

## Words to know

| Idea | Meaning |
|------|---------|
| Selector | What you style (`h1`, `.card`) |
| Property | What changes (`color`, `margin`) |
| Flex | Put children in a row or column easily |
| Media query | Different rules on small screens |

## Do / don’t

- **Do** change one thing, refresh, see it.  
- **Don’t** fight with 20 colors on day one — pick two.  
- **Do** test a narrow browser window (phone size).

## Checkpoint

Your page uses a linked CSS file, a flex card, and one `@media` rule.

**Canonical deep CSS later:** MDN Flexbox guide — not a second curriculum in this repo.
