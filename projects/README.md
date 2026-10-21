# Projects: the ladder

Small builds, one after the other. Each project uses what the last one taught you and adds **one** new skill.

> [!PICTURE]
> A ladder. Every rung is one project. You only ever reach for the next rung, never two at once. And you always stand on the rung you just climbed.

The order and the time for each project live on the [learning path](../hub/index.html). This page shows how the projects fit together.

## The ladder

| # | Project | New skill | Reuses |
|---|---------|-----------|--------|
| 1 | [About-me page](01-about-me/README.md) | HTML + CSS: a page, a card, flexbox, one media query | — |
| 2 | [Shopping list in the browser](02-shopping-list-web/README.md) | DOM, click events, localStorage | arrays, objects (drills) |
| 3 | [Tic-tac-toe](03-tic-tac-toe/README.md) | game state, 2D array, win check | DOM, events |
| 4 | [Weather dashboard](04-weather-dashboard/README.md) | `fetch`, JSON, `async` / `await` | DOM, localStorage |
| 5 | [Password generator](05-password-generator/README.md) | first Java program, `Scanner`, `Random` | loops, `if` / `else` |
| 6 | [Shopping list in Java](06-shopping-list-java/README.md) | classes, `ArrayList` | the same app as #2, a new language |
| 7 | [Shared expenses](07-shared-expenses/README.md) | `HashMap`, money in cents | classes, lists |
| 8 | [Calendar conflicts](08-calendar-conflicts/README.md) | sorting, merging intervals | lists, classes |
| 9 | [Household budget](09-household-budget/README.md) | CSV files, exceptions, JUnit tests | maps, classes |
| 10 | [Java weather CLI](10-java-weather-cli/README.md) | `HttpClient`, Maven, JSON in Java | the weather API from #4 |
| 11 | [Parcel database](11-parcel-database/README.md) | Postgres in Docker, SQL, JDBC | Maven, classes |
| 12 | [Calculator](12-calculator/README.md) | recursion, parsing | tests |

Two stories run through the ladder. The **shopping list** (#2 web, #6 Java) shows that one idea works in two languages. The **parcel** (#11 database) carries on into ParcelPilot in the [Spring Boot track](../tracks/spring-boot/README.md).

## Extras

Not on the main path. Do them when you are curious, or skip them.

| Extra | New skill | Reuses |
|-------|-----------|--------|
| [Docker portfolio](extras/docker-portfolio/README.md) | Docker image, Nginx, port mapping | your About-me page from #1 |
| [React todo app](extras/react-todo/README.md) | React components, state, hooks | the add/tick/remove idea from #2 |

## How a project folder works

Every project folder looks the same, so you never get lost:

```text
02-shopping-list-web/
├── README.md        ← the brief: what you build, what you need to know, "Done when", a check
├── step-by-step.md  ← the build guide: small steps, each ends with "You should see …"
├── starter/         ← YOUR DESK: files with TODO comments. Your code goes here
├── solution/        ← one finished answer. Peek only when you are done or really stuck
└── help/            ← sometimes: troubleshooting, extra facts
```

1. Read the `README.md`. Look at "What you need to know" and open the sheets you have not read yet.
2. Open `step-by-step.md` and work in `starter/`. Finish each step before the next one.
3. Check every box under "Done when". Then compare with `solution/`. Different code can be right too.
4. Save your work on your branch ([git sheet](../sheets/git/README.md)):

```bash
git add projects/02-shopping-list-web/starter
git commit -m "Finish project 2: shopping list"
git push
```

A word you do not know? Look it up in the [glossary](../sheets/start/glossary.md).

> [!CHECK]
> 1. Where does your own code go?
>    <details><summary>Answer</summary>In the project's <code>starter/</code> folder, on your own branch.</details>
> 2. When do you open <code>solution/</code>?
>    <details><summary>Answer</summary>When every "Done when" box is checked, or when you are really stuck after trying.</details>
