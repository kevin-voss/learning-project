# Spring Boot System Design: Build One Product, One Step at a Time

Learn Java, Spring Boot, architecture, Docker, and distributed systems by evolving one deliberately small backend: **ParcelPilot**.

ParcelPilot is a parcel-delivery tracking service. A customer creates a delivery. An operator moves it through states such as `CREATED`, `PICKED_UP`, and `DELIVERED`. A notification is eventually sent. It is familiar, small enough for `curl`, and naturally grows from one Java file into a monolith and then a few services.

This is a **backend-only** curriculum. Each step should:

1. introduce one main idea,
2. make one observable improvement to ParcelPilot,
3. run locally, preferably in Docker, and
4. be demonstrable with a command-line request.

Start with [PROJECT-STORY.md](PROJECT-STORY.md), then follow [GUIDE.md](GUIDE.md). [Topic instructions](topics/README.md) explain the repeated problem → lesson → build → verify flow. References are deep dives, not extra work to finish first.

## Folder map

```text
spring-boot-system-design/
├── GUIDE.md                 # Do these steps in order
├── PROJECT-STORY.md         # One application evolving into a local system
├── applications/            # Intentionally empty: you build the code here
├── references/              # Detailed, reusable explanations
│   ├── java-and-oop.md
│   ├── java-best-practices.md      # habits + the problem each prevents
│   ├── coding-concepts.md          # early return, guard clauses, DRY, KISS...
│   ├── code-organization.md        # one file -> packages -> layers -> services
│   ├── scaling-and-architecture.md # system design, scaling, advanced topics
│   ├── spring-and-http.md
│   ├── maven.md
│   ├── validation-and-api-contracts.md  # boundary validation, error message design
│   ├── error-handling-and-http-statuses.md
│   ├── logging.md                  # SLF4J, levels, security, structured logging
│   ├── testing.md                  # pyramid, MockMvc, Testcontainers, flaky tests
│   ├── configuration.md            # application.properties, env vars, profiles
│   ├── docker.md
│   ├── monolith-and-microservices.md
│   ├── messaging-and-queues.md
│   ├── production-thinking.md
│   ├── design-patterns.md
│   ├── databases-caching-and-locking.md
│   ├── authentication.md
│   ├── git-for-this-course.md      # init, commit, diff, tag — read before step 13
│   ├── debugging-and-troubleshooting.md
│   ├── when-things-break.md        # FAQ: quick fixes by symptom
│   └── glossary.md                 # every keyword, linked to where it's introduced
└── topics/                  # Per-stage lesson, build work, proof, and labs
    ├── README.md            # How to learn from each stage
    ├── 00-start-here/
    ├── 01-java-basics/
    ├── 02-oop-and-composition/
    ├── 03-maven/
    ├── 04-first-spring-api/
    ├── 05-validation-and-inputs/
    ├── 06-error-handling/
    ├── 07-logging-and-observability-basics/
    ├── 08-testing/
    ├── 09-docker/
    ├── 10-persistence/
    ├── 11-monolith/
    ├── 12-queues/
    ├── 13-split-services/
    ├── 14-compose-and-observe/
    ├── 15-performance-and-safety/
    └── 16-jwt-authentication/
```

## Prerequisites

- A terminal and editor (see [editor and terminal setup](topics/00-start-here/editor-and-terminal.md))
- **JDK 21**, **Maven**, **Docker Engine** (with Compose), and **`curl`** on **Ubuntu**. Install instructions: [GUIDE.md — Install (Ubuntu)](GUIDE.md#install-ubuntu)
- Optional: **`jq`**

Maven can be installed locally, but every Maven build later runs inside a container too. See [references/maven.md](references/maven.md).

## Product scope

Do not add users, a frontend, payments, or cloud deployment while learning the core path. Use simple hard-coded data first. Complexity is added only when the current design has a concrete limitation.
