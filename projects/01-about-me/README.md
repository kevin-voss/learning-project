# Project 1: About-me page

Your first real web page. No JavaScript yet: only HTML and CSS.

> [!PICTURE]
> A web page is a dollhouse. **HTML** builds the rooms and puts the toys in them: a heading, a few sentences, a list, a link. **CSS** paints the walls and moves the furniture: colours, space, and where the card sits on the page.

## What you build

One card in the middle of the page about you: your name, a short bio, a list of things you like and one or two links. On a phone the card still looks good.

## What you need to know

- [HTML sheet](../../sheets/html/README.md): tags, headings, paragraphs, lists, links
- [CSS sheet](../../sheets/css/README.md): linking a stylesheet, flexbox, one media query

A word you do not know? Look it up in the [glossary](../../sheets/start/glossary.md).

## How this folder works

| File or folder | What it is for |
|----------------|----------------|
| [step-by-step.md](step-by-step.md) | The build guide. Small steps, each ends with "You should see …" |
| [starter/](starter/) | **Your desk.** `index.html` and `style.css` with `TODO` comments. Your code goes here |
| [solution/](solution/) | One finished page. Peek only when you are done or really stuck |

Two files, two jobs:

- `index.html` is the **dollhouse**: what is on the page (headings, paragraphs, links).
- `style.css` is the **paint and furniture**: how it looks (colours, spacing, layout).

Keep HTML for meaning and CSS for looks.

## Done when

- [ ] The browser tab shows your name.
- [ ] The page has an `<h1>`, a short bio, a list and at least one working link.
- [ ] `style.css` is linked in `<head>` and changes what you see.
- [ ] The card sits in the middle of the page (flexbox).
- [ ] A narrow window changes the look (one `@media` rule).
- [ ] Your work is committed on your branch (`git add`, `git commit`, `git push`, see the [git sheet](../../sheets/git/README.md)).

> [!CHECK]
> 1. Which file decides the colour of the heading: `index.html` or `style.css`?
>    <details><summary>Answer</summary><code>style.css</code>. HTML says <em>what</em> is on the page, CSS says <em>how it looks</em>.</details>
> 2. Which three flexbox lines put a box in the middle of the page?
>    <details><summary>Answer</summary><code>display: flex;</code>, <code>justify-content: center;</code> and <code>align-items: center;</code> (plus <code>min-height: 100vh</code> so the page is tall enough).</details>
> 3. What does <code>@media (max-width: 600px) { … }</code> mean?
>    <details><summary>Answer</summary>"Use these rules only when the window is 600 pixels wide or less", for example on a phone.</details>

## Next

Start the [step-by-step guide](step-by-step.md). After this project the path goes on with the JavaScript drills, then [Project 2: shopping list](../02-shopping-list-web/README.md).
