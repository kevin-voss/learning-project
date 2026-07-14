# Layered vs feature packages: where does this file go?

Every Java project answers one question with its top-level folders: *what is the first thing we group code by?* There are two classic answers, and step 11 quietly picks one. This page makes the choice explicit.

## The two layouts, side by side

**Package by layer** groups by *technical role* — all controllers together, all services together:

```text
com/parcelpilot/
├── controller/
│   ├── ParcelController.java
│   └── NotificationController.java
├── service/
│   ├── ParcelService.java
│   └── NotificationService.java
├── repository/
│   ├── ParcelRepository.java
│   └── NotificationRepository.java
└── model/
    ├── Parcel.java
    └── Notification.java
```

**Package by feature** groups by *business capability* — everything about parcels together:

```text
com/parcelpilot/
├── parcel/
│   ├── Parcel.java
│   ├── ParcelService.java
│   ├── ParcelController.java
│   └── ParcelRepository.java
└── notification/
    ├── Notifier.java
    └── LoggingNotifier.java
```

Same classes, same count. Only the grouping differs — and the grouping changes what the codebase is *good at answering*.

## The two questions each layout answers

**"Where do I put this file?"** Layers answer instantly: it's a controller, it goes in `controller/`. No thinking required, which is genuinely comfortable for beginners. Features make you ask "which capability does this belong to?" — a slightly harder question that forces a *useful* thought.

**"What does this app do?"** Open a by-layer project and the folders say: "it has controllers, services and repositories." Every Spring app on earth has those — you learned nothing. Open the by-feature project and the folders say: "it does parcels and notifications." The architecture documents the product.

And the day-to-day difference: a real change ("parcels need a `weight` field, validated, stored, returned") touches one folder in the feature layout and *every* folder in the layer layout.

## The coupling and visibility argument

This is the technical heart of it. Java's default, no-modifier visibility is **package-private**: visible only inside the same package. In a feature package, `ParcelRepository` and `ParcelEntity` can drop `public` — the compiler itself then guarantees no other feature touches them:

```java
// parcel/ParcelRepository.java — package-private: invisible outside parcel/
interface ParcelRepository extends JpaRepository<ParcelEntity, String> { }
```

In a by-layer layout that's impossible: `service.ParcelService` needs `repository.ParcelRepository` across packages, so **everything must be `public`**, and once everything is public, anything may depend on anything. The [module boundaries lab](module-boundaries-lab.md) had to invent an `internal` convention plus a grep to police the boundary — package-by-feature gets a piece of that policing from the compiler for free.

## Honest pros and cons

| Package by layer | |
|---|---|
| **Pros** | zero thought to place a file; familiar from tutorials; fine when the whole app is one small feature |
| **Cons** | one feature change touches every folder; folders describe Spring, not your product; everything must be `public`, so no compiler-enforced boundaries; features entangle silently; extraction to a service means untangling all layers at once |

| Package by feature | |
|---|---|
| **Pros** | a feature change stays in one folder; folders describe the product; package-private hides internals with compiler help; high cohesion, low coupling by construction; a feature folder is a ready-made service seam |
| **Cons** | requires deciding what a "feature" is (and shared code needs a home, e.g. `common/`); unfamiliar to tutorial-trained eyes; overkill when the app really has only one feature |

## The course's choice, and why

ParcelPilot packages **by feature**. Not for style points — because the roadmap depends on it: step 11 needs modules with real boundaries (`parcel`, `notification`), and step 13 extracts the `notification` module into its own service. In a by-feature layout that extraction is nearly "move this folder"; in a by-layer layout it's an archaeology project across five folders. The [Code organization](../../references/code-organization.md) reference walks this as Stage 4 → Stage 5 of the same journey.

## The hybrid reality

Don't read this as "layers are dead." Inside a feature package, the layer idea lives on happily — the step 11 layout is layers *within* features:

```text
parcel/
├── Parcel.java            # domain layer
├── ParcelService.java     # application/service layer
├── ParcelController.java  # web layer (adapter)
└── ParcelRepository.java  # persistence layer (adapter)
```

Big features often make it explicit with subpackages (`parcel/web/`, `parcel/persistence/`). Feature first, layers second: coupling follows features, so features get the package boundary; layers are roles *inside* one. Which role owns which interface is the subject of [Ports and adapters](ports-and-adapters.md).

## Back to the step

Return to [Step 11](README.md) and check your tree: could a stranger tell what ParcelPilot does from `ls src/main/java/com/parcelpilot`?
