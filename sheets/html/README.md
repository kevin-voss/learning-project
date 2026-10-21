# HTML: the skeleton of a page

> [!PICTURE]
> A web page is a **dollhouse**. HTML builds the walls and rooms. CSS (next page) paints them. JavaScript (later) makes things move.
>
> - `<html>` = the whole house
> - `<head>` = the attic: the title and links, guests do not play here
> - `<body>` = the rooms where the toys live
> - `<h1>` = the big sign on the wall
> - `<p>` = a sentence on a sticky note
> - `<a href="...">` = a door to another house

## The idea

HTML is text with **tags** around it. A tag says what a piece of text *is*: a heading, a paragraph, a link. The browser reads the tags and draws the page.

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

| Tag | Meaning |
|-----|---------|
| `h1` … `h6` | headings; a bigger number is a smaller heading |
| `p` | a paragraph |
| `ul` + `li` | a list with bullets |
| `a` with `href` | a link |
| `img` with `src` and `alt` | a picture, plus words for people who cannot see it |

> [!TRY]
> 1. In VS Code, make a file `hello.html` and paste the example.
> 2. Right-click the file and choose **Open with Live Server**.
> 3. Change `Hello` to your name and save.
>
> You should see: a page with a big heading, a sentence and a link. The heading changes when you save.

> [!WARN]
> Use only **one** `h1` per page, for the main title. Colours and layout do not belong in HTML: that is the job of CSS.

> [!CHECK]
> 1. Which tag holds everything you see on the page?
>    <details><summary>Answer</summary><code>&lt;body&gt;</code>.</details>
> 2. What does `<a href="...">` make?
>    <details><summary>Answer</summary>A link: a door to another page.</details>
> 3. Why does an `img` need `alt`?
>    <details><summary>Answer</summary>So people who cannot see the picture (and screen readers) know what it shows.</details>

**Next:** [CSS: paint for the page](../css/README.md), then [Project 1: About-me page](../../projects/01-about-me/README.md)
