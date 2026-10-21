# Project Structure — Static About-Me Page

Folders and files **you** create. Nothing here exists until you make it.

## Where to run commands

```bash
cd projects/01-about-me
pwd
```

`pwd` should end with `projects/01-about-me`.

## Create the folders and files

```bash
mkdir -p css
touch index.html css/styles.css
ls
ls css
```

You should see:

- `index.html` in the project folder
- `styles.css` inside `css/`

## Target layout

```text
00-static-page/
├── index.html          # Page skeleton: title, heading, bio, links
├── css/
│   └── styles.css      # Colors, flex card, one media query
├── .gitignore
├── README.md
└── docs/               # Provided — learning material
```

## What goes where?

Think of two toys:

- `index.html` is the **dollhouse** — rooms and labels (headings, paragraphs, links).
- `css/styles.css` is the **paint and furniture** — colors, spacing, and how the card sits on the page.

Keep HTML for meaning. Keep CSS for looks. Do not put big style rules inside HTML if you can avoid it.

## Suggested HTML pieces

Plan on paper first:

1. **Title** in `<head>` — what the browser tab shows
2. **Main heading** — your name or “About me”
3. **Short bio** — one or two `<p>` tags
4. **Links** — e.g. GitHub, LinkedIn, or a favorite site
5. **CSS link** — `<link rel="stylesheet" href="css/styles.css">` in `<head>`

## Suggested CSS jobs

1. Page background
2. A card (box) with padding and maybe a border or shadow
3. Flexbox on `body` (or a wrapper) to center that card
4. One `@media` rule for narrow screens (smaller padding or font size)

## Next

[Step-by-step plan](./step-by-step.md)
