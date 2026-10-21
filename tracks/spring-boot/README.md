# Spring Boot: build ParcelPilot, one step at a time

> [!PICTURE]
> Picture a small parcel depot. A **front desk** takes parcels in. A **sorting room** decides where each one goes. A **shelf** keeps them safe overnight. A **logbook** says what happened. In this course you build that depot as a Java program called **ParcelPilot**, one room at a time.

## Before you start

Start here after the **Java stages** and the **Data and servers** stage of the path. You should already be able to:

- write and test Java classes with Maven ([Java hub](../java/index.html)),
- point at controller, service and repository ([how a Java server is structured](../../sheets/java/server-layers.md)),
- write a simple SQL query and run Postgres in Docker ([Databases and SQL](../computer-science/index.html#database-sql-fundamentals), [Docker](../computer-science/index.html#docker-containers)).

This is a **build course**. It does not teach Java again. When a step uses an idea from earlier, it links back to the page that teaches it.

## What you build

**ParcelPilot** is a small parcel-tracking service. In step 01 it is one class that prints one parcel. By step 10 it is a web API with validation, error messages, logs, tests, Docker and a PostgreSQL database. Steps 11 to 16 (the "ParcelPilot at scale" stage) add modules, queues, a second service, caching and login.

## How to use it

1. Read [PROJECT-STORY.md](PROJECT-STORY.md) once: the big picture.
2. Open [GUIDE.md](GUIDE.md): the map of all steps and how each step works.
3. Do one numbered step at a time. Read the step, build the small change, prove it works, then move on.

The `references/` folder is a library, not homework. A step links to a reference when you need it.

## What is in this folder?

```text
tracks/spring-boot/
├── GUIDE.md          # the map: every step in order, and how a step works
├── PROJECT-STORY.md  # what ParcelPilot becomes
├── applications/     # empty at first; your code grows here
├── topics/           # the numbered steps 00–16
└── references/       # look-up pages that the steps link to
```

## Keep the product small

Do not add screens, payments, cloud hosting or extra features unless a step asks for them. Each step adds one thing, and only when the current version has a clear problem to fix.

**Next:** [PROJECT-STORY.md](PROJECT-STORY.md), then [Step 00](topics/00-start-here/README.md).
