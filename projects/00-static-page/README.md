# Project 00: Static About-Me Page

**Your first real web page - no JavaScript yet.**

Build a simple “about me” page with HTML and CSS. One card in the middle, a bit of color, and a layout that still looks okay on a phone.

> **Scope**
>
> | | |
> |---|---|
> | **Phase** | Phase 2 (HTML & CSS) |
> | **Hours** | about 2–4 |
> | **Java path** | **Not** a Java project. Do this before Java Layer A, or early in parallel. Sheets: [HTML](../docs/html/README.md) + [CSS](../docs/css/README.md) only. |

## Status

This folder is **guides only**. You write every HTML and CSS file yourself.

## Where this sits

[Learning path - Phase 2 (HTML & CSS)](../../docs/LEARNING_PATH.md#phase-2--html--css-sheets--tiny-site)

## Prerequisites

Read these sheets first (short):

1. [HTML sheet](../docs/html/README.md)
2. [CSS sheet](../docs/css/README.md)

You do **not** need JavaScript or Java for this project.

## Project goal

By the end you should have:

- An `index.html` with a clear heading, a short bio, and a link or two
- A linked `css/styles.css` that centers a card with flexbox
- One media query so the page still looks fine on a narrow screen

## Read this order

| Doc | Read when |
|-----|-----------|
| [Project structure](./docs/structure.md) | First - create folders and empty files |
| [Step-by-step plan](./docs/step-by-step.md) | **Main build guide** - follow while coding |

## First terminal commands

From the repo root:

```bash
cd projects/00-static-page
pwd
mkdir -p css
touch index.html css/styles.css
ls
ls css
```

Open the HTML file in a browser (double-click, or use Live Server / `npx serve .` if you like).

## Files you will create

```text
00-static-page/
├── index.html
├── css/
│   └── styles.css
├── .gitignore
└── README.md
```

## Learning goals

When finished, you can explain:

- What `<head>` vs `<body>` is for
- How `<link>` loads a CSS file
- Why flexbox is useful for centering a card
- What a media query changes on a small screen

## Quick start

1. Open [structure.md](./docs/structure.md) and create the files.
2. Follow [step-by-step.md](./docs/step-by-step.md) phase by phase.
3. Stop at every checkpoint before moving on.

## Next

When the page looks good on phone and desktop → [Learning path Phase 3](../../docs/LEARNING_PATH.md#phase-3--javascript) (JavaScript drills, then the weather dashboard).
