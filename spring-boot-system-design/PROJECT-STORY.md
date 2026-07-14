# The ParcelPilot project story

You do not build sixteen unrelated demo apps. You evolve the same product and keep seeing why the next concept is needed.

```mermaid
flowchart LR
  A[one Java file] --> B[plain Maven app]
  B --> C[one Spring Boot API]
  C --> C2[trustworthy API: validation, errors, logs, tests]
  C2 --> D[Dockerized API + PostgreSQL]
  D --> E[modular monolith]
  E --> F[event-driven monolith]
  F --> G[two services + broker]
  G --> H[Compose, cache, safety, JWT]
```

## Where code lives

Keep one codebase during the monolith path:

```text
applications/
└── parcelpilot/                  # steps 01–12: one evolving application
    ├── pom.xml
    ├── src/
    ├── Dockerfile
    └── notes/
```

At step 13, preserve the final monolith as a tagged Git commit (see [git tag checkpoint](topics/13-split-services/git-tag-checkpoint.md) and [Git for this course](references/git-for-this-course.md)) or a `checkpoints/12-event-driven-monolith` copy, then reshape the project:

```text
applications/
└── parcelpilot-services/         # steps 13–16: one evolving local system
    ├── parcel-service/
    ├── notification-service/
    └── compose.yaml
```

`applications/` is intentionally empty now. Create these only when the guide tells you to. No starter framework structure is hidden from you.

## The product’s growing behavior

1. A parcel is a Java object with valid states.
2. Maven makes that object testable and repeatable.
3. Spring Boot lets `curl` create and read parcels.
4. Validation rejects garbage input with helpful `400`s. Error handling gives every failure one predictable JSON shape. Logging makes failures traceable. Tests lock all of that in.
5. Docker makes the API portable. PostgreSQL keeps data after a restart.
6. The modular monolith separates parcel and notification responsibilities without network complexity.
7. A queue lets notification work happen after the parcel request finishes.
8. Only then does notification become a separate service.
9. Compose runs the real local system. Cache, rate limits, and JWT make its boundaries safer.

Every topic answers three questions: **what problem exists now, what small change solves it, and how can I watch that change happen locally?**
