# HTML — sheet (read before project 00)

**Scope:** Phase 2 / before Java Layer A (web craft).  
**Time:** ~10 minutes. **Next:** [`../../00-static-page/`](../../00-static-page/).

HTML is the **skeleton** of a page. CSS is paint. JavaScript is muscles. Today only the skeleton.

## Toy story

Imagine a dollhouse:

- `<html>` = the whole house  
- `<head>` = the attic (title, links — guests don’t play here)  
- `<body>` = rooms where toys live  
- `<h1>` = the big sign on the wall  
- `<p>` = a sentence on a sticky note  
- `<a href="...">` = a door to another house  

## Tiny example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>I am learning HTML.</p>
    <a href="https://developer.mozilla.org/">MDN</a>
  </body>
</html>
```

## Words to know

| Tag idea | Meaning |
|----------|---------|
| Heading | `h1`…`h6` — bigger number = smaller heading |
| Paragraph | `p` |
| List | `ul` + `li` (bullets) |
| Link | `a` with `href` |
| Image | `img` with `src` and `alt` |

## Do / don’t

- **Do** use one `h1` for the main title.  
- **Don’t** use HTML for layout colors — that’s CSS next.  
- **Do** open the file in a browser (double-click or Live Server).

## Checkpoint

You can point at `<body>`, `<h1>`, and `<a>` and say what each is for.

**→ Build:** [Project 00 — Static page](../../00-static-page/)
