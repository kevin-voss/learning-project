# Why the path has this order

**Students do not need this page.** They follow the numbered steps on the landing page. The steps live in one file, [`hub/path.mjs`](../hub/path.mjs). This page explains the reasons behind that order, and where every topic lives.

## Five rules

1. **Code before theory.** A student writes a line of code on step 2. Theory (memory, Big-O, HTTP) comes right next to the code that needs it, never in a block before it.
2. **One new thing per step.** Every project reuses the last skill and adds exactly one new one.
3. **One home per topic.** A topic is taught in one place. Everything else links there (table below).
4. **Picture first.** Every page starts with something a child knows: a toy box, a kitchen, a post office, a traffic light. Then the idea, a tiny example, a try-it and a check. See [STYLE.md](STYLE.md).
5. **Read → Do → Check.** Short pages, then build it, then honestly ask "can I do this?".

## Levels and stages

| Level | Stages | The student can then … |
|-------|--------|------------------------|
| **1 · Beginner** | Welcome · Your computer · Your first web page · First code: JavaScript · Make pages come alive · How the web works | build a small web app that saves data and talks to the internet |
| **2 · Java** | Java 1 The language · Java 2 Everyday tools · Java 3 Smart code · Java 4 Real projects | write, test and organise real Java programs with Maven |
| **3 · Backend** | Data and servers · Spring Boot ParcelPilot | build a web API with a database, tests and Docker |
| **4 · Pro** | ParcelPilot at scale · Go deeper | grow it with queues, services, caching and login, and talk about system design |

Why this order:

- **JavaScript before Java.** The browser needs no install, so the first program runs on step 2. Web pages give instant pictures. Java is the main language and gets the most stages, but it is easier once variables, ifs and loops are not new.
- **The web stage after the drills.** HTTP makes sense once you have written code that could send a request. The weather project comes right after it.
- **CS lessons next to the Java they explain.** Memory and the stack/heap come after Java classes. Linked lists, stacks, queues and hash tables sit next to Java collections. Big-O, search and sort come once the student has lists to search.
- **Data and servers before Spring.** The parcel database project runs Postgres in Docker and uses plain JDBC. Spring then hides that work, and the student knows what is hidden.
- **ParcelPilot splits in two.** Steps 00–10 build a complete, tested API. Steps 11–16 (modules, queues, services, caching, JWT) are pro topics and form their own stage.

## The project ladder

| # | Project | New skill | Reuses |
|---|---------|-----------|--------|
| 01 | [About-me page](../projects/01-about-me/README.md) | HTML + CSS | — |
| 02 | [Shopping list in the browser](../projects/02-shopping-list-web/README.md) | DOM, events, localStorage | arrays, objects |
| 03 | [Tic-tac-toe](../projects/03-tic-tac-toe/README.md) | game state, a 3×3 grid | DOM, events |
| 04 | [Weather dashboard](../projects/04-weather-dashboard/README.md) | fetch, JSON, async/await | DOM, localStorage |
| 05 | [Password generator](../projects/05-password-generator/README.md) | first Java program, input, random | loops, if/else |
| 06 | [Shopping list in Java](../projects/06-shopping-list-java/README.md) | classes + `ArrayList` | the same app as 02 |
| 07 | [Shared expenses](../projects/07-shared-expenses/README.md) | `HashMap`, money in cents | classes, lists |
| 08 | [Calendar conflicts](../projects/08-calendar-conflicts/README.md) | sorting, merging intervals | lists, classes |
| 09 | [Household budget](../projects/09-household-budget/README.md) | Maven, files, JUnit tests | maps, exceptions |
| 10 | [Java weather CLI](../projects/10-java-weather-cli/README.md) | `HttpClient`, JSON in Java | the API from 04, Maven |
| 11 | [Parcel database](../projects/11-parcel-database/README.md) | Postgres in Docker, SQL, JDBC | Maven, layers |
| — | [ParcelPilot](../tracks/spring-boot/README.md) | Spring Boot, step by step | the parcel table from 11 |
| 12 | [Calculator](../projects/12-calculator/README.md) | recursion, parsing | tests |

Optional extras: [Docker for your page](../projects/extras/docker-portfolio/README.md), [React todo app](../projects/extras/react-todo/README.md), [Code for Cleaning](../programs/code-for-cleaning/README.md).

## One home per topic

| Topic | Home | Everywhere else |
|-------|------|-----------------|
| What a program is, first code | [`sheets/start/`](../sheets/start/README.md) | — |
| Terminal, Linux | CS lesson `linux-terminal-os` | link |
| Git: the idea | CS lesson `git-collaboration` | link |
| Git: the daily loop in this repo | [`sheets/git/`](../sheets/git/README.md) | link |
| Setup and installs | [`sheets/setup/`](../sheets/setup/README.md) | link |
| HTML, CSS | [`sheets/html/`](../sheets/html/README.md), [`sheets/css/`](../sheets/css/README.md) | — |
| JavaScript syntax | [`drills/javascript/`](../drills/javascript/README.md) | — |
| DOM, JSON, fetch | [`sheets/javascript/`](../sheets/javascript/README.md) | projects apply only |
| Networks, HTTP | CS lessons `networks-ips-requests`, `http-requests-responses` | link |
| Memory, stack, heap | CS lessons `memory-model`, `stack-heap-gc`; Java `types-and-variables` for Java detail | link |
| Data structures, Big-O, search, sort | CS track | link |
| Java language, inheritance, interfaces, enums, collections, exceptions, I/O, recursion, JUnit basics | [`tracks/java/`](../tracks/java/index.html) | Spring links; student Kevin · exercises 01–07 practice |
| REST in Java | Java topic `rest-and-http` | Spring 04 = Spring flavour |
| SQL | CS lesson `database-sql-fundamentals` | Spring 10 links |
| Docker | CS lessons `docker-containers`, `docker-compose`; Spring 09 for Java images | link |
| Server layers | [`sheets/java/server-layers.md`](../sheets/java/server-layers.md) | Spring links |
| Modern Java 16–25: records, sealed + patterns, sequenced collections, compact main | [`sheets/java/modern/`](../sheets/java/modern/README.md) | student Kevin · exercise 08 |
| Threads: virtual (final), `CompletableFuture`, concurrent collections, structured concurrency (preview) | [`sheets/java/concurrency/`](../sheets/java/concurrency/README.md) | student Kevin · exercises 08, 13 |
| Java craft: naming, Optional, immutability, streams | [`sheets/java/advanced/`](../sheets/java/advanced/README.md) | student Kevin · exercises 09–10 |
| Everyday APIs: `java.time`, `BigDecimal` money, `Collectors` | [`sheets/java/apis/`](../sheets/java/apis/README.md) | student Kevin · exercises 11–12 |
| SQL for beginners: SELECT, WHERE, GROUP BY, JOIN, writes, CREATE TABLE | CS lesson [`database-sql-fundamentals`](../tracks/computer-science/index.html#database-sql-fundamentals), demo for indexes/transactions | student Kevin · sql exercises 01–04; project 11 applies | 
| Spring ideas: container, bean scopes, the session family, session vs JWT | [`sheets/spring/`](../sheets/spring/README.md) | student Kevin · spring-boot exercises 01, 06; course steps 04, 16 link |
| Hibernate ideas: persistence context, fetching and N+1, mapping rules | [`sheets/hibernate/`](../sheets/hibernate/README.md) | student Kevin · spring-boot exercises 03–05; course step 10, 15 link |
| Spring Boot, Maven in depth, Spring testing | [`tracks/spring-boot/`](../tracks/spring-boot/README.md) | — |
| Design patterns | Java topic `design-patterns` | Spring 02 lab links |
| Architecture trade-offs | [`tracks/architecture/`](../tracks/architecture/index.html) | Spring = build |
| Words | [`sheets/start/glossary.md`](../sheets/start/glossary.md) | link |

## Changing the path

- Add or move a step in `hub/path.mjs`. Run `make site`: it checks every step, builds the site and checks every link.
- **Never rename or reuse a step id.** Browsers save progress by id. A step that leaves the path goes into `RETIRED`.
- New pages follow [STYLE.md](STYLE.md).
