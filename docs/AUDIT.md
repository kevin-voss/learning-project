# Audit: from "many good parts" to one clean path

Date: 2026-10-21 · Scope: the whole repo · Method: every `href` in `hub/path.mjs` opened and read, plus every track, project, drill, program and student task. Line counts come from `wc -l`.

**Status (2026-10-21): carried out.** Phases 0–7 below are done and on `main`. The decisions on the open questions are at the end. Paths in the tables are the *before* state; the new layout is in §6 and [LEARNING_PATH.md](LEARNING_PATH.md).

---

## Summary

The repo has a lot of good material. The best pages are the HTML/CSS sheets (`projects/docs/html/README.md` 56 lines, `projects/docs/css/README.md` 74), the CS demos (43 interactive runners) and the Code for Cleaning tasks. The problem is the **order**, **repetition** and **look**, not the amount of content.

### The 5 biggest problems

1. **Theory before code.** A student meets stack frames (`cs-memory`, step 7), Big-O, sorting and CORS (stages 2–3) before writing one line of code. The first real code is `drill-variables` at **step 30 of 97**. There is no "what is a program?" step.
2. **One topic, many homes.** Java basics are taught twice in a row (Java hub, then Spring `01-java-basics`, 1,749 lines, "from zero"). Git has 4 homes, Docker 5, HTTP/REST 6, stack/heap 4, idempotency 6, glossaries 7. Spring never links back to the Java hub or CS lessons.
3. **Five different looks.** hub and AI are light. CS, Java, AWS and architecture are dark. That makes 5 token sets plus 3 hard-coded palettes, 5 font stacks, and `--teal` meaning teal in one track and blue in another. The step bar (`hub/progress.js:108-117`) uses a dark pill on every page.
4. **Projects don't form a ladder.** Weather is built three times (`01`, `03`, `05`). There is no project for DOM, collections, SQL or a first API. Drills → `01` is a 14 h jump (pure functions → DOM + fetch + async + localStorage). Spring 12–16 are bullet lists with 0 code blocks. The most real-world tasks (Code for Cleaning: shopping list, shared expenses, budget) sit in **Extras**.
5. **Pages are not kid-simple and have no checks.** Java topic pages show a dictionary definition first and the analogy third (`tracks/java/js/lesson-topic.js:707`). There are 0 quizzes in the Java hub, and the 5 CS data-structure lessons have no checklist. `getting-started` puts "First Program" at lesson 9 of 10, after `sudo` and `apt`. All JS drills are in **German** next to English pages.

### The 5 highest-value fixes

| # | Fix | Why it is cheap | Effort |
|---|-----|-----------------|--------|
| 1 | **Reorder `hub/path.mjs`**: add a 2-step Welcome stage, move "How the web works" after JS basics, and spread the CS theory just-in-time into the Java stages | One file. Ids stay the same, so progress is kept | S |
| 2 | **Delete duplicates and link** (Spring 01 theory, Spring references, Java `git-basics`, `projects/docs/docker`, `projects/docs/roadmap.md`, CS placeholders) | Deleting is faster than rewriting. `make site` finds every broken link | M |
| 3 | **Fix the two renderers.** Java `lesson-topic.js`: analogy before definition, plus a `check` block. CS `content.js`: checklists for the data-structure lessons | 2 files improve 21 Java pages and 5 CS pages at once | S |
| 4 | **One theme**: `hub/theme/tokens.css` + `components.css`, used by the landing page, sheets, code pages and step bar first, then bridged into each track | Tracks already use CSS vars, so they only need a mapping file | M→L |
| 5 | **One project ladder** that reuses Code for Cleaning tasks and moves `tic-tac-toe.md` into `projects/`. Add 2 new small projects: a shopping list (web) and a parcel database | Most briefs already exist | M |

---

## 1. Duplication: one home per topic

**Rule from now on:** the canonical home teaches the idea. Everywhere else gets one sentence plus a link.

| Topic | Evidence (copies) | Keep (canonical) | Recommendation | Effort |
|---|---|---|---|---|
| Java basics | Java hub topics (`syntax-fundamentals` 245, `types-and-variables` 519, `core-lessons.js` 1,759) · `tracks/spring-boot/topics/01-java-basics/` (7 files, 1,749) · `projects/docs/java/README.md` 109 | Java hub | Delete `java-syntax-basics.md` (271), `how-java-works.md` (91) and `exceptions-intro.md` (168). Move the missing bits (wrappers, autoboxing, the collection decision table, IDE debugger) into the hub, then delete `data-types.md` (403), `collections-basics.md` (252) and `debugging-your-first-program.md` (201). Spring 01 README keeps only "build the Parcel class" and links back. Shrink `projects/docs/java/README.md` to a link list | M |
| OOP, interfaces, enums | Hub `classes-and-objects` · Spring `02/interfaces-and-abstractions.md` 218, `enums-explained.md` 244 (the **only** copies) · `references/java/java-and-oop.md` 56 | Hub (classes); move interfaces and enums **into** the hub | Move the 2 Spring files to new hub topics. Delete `java-and-oop.md` | M |
| Git | CS `git-collaboration` (`web-foundations.js` 486–543) · `tracks/java/topics/git-basics` 363 · `projects/docs/git/README.md` 46 · `projects/docs/setup/getting-started.md` 97 · `spring references/tooling/git-for-this-course.md` 114 · `13/git-tag-checkpoint.md` 136 · `02-docker-portfolio/docs/help/terminal-cheatsheet.md` | CS lesson = idea; `projects/docs/git` = daily loop | Move status/diff/undo from `git-basics` into the git sheet, then delete the Java topic (retire step `java-git`). Shrink the Spring Git reference to tags only. Remove the Git section from the cheatsheet | S |
| Docker | CS `docker-containers` 60 · CS `docker-compose` 299 · `projects/docs/docker/README.md` 41 · `02/docs/concepts.md` 132 · Spring `09-docker` (530) · `references/tooling/docker.md` 74 · Spring `00` "why Docker" | CS (concept), Spring 09 (Java images) | Delete `projects/docs/docker` (retire `docker-sheet`). Shrink `02/docs/concepts.md`, `references/tooling/docker.md` and the Spring 00 section to links | S |
| HTTP / REST | CS `http-requests-responses` 256 · CS `networking-http` + `networks-ips-requests` (overlap) · CS `rest-api-design` 16 (placeholder) · `tracks/java/topics/rest-and-http` 422 · Spring `04/http-methods.md` 109 · `references/web-and-api/spring-and-http.md` 47 · `01-weather-dashboard/docs/concepts.md` 39–98 | CS = HTTP, Java hub = REST in Java | Merge `networking-http` into `networks-ips-requests`. Delete `rest-api-design` and `04/http-methods.md`. Cut the Java REST status-code and idempotency lessons to CS links. Shrink the p01 table | S |
| Testing | Hub `testing` (`core-lessons.js` 969–1171, **no `@Test`**) · Spring `03/testing-with-maven.md` 160 · Spring `08` (848) · `references/web-and-api/testing.md` 220 | Hub = first JUnit; Spring 08 = Spring tests | Move the first JUnit test from Spring 03 into the hub lesson. Merge `references/.../testing.md` into 08 or delete it | S |
| SQL | CS `database-sql-fundamentals` 238 · CS `database-design-scaling` 180 · Spring `10/sql-and-databases.md` 80 · `10/indexes-intro.md` 128 · 4 locking copies | CS | Delete `10/sql-and-databases.md`. Shrink `indexes-intro.md` to EXPLAIN + N+1. Delete the "Hashing" section in `references/architecture/databases-caching-and-locking.md` | S |
| Design patterns | `tracks/java/topics/design-patterns` (1,320) · `spring references/java/design-patterns.md` 51 · Spring `02/patterns-lab.md` 249 · Singleton ×3 | Java hub | Shrink the Spring reference to a "patterns in ParcelPilot" map. Keep the lab | S |
| Maven | Hub `build-tools` 97 · Spring `03-maven` (709) · `03/build-tools-compared.md` 42 · `references/tooling/maven.md` 41 · packages ×3 | Spring 03 (deep), hub (intro) | Delete `references/tooling/maven.md` and `build-tools-compared.md` | S |
| JS basics | `drills/javascript/*` (DE) · `projects/docs/javascript/README.md` 44 + `by-project.md` 133 · `01/docs/concepts.md` 338 · `03/docs/concepts.md` 144 vs `projects/docs/nodejs` 137 + `npm` 157 | Drills (syntax), p01 concepts (DOM/fetch) | Merge the JS sheet README into `by-project.md` and cut it to a fetch/async primer. Shrink 03 concepts to links | S |
| Terminal | CS `linux-terminal-os` 337 + demo 1,026 · Java `getting-started` lessons 55–227 · Spring `00/editor-and-terminal.md` 110 · `02/.../terminal-cheatsheet.md` 119 | CS | Shrink the other three to links | S |
| Memory / JVM | CS `memory-model`, `stack-heap-gc` · Java `types-and-variables` 432–519 and `jvm-memory` 1336–1399 (**near-identical**) · compile → bytecode ×4 | CS = idea; Java `jvm-memory` = deep | Delete the stack/heap block in `jvm-memory`. Spring `how-java-works.md` becomes a link | S |
| Architecture | `tracks/architecture` (~1,584, senior) · Spring `references/architecture/*` · Spring 11/13 READMEs · `projects/docs/java/server-layers.md` 96 · queues ×5 · caching ×3 | Spring `monolith-and-microservices.md` (beginner), `tracks/architecture` (advanced) | Delete CS `message-queues` and `caching-strategies` placeholders (16–19 lines). Shrink `scaling-and-architecture.md` to links | S |
| Roadmaps | `hub/path.mjs` · `docs/LEARNING_PATH.md` 237 · `projects/docs/roadmap.md` 184 · `projects/README.md` 74 · Spring `README.md` vs `GUIDE.md` vs `topics/README.md` | `hub/path.mjs` (order), `LEARNING_PATH.md` (why) | Delete `projects/docs/roadmap.md`. Cut `LEARNING_PATH.md` to rationale + the canonical-homes table. Merge Spring `topics/README.md` into `GUIDE.md` and fix the "you do not need Java yet" contradiction | S |
| Setup | 6 setup pages, JDK install ×3, `projects/docs/setup/README.md` (7-line pointer) | `projects/docs/setup/getting-started.md` | Delete the pointer. Java/Spring/p05 setup sections become links | S |
| Glossaries | 7: Java `glossary.js` 85, Spring `glossary.md` 563, CS `content.js`, `projects/01..04/docs/help/glossary.md` | One `sheets/glossary.md` (plain words) | Delete the 4 project glossaries. Point the rest at the one glossary | M |
| Practice duplicates | Calculator ×2, recursion ×3, console list ×2, file app ×2 (Java `practice-projects` vs CFC) | Code for Cleaning briefs | Delete `practice-projects` cards (retire `java-practice`) | S |

---

## 2. Roadmap: walking `hub/path.mjs` as a beginner

| Finding | Evidence | Recommendation | Effort |
|---|---|---|---|
| No "why code?" and no first program before theory | Step 1 `cs-what` is data structures + Big-O (`concepts/foundations.js` 56). First code at step 30 | New stage **Welcome**: `why-code` + `first-program` (in the browser console, nothing to install) | S |
| CS theory block before any code | Stage `computers` (11 steps: memory → sorting) | Spread it out just in time: arrays next to the arrays drill, memory/stack-heap next to Java classes, hash next to `HashMap`, Big-O/search/sort before a sorting project | S |
| Web stage before HTML and JS | `web-client-server` shows `await response.json()`. `web-network` has CIDR and IPv6. `web-http` has CORS/preflight | Move the web stage after JS basics. Split the CS HTTP and network lessons into basics (path) and deeper (look it up) | S + M |
| Terminal lesson too big for step 2 | `linux-terminal-os.js` 337 lines: systemctl, signals, PATH | Path links the first 3 sub-lessons only. The rest is "look it up" | S |
| Drill order fights the tasks | Every drill task is a function, but `drill-functions` comes 7th. `math` task 8 and `arrays` task 1 need loops | Add a "function = vending machine" primer to `drills-intro`. Order: variables, math, strings, logic, if/else, loops, arrays, functions, objects. Move the loop tasks | S |
| DOM, events and JSON are never taught | `projects/docs/javascript/by-project.md` lists them as table rows | New steps `js-dom` and `json` (one page each), plus 2 small projects before p01 | M |
| `java-sheet` shows `javac` before Java is installed | `projects/docs/java/README.md` | Retire `java-sheet`. `java-start` comes first | S |
| `java-start` buries the first program | `getting-started/js/lessons.js` 563 lines, First Program = lesson 9/10 | Order: install → first program → "if something breaks" (sudo/apt) | S |
| `cs-stack-heap` in Java 1 talks about V8 GC | `concepts/stack-heap-gc.js` | Move it after classes. Use Java wording | S |
| Interfaces, enums, recursion, JDBC never on the path | Used by Spring 02, Java testing, `server-layers.md` | Add hub topics `java-interfaces`, `java-enums` (moved from Spring 02). A recursion step before the calculator project. JDBC inside the parcel-db project | M |
| Gate D asks for "Postgres in Docker", but nothing does that | `gate-java-d` vs project 02 (nginx) | New project **Parcel database** (Postgres in Docker + psql + JDBC) | M |
| Spring 01 re-teaches Java "from zero" | `01-java-basics/README.md` 363 lines | Cut to "describe one parcel" + links (see §1) | S |
| Spring 12–16: pro topics with 0 code | 0 Java code blocks in 12, 13, 14, 16; 1 in 15 | Put them in their own **Pro** stage. Add code + reference solution, one step per PR | L |
| Spring 02 teaches patterns before "Go deeper" | Singleton, Builder, Factory | Fine once interfaces and enums are on the path. `java-patterns` in Go deeper becomes "the full catalog" | S |

### Proposed roadmap (levels → stages → steps)

`(new)` = new id. `(moved)` = existing id in a new place. Everything else keeps its place. Retired ids are listed at the end. **No id is renamed.**

**Level 1 · Beginner: first code and the web**

1. **Welcome**: `why-code` (new) What is a program? A recipe for a computer · `first-program` (new) Say hello in the browser console
2. **Your computer**: `terminal` (first 3 sub-lessons only) · `setup-tools` · `git-sheet` · `git-intro` · `gate-start`
3. **Your first web page**: `html-sheet` · `css-sheet` · `p00-intro` · `p00-build` · `gate-html`
4. **First code: JavaScript**: `drills-intro` · `drill-variables` · `drill-math` · `drill-strings` · `cs-logic` (moved) · `drill-conditionals` · `drill-loops` · `drill-arrays` · `cs-arrays` (moved, picture part) · `drill-functions` · `drill-objects` · `gate-js-basics` (new)
5. **Make pages come alive**: `js-dom` (new) Clicks and the page tree · `p-shop-web` (new) Shopping list in the browser · `p-tictactoe` (new, existing brief) Tic-tac-toe · `gate-dom` (new)
6. **How the web works**: `web-big` · `web-client-server` · `web-network` (basics) · `web-http` (basics) · `json` (new) · `js-sheet` (fetch/async primer) · `p01-intro` · `p01-build` · `gate-web` · `gate-js`

**Level 2 · Java: the main language**

7. **Java 1 · The language**: `java-start` · `java-syntax` · `java-types` · `java-operators` · `java-control` · `java-methods` · `java-arrays` · `java-strings` · `java-classes` · `cs-memory` (moved) · `cs-stack-heap` · `p-password` (new) Password generator · `gate-java-a`
8. **Java 2 · Everyday tools**: `java-collections` · `cs-lists` (moved) · `cs-stacks` (moved) · `cs-queues` (moved) · `cs-hash` (moved) · `java-exceptions` · `java-io` · `java-debugging` · `p-shop-java` (new) Shopping list in Java · `p-expenses` (new) Shared expenses · `gate-java-b`
9. **Java 3 · Smart code**: `cs-what` (moved, as "the big map") · `cs-bigo` (moved) · `cs-search` (moved) · `cs-sort` (moved) · `p-calendar` (new) Calendar conflicts · `java-interfaces` (new) · `java-enums` (new) · `cs-binary` (moved) · `gate-computers` (moved)
10. **Java 4 · Real projects**: `java-build` · `java-testing` (with real JUnit) · `p-budget` (new) Household budget with tests · `java-rest` · `p05-intro` · `p05-build` · `gate-java-c`

**Level 3 · Backend**

11. **Data and servers**: `server-layers` · `cs-sql` · `cs-docker` · `p-parcel-db` (new) Parcel database in Docker · `gate-java-d`
12. **Spring Boot · ParcelPilot**: `spring-intro` · `spring-00` … `spring-10` · `gate-spring-core` (new) ParcelPilot saves parcels in Postgres, with tests

**Level 4 · Pro**

13. **ParcelPilot at scale**: `spring-11` … `spring-16` · `gate-spring`
14. **Go deeper**: `java-recursion` (new) · `p-calculator` (new) Calculator that respects × before + · `java-jvm` · `java-patterns` · `java-uml` · `cs-concurrency` · `architecture`

**Extras (optional)**: `cleaning` · `p02` (new, existing Docker portfolio) · `p03` · `p04` · `ai-guide` · `aws-genai`

**Retired ids** (moved into a new `RETIRED` list in `hub/path.mjs`, never reused): `java-sheet`, `java-git`, `java-practice`, `docker-sheet`, `p02-intro`, `p02-build` (project 02 becomes the optional `p02`).

---

## 3. Content quality per page

The page template every lesson should follow: **picture → one idea → one tiny example → try it → check**. The HTML and CSS sheets already do this. Copy them.

| Finding | Evidence | Recommendation | Effort |
|---|---|---|---|
| Java pages: definition first, analogy third, no check | Renderer `tracks/java/js/lesson-topic.js:707`. 0 quizzes in 21 topics | Change the render order (analogy → idea → code). Add a `check: [{q, a}]` field and render it as a "Check yourself" box with hidden answers | S |
| CS data-structure lessons have no checklist | `arrays.js` 97, `linked-lists.js` 139, `stacks.js` 120, `queues.js` 110, `hash-tables.js` 123 | Add 3 "You understand this when…" items each | S |
| CS lessons show class implementations as the example | Linked list and stack lessons show full classes | Keep the picture and demo. Fold the class code into a "Look inside" box | S |
| Walls of text | `getting-started/js/lessons.js` 563 · `types-and-variables/js/lessons.js` 519 (overflow, casting, `var`) · Spring `07` README 419 · `java-patterns` 810 + 363 · `drills/javascript/tic-tac-toe.md` 687 | Split by "needed now" vs "look it up later". One lesson per screen | M |
| Mixed language | `drills/javascript/**` (33 files, German incl. test names) · `Makefile` comments and help · German drill titles in the hub catalog · `students/becky/.../04-branches` | Translate drills and Makefile to English. Student tasks are translated into English too, faithfully (rule in `students.mdc`) | M |
| Too advanced for the stage | `cs-memory` (heap before variables), `web-http` (CORS), `cs-sql` (JOIN and GROUP BY in "1 h"), `java-rest` (QUERY method), Spring 12–16 | Fixed by the reorder in §2 and the basics/deeper split | — |
| Missing check or wrong hint | `projects/docs/git/README.md` and `projects/docs/docker/README.md` have no check. `01-weather-dashboard/README.md` says run `git init`, but the git sheet says never | Add 3-question checks. Remove the `git init` line | S |
| Old vocabulary | "Phase 2", "Layer A–F", "Gates A–D" in sheets and project READMEs; the hub says "stage" | One word: **stage**. Search and replace | S |
| Hours disagree | 02: 4–6 h (hub) vs 6–10 h (README) vs ~10 h (phases). 03: 4–8 / 10–15 / ~15.5. 04: 6–10 / 12–18 / ~16.5 | `path.mjs` `time` is the single source. READMEs don't state hours | S |
| No GitHub account / login step before `git push` | `setup/getting-started.md` | Add a 5-line "make a GitHub account" step | S |

---

## 4. Projects and tasks

### Current inventory

| Project | Real-world | Small | Builds on last | Verdict |
|---|---|---|---|---|
| `projects/00-static-page` (About-me page, 297 lines) | ◐ | ✓ | first | **Keep** |
| `projects/01-weather-dashboard` (1,399 lines, ~14 h) | ✓ | ✗ | ✗ (jump from drills) | **Keep, trim**: localStorage moves to the shopping list |
| `projects/05-java-weather-cli` (346) | ✓ | ✓ | ✓ (same API as 01) | **Keep**. Swap the hand parsing for Jackson after Maven |
| `projects/02-docker-portfolio` (1,026) | ✓ | ◐ | ✗ (gate wants Postgres) | **Optional extra**. Postgres-in-Docker replaces it on the path |
| `projects/03-cli-tool` (973, weather #2) | ✓ | ✗ | copy of 01 | **Cut**, or re-theme as a to-do CLI (open question) |
| `projects/04-react-todo-app` (1,237) | ✓ | ✗ | ✓ | **Keep, optional** |
| `drills/javascript/*` (8 × ~10 tests) | ✗ | ✓ | ✓ | **Keep** (translate) |
| `drills/javascript/tic-tac-toe.md` (687) | ✓ game | ◐ | ✓ | **Move** to the ladder, split into 3 phases |
| CFC 01 password generator · 02 shopping list · 04 shared expenses · 05 calendar conflicts · 07 household budget | ✓ | ✓ | ✓ | **Promote to the ladder** |
| CFC 03 cleaning schedule · 06 server healthcheck | ✓ | ✓ | — | **Extras** |
| CFC 08 calculator (8–15 h, recursive parser) | ✓ | ✗ | — | **Go deeper**, after recursion |
| Java `practice-projects` (5 snippet cards) | ✗ | ✓ | ✗ | **Delete** (duplicates CFC) |
| Spring ParcelPilot 00–10 | ✓ | ✓ | ✓ | **Keep**. The backbone of Level 3 |
| Spring ParcelPilot 11–16 | ✓ | ✗ (bullets only) | ✓ | **Keep in Pro**. Add code + solutions |
| `students/becky/computer-science/04-branches` | ◐ | ✓ | — | **Keep**. Link each task to its canonical lesson |
| `apps/pokedex` (untracked, only a local `.env`) | — | — | — | **Delete locally** |

### Project ladder (each one reuses the last skill and adds exactly one new one)

| # | Project | New skill | Reuses | Source |
|---|---|---|---|---|
| 1 | About-me page | HTML + CSS | — | `00-static-page` |
| 2 | Shopping list in the browser | DOM, click events, localStorage | arrays, objects (drills) | **new** (small, 2–3 h) |
| 3 | Tic-tac-toe | game state, 2D array, win check | DOM, events | `tic-tac-toe.md` |
| 4 | Weather dashboard | fetch, JSON, async/await | DOM, localStorage | `01` (trimmed) |
| 5 | Password generator (Java) | first Java program, `Scanner`, `Random` | loops, if/else | CFC 01 |
| 6 | Shopping list in Java | classes, `ArrayList` | same app as #2, new language | CFC 02 |
| 7 | Shared expenses | `HashMap`, money in cents | classes, lists | CFC 04 |
| 8 | Calendar conflicts | sorting, merging intervals | lists, classes | CFC 05 |
| 9 | Household budget | files (CSV), exceptions, JUnit tests | maps, classes | CFC 07 |
| 10 | Java weather CLI | `HttpClient`, Maven, Jackson | #4's API, Maven | `05` |
| 11 | Parcel database | Postgres in Docker, SQL, JDBC | Maven, classes | **new** (3–4 h) |
| 12 | ParcelPilot core | Spring API, validation, tests, JPA | #11's tables | Spring 00–10 |
| 13 | ParcelPilot at scale | queues, services, cache, login | #12 | Spring 11–16 |
| 14 | Calculator | recursion, parsing | tests | CFC 08 |

There is one storyline. The **shopping list** (web → Java) shows that the same idea works in two languages. The **parcel** (database → ParcelPilot) carries into the backend.

---

## 5. Design: one theme

### Today

| Area | CSS | Palette | Fonts | Mode |
|---|---|---|---|---|
| hub + sheets + code pages | `hub/landing.css` 705 | `--ink #172033`, `--bg #f7f9fc` | Inter (never loaded) | light |
| step bar | inline in `hub/progress.js` | hard-coded `#172033` / `#22c55e` | system-ui | dark pill |
| computer-science | 8 files, 3,981 (`demos.css` 2,821) | `--bg #0d0f0e`, amber `#f0b429` | Space Grotesk | dark |
| java | 6 files (`components.css` 1,189) | `--bg #0a0e1a`, `--teal #2dd4bf` | Manrope + Space Grotesk | dark |
| architecture | `main.css` 84 + **Tailwind CDN** | hard-coded `#020202`, indigo | Inter | dark |
| ai | 4 files | warm paper `--bg #f7f5f0` | Inter + Fraunces | light |
| aws-genai-pro | 5 files (`components.css` 1,331) | `--aws #ff9900`, `--teal #60a5fa` (blue!) | Manrope + Space Grotesk | dark |

### Target: "Warm paper", light first, with a dark mode

| Token / component | Decision |
|---|---|
| Colors | `--bg #faf8f3` · `--surface #ffffff` · `--text #1f2933` · `--text-muted #5f6b7a` · `--line #e4e0d6` · `--accent #2f6fde` (one brand blue). Step types: `--read #2f6fde` · `--do #1f9d55` · `--check #c27c0e`. Dark mode via `prefers-color-scheme` plus a `data-theme` toggle |
| Type | **Atkinson Hyperlegible** (built for easy reading) for text, **JetBrains Mono** for code. Base 18 px, line height 1.6, reading width 68ch |
| Spacing / shape | Scale 4 · 8 · 12 · 16 · 24 · 32 · 48. Radius 12 px. One shadow |
| Concept card | Title + one sentence + an icon. Used for every lesson header |
| Analogy box | Soft yellow, picture or emoji left, one sentence: "A variable is a labelled box." **Always first** |
| Code block | Mono on `--code-bg`, copy button, optional "Run" (JS) |
| Try it box | Green left border, numbered steps, ends with "You should see…" |
| Check box | Amber, 3 questions, answers behind `<details>` |
| Step bar | The same tokens. Light pill, bottom center, `z-index` below modals |

Files: `hub/theme/tokens.css` · `components.css` · `animations.css` · `anim.js` · `README.md` (5 files). `build-site.mjs` injects `tokens.css` + `components.css` into every page. Each track gets a small `css/bridge.css` that maps its own names to the tokens (`--fg: var(--text)` and so on), so tracks switch over without a rewrite. Drop Tailwind and `lucide@latest` from architecture (unpinned CDN).

### Animations tied to lessons

All animations live in `hub/theme/anim.js`, respect `prefers-reduced-motion`, and reuse the CS demos where they exist.

| # | Animation | Picture | Lesson |
|---|---|---|---|
| 1 | Labelled boxes fill with values | toy box | `drill-variables`, `java-types` |
| 2 | Pointer walks along numbered cubbies | shelf | `drill-arrays`, `cs-arrays` (reuse `structures/core/array.js`) |
| 3 | Runner laps a track, counter ticks | running track | `drill-loops` |
| 4 | Coin in → snack out | vending machine | `drill-functions`, `java-methods` |
| 5 | Envelope travels client → server → back with a status stamp | post office | `web-client-server`, `web-http` (reuse `web/http.js`) |
| 6 | Plates stack up and pop; arrows point into a toy box | kitchen | `cs-stack-heap`, `cs-memory` |
| 7 | Letters sorted into numbered post boxes | post office | `cs-hash`, `java-collections` |
| 8 | Bars swap places | lining up by height | `cs-sort` (reuse `sorting.js`) |
| 9 | Order ticket moves waiter → chef → pantry | restaurant | `server-layers` |
| 10 | Parcels ride a conveyor belt; one falls into the "dead letters" bin | parcel depot | `spring-12` |
| 11 | Photo snapshots drop into an album | photo album | `git-intro` |
| 12 | Red / yellow / green light changes | traffic light | `drill-conditionals` |

---

## 6. Structure

**Decision: keep topic buckets, not stage folders.** The order lives in exactly one place (`hub/path.mjs`). Stage folders would make the folder tree a second roadmap that drifts. The CS and Java tracks are single-page apps whose lessons can't move into stage folders anyway.

```
learning-project/
├── README.md · AGENTS.md · Makefile · vercel.json · .gitignore
├── hub/                index.html · path.mjs · progress.js
│   ├── theme/          tokens.css · components.css · animations.css · anim.js · README.md
│   └── scripts/        catalog.mjs · build-site.mjs · check-links.mjs · check-path.mjs
├── docs/               LEARNING_PATH.md · AUDIT.md · STYLE.md · learner-memory/
├── sheets/             ← was projects/docs (one short page per topic)
│   ├── start/          why-code.md · first-program.md · glossary.md
│   ├── web/            html.md · css.md · dom.md · json.md · fetch.md
│   ├── tools/          setup.md · git.md · npm.md · node.md
│   └── java/           server-layers.md · README.md
├── drills/javascript/  <topic>/ README · tasks · tests · solutions   (English)
├── projects/           <NN>-<slug>/ = ladder position
│   ├── 01-about-me/        README.md · step-by-step.md · starter/ · solution/
│   ├── 02-shopping-list-web/ …    ├── 08-calendar-conflicts/ …
│   ├── 03-tic-tac-toe/ …          ├── 09-household-budget/ …
│   ├── 04-weather-dashboard/ …    ├── 10-java-weather-cli/ …
│   ├── 05-password-generator/ …   ├── 11-parcel-database/ …
│   ├── 06-shopping-list-java/ …   ├── 12-calculator/ …
│   ├── 07-shared-expenses/ …      └── extras/ docker-portfolio · react-todo
├── tracks/             computer-science · java · spring-boot · architecture · ai · certifications/
├── programs/           code-for-cleaning/ (rounds link to projects/ briefs)
└── students/           <student>/<subject>/<NN-slug>/
```

### Naming rules

- Folders and files use `kebab-case`. Every folder's entry page is `README.md`, or `index.html` for apps.
- Use an `NN-` prefix only where order matters (projects, Spring topics, student tasks).
- A project folder holds: `README.md` (brief + check), `step-by-step.md`, `starter/`, `solution/`. Extras go in `help/`. No `docs/` folder inside a project.
- Step ids are `kebab-case`, describe the topic and not the position (`p-shop-web`, not `p02`), and are **never** renamed or reused.

### How the tooling works with the new tree

- **`hub/path.mjs`** stays the single order. New: a `level` on each stage, and `export const RETIRED = [...]`.
- **`check-path.mjs`** (new, about 40 lines, runs inside `make site` and on Vercel) fails when:
  - an id appears twice;
  - a retired id comes back;
  - an `href` is missing;
  - a CS `#lesson` doesn't exist.
- **`catalog.mjs`**: change the `ORDER` and `META` keys from `projects/docs` to `sheets`. The library comes from folders as before.
- **`build-site.mjs`**:
  - add `sheets` to `BUCKETS`;
  - add `scripts` to `SKIP` (today the AWS scrapers are published);
  - inject the theme into `shell()` and `withProgress()`.
- **`check-links.mjs`**: unchanged. It catches every moved file. Optionally it could also check CS `#lesson` anchors in sheets.
- **Folder moves** are only `git mv` + fixing hrefs in `path.mjs`. Progress is safe because it is keyed by id, not URL. Old URLs break, so add Vercel `redirects` for moved top-level pages.
- **Existing rule violations** (handled in Phase 7): 13 folders have more than 5 files. 27 files are over 400 lines, the biggest being `tracks/computer-science/css/demos.css` (2,821) and `tracks/java/js/topics/core-lessons.js` (1,759). Split `core-lessons.js` per topic into `topics/<t>/js/lessons.js`, the way the other 9 topics already do.

---

## 7. Landing page

A first-time student must answer three questions in 10 seconds: *What is this? Where do I start? Where am I?*

| # | Section | Content |
|---|---|---|
| 1 | Header | Name · one **Continue** button (always visible) · light/dark toggle |
| 2 | Hero "You are here" | New visitor: "Learn to code from zero. 14 stages, one step at a time. **Start step 1 →**". Returning visitor: level + stage name, progress bar (`23 / 97`), and one big card for the **next step** (type, title, time, button) |
| 3 | How it works | 3 icons in one line: **Read** · **Do** · **Check**. "Your ticks are saved in this browser." |
| 4 | The path | 4 levels → 14 stages. Only the current stage is open. Every stage shows its goal in one sentence and a ✓ count. Gates look different (amber) |
| 5 | My tasks | Hidden until a student is picked. Then their task list with status |
| 6 | Look it up | Collapsed, with a search box. The library by bucket |
| 7 | Footer | On your computer (clone, branch), for teachers (`make new-task`), GitHub link |

The current "On your computer" section moves to the footer, because path step `setup-tools` already teaches it.

---

## Migration plan

Every step can ship on its own and leaves `make site` green. Checks used:

- **site** = `make site` (build + 0 broken links)
- **demos** = `node tracks/computer-science/scripts/verify-demos.mjs`
- **ai** = `node tracks/ai/scripts/verify.mjs`
- **drills** = `make test`
- **ticks** = open the hub with existing ticks in localStorage and confirm they still show

### Phase 0 · Guardrails (S)

| Step | Files | Verify |
|---|---|---|
| 0.1 Add `RETIRED` + `check-path.mjs` (ids unique, retired ids never reused, hrefs exist) | `hub/path.mjs`, `hub/scripts/check-path.mjs`, `Makefile`, `vercel.json` | site; add a duplicate id on purpose → the build fails |
| 0.2 Stop publishing `scripts/` folders. Delete the untracked `apps/` | `hub/scripts/build-site.mjs` | site; `dist/site/tracks/certifications/aws-genai-pro/scripts` is gone |
| 0.3 Write the page template and writing rules | `docs/STYLE.md` | review |

### Phase 1 · Reorder the path (S)

| Step | Files | Verify |
|---|---|---|
| 1.1 Welcome stage: `why-code`, `first-program` | `hub/path.mjs`, 2 new sheets | site, ticks |
| 1.2 Move the web stage after JS. Spread CS steps into the Java stages (same ids) | `hub/path.mjs` | site, ticks |
| 1.3 Retire `java-sheet`, `java-git`, `java-practice`, `docker-sheet` | `hub/path.mjs` | site; check-path passes |
| 1.4 Add levels. Split Spring into "core" (00–10) and "Pro" (11–16) | `hub/path.mjs`, `hub/scripts/catalog.mjs` | site, ticks |
| 1.5 Cut `docs/LEARNING_PATH.md` to rationale + canonical homes | `docs/LEARNING_PATH.md` | site |

### Phase 2 · Delete duplicates (S each, in any order)

| Step | Files | Verify |
|---|---|---|
| 2.1 Spring 01 → build step + links | `tracks/spring-boot/topics/01-java-basics/*` | site |
| 2.2 Spring references: delete `java-and-oop.md`, `tooling/maven.md`; shrink docker, patterns, testing, http, scaling | `tracks/spring-boot/references/**` | site |
| 2.3 Git: move the good bits into `projects/docs/git`, delete Java `git-basics` | `tracks/java/topics/git-basics/`, `tracks/java/js/topics/registry.js` | site; open the Java hub |
| 2.4 Docker: delete `projects/docs/docker`, shrink `02/docs/concepts.md` | those files | site |
| 2.5 HTTP: merge CS network lessons. Delete `rest-api-design`, `message-queues`, `caching-strategies` placeholders and Spring `04/http-methods.md` | `tracks/computer-science/js/data/concepts/*`, Spring 04 | site, demos |
| 2.6 Memory: delete the stack/heap block in `jvm-memory` | `tracks/java/js/topics/core-lessons.js` | site |
| 2.7 Roadmaps and setup: delete `projects/docs/roadmap.md` and `projects/docs/setup/README.md`. Merge Spring `topics/README.md` into `GUIDE.md` | those files | site |
| 2.8 One glossary: delete the 4 project glossaries | `projects/0*/docs/help/glossary.md` | site |

### Phase 3 · Quick content wins (S–M)

| Step | Files | Verify |
|---|---|---|
| 3.1 Java renderer: analogy first, `check` block | `tracks/java/js/lesson-topic.js`, `css/components.css` | open 3 topics |
| 3.2 CS: checklists for the 5 data-structure lessons | `tracks/computer-science/js/data/*.js` | demos, site |
| 3.3 `getting-started`: first program in lesson 2 | `tracks/java/topics/getting-started/js/lessons.js` | open page |
| 3.4 Translate drills + Makefile to English | `drills/javascript/**`, `Makefile` | drills, site |
| 3.5 Fix hours, the `git init` hint, and "Phase/Layer" → "stage" | project READMEs | site |

### Phase 4 · Theme (M → L)

| Step | Files | Verify |
|---|---|---|
| 4.1 `hub/theme/*`. Landing, sheets, code pages and step bar use it | `hub/theme/*`, `hub/landing.css`, `hub/progress.js`, `build-site.mjs` | site; screenshots light + dark |
| 4.2 One bridge per track (one PR each): CS → Java → AI → AWS → architecture (drop Tailwind) | `tracks/*/css/bridge.css`, track `index.html` | demos / ai; screenshots; AWS `sw.js` precache list updated |
| 4.3 `anim.js` + animations 1, 4, 5 first | `hub/theme/anim.js`, 3 lessons | open lessons, reduced-motion on |

### Phase 5 · Project ladder (M each)

| Step | Files | Verify |
|---|---|---|
| 5.1 Move tic-tac-toe into `projects/`, add step `p-tictactoe` | `drills/javascript/tic-tac-toe.md` → `projects/03-tic-tac-toe/` | site |
| 5.2 New shopping list (web) + `js-dom` + `json` sheets | new folder, `path.mjs` | site, ticks |
| 5.3 Lift CFC 01/02/04/05/07/08 into `projects/` with `starter/` + `solution/`. CFC rounds link to them | `programs/code-for-cleaning/round-01/*`, new folders | site |
| 5.4 New parcel database project | new folder, `path.mjs` | site; run it locally |
| 5.5 Renumber project folders to ladder order (`git mv`, hrefs only, ids unchanged). Add redirects | `projects/*`, `path.mjs`, `vercel.json` | site, ticks |
| 5.6 Spring 12–16: code + reference solution (one PR per step) | `tracks/spring-boot/topics/12..16` | build ParcelPilot |

### Phase 6 · Landing page (M)

| Step | Files | Verify |
|---|---|---|
| 6.1 New hero "You are here", levels, collapsed stages, footer setup | `hub/index.html`, `catalog.mjs` `renderPath`, `progress.js` | site; empty-browser test and mid-path test |

### Phase 7 · Structure (M)

| Step | Files | Verify |
|---|---|---|
| 7.1 `projects/docs` → `sheets/` (`git mv`) + redirects | `projects/docs/**`, `catalog.mjs`, `build-site.mjs`, `path.mjs`, `vercel.json` | site, ticks |
| 7.2 Split `core-lessons.js` per topic; split `demos.css` per demo folder | `tracks/java/**`, `tracks/computer-science/css/**` | site, demos |
| 7.3 Fix the 13 folders with more than 5 files (subfolders) | see §6 | site, demos, ai |

---

## Decisions taken

1. **Code for Cleaning** stays as it is (no solutions under `programs/`). The ladder has its own rewritten copies of the tasks with starters and solutions (projects 05–09, 12). The round files are grouped by reward.
2. **Language:** English on the whole path, drills included. Student exercise sheets are translated into English too.
3. **Reader:** "6-year-old simple" is the writing style (short sentences, pictures first), not the real age. Examples are real-world, not childish.
4. **Theme:** light-first warm paper with a dark mode, on every track.
5. **Project 03 (Node weather CLI):** deleted. Node and npm stay as look-up sheets.
6. **Pro ends** at ParcelPilot 16 plus Go deeper. The AI guide and AWS prep stay optional extras.
7. **AWS GenAI exam prep** stays on this site, themed, as an extra.
8. **Moved URLs** get permanent Vercel redirects (`vercel.json`). Progress is safe, it is keyed by id.
