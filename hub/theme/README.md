# One theme for the whole site

Every page uses these files. The build (`hub/scripts/build-site.mjs`) adds them to each page, including the track apps.

| File | What it holds |
|------|---------------|
| `tokens.css` | Colours, fonts, spacing, radius, shadow. Light first, dark mode from the system or the toggle. All names start with `--lp-`. |
| `components.css` | The site header, boxes, code blocks, buttons, step tags, the step bar, and the layout of generated pages. Class selectors only, so it is safe on every page. |
| `anim/player.js` | The animation player: finds `<div data-anim="name">` and plays the scene. |
| `anim/scenes.js` | The scenes themselves. |
| `anim/anim.css` | Styles for the animations. |

## The site header

Every page starts with the same header (`hub/scripts/header.mjs`): **Learning Project** (back to the start page), *The path*, *My tasks*, *Look it up*, your progress, a **Continue** button to your next unfinished step, and the light/dark toggle. The build adds it to every page; the landing page gets it from `catalog.mjs`. Generated pages also show a breadcrumb (*Home › sheets › javascript › dom.md*).

It is `--lp-header-h` (56 px) tall and sticks to the top. A track that pins its own bars, sidebars or toasts to the top offsets them by `var(--lp-header-h, 0px)`, so nothing hides behind it.

## Tokens

| Token | Use |
|-------|-----|
| `--lp-bg`, `--lp-surface`, `--lp-surface-2` | page, cards, table heads |
| `--lp-text`, `--lp-text-muted`, `--lp-line` | text, quiet text, borders |
| `--lp-accent`, `--lp-accent-soft`, `--lp-on-accent` | links, main buttons, highlights |
| `--lp-read`, `--lp-do`, `--lp-check`, `--lp-warn` | the step types and warnings |
| `--lp-picture-bg`, `--lp-try-bg`, `--lp-check-bg`, `--lp-note-bg`, `--lp-warn-bg` | box backgrounds |
| `--lp-code-*` | code blocks and syntax colours |
| `--lp-font`, `--lp-mono`, `--lp-size`, `--lp-measure` | Atkinson Hyperlegible, JetBrains Mono, 18 px, 68 characters wide |
| `--lp-s1` … `--lp-s7`, `--lp-radius`, `--lp-shadow` | spacing 4 → 48 px, corners, depth |

Tracks keep their own variable names. Each track maps them onto these tokens in `tracks/<track>/css/bridge.css`, so the whole site changes together.

## Boxes in Markdown

Write them as in [docs/STYLE.md](../../docs/STYLE.md): `> [!PICTURE]`, `> [!TRY]`, `> [!CHECK]`, `> [!NOTE]`, `> [!WARN]`. The page turns them into styled boxes.

## Animations

Put a scene into any Markdown page or lesson:

```html
<div data-anim="boxes"></div>
```

| Scene | Picture | Used in |
|-------|---------|---------|
| `boxes` | labelled boxes | variables drill, Java types |
| `shelf` | numbered shelf | arrays drill, CS arrays |
| `vending` | vending machine | functions drill, Java methods |
| `traffic` | traffic light | if/else drill, Java control flow |
| `laps` | running track | loops drill |
| `request` | letter and parcel | CS client-server, HTTP, fetch sheet |
| `memory` | plates and a toy box | CS stack and heap |
| `postoffice` | numbered post boxes | CS hash tables, Java collections |
| `sort` | bars swapping | CS sorting |
| `restaurant` | waiter, chef, pantry | server layers, Spring ParcelPilot |
| `conveyor` | conveyor belt | Spring queues |
| `album` | photo album | Git sheet, CS Git |

Readers step with **Back** and **Next**, or press **Play**. With "reduce motion" switched on, items jump instead of gliding.
