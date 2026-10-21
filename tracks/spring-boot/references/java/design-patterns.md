# Patterns in ParcelPilot

> [!PICTURE]
> A pattern is a name for a trick that many people found on their own. Like "the fold" in paper planes: once you know the name, you see it everywhere.

The theory of every pattern lives in one place: the Java hub page [Design patterns](../../../java/topics/design-patterns/index.html). This page is only a map. It shows **where** each pattern turns up while you build ParcelPilot.

## The map

| Pattern | In one sentence | Where you meet it in ParcelPilot |
|---|---|---|
| Singleton | Exactly one shared object. | The system clock in [Step 02](../../topics/02-oop-and-composition/README.md). Spring beans are singletons from [Step 04](../../topics/04-first-spring-api/README.md) on. |
| Builder | Build an object with many fields, one readable call at a time. | [Step 02 pattern lab](../../topics/02-oop-and-composition/patterns-lab.md) |
| Factory | One method decides which object to create. | [Step 02 pattern lab](../../topics/02-oop-and-composition/patterns-lab.md) |
| Facade | A small front door over a bigger system. | SLF4J in front of Logback, [Step 07](../../topics/07-logging-and-observability-basics/README.md) |
| Adapter | Translate between the outside world and your code. | Ports and adapters, [Step 11](../../topics/11-monolith/ports-and-adapters.md). The queue sender in [Step 12](../../topics/12-queues/event-driven-lab.md). |
| Observer | Others react when something happens. | Queue consumers in [Step 12](../../topics/12-queues/event-driven-lab.md) |
| Command | A request packed into an object. | Messages on the queue in [Step 12](../../topics/12-queues/event-driven-lab.md) |
| Proxy | A stand-in that adds work, like caching. | The cache in front of the database, [Step 15](../../topics/15-performance-and-safety/README.md) |
| Strategy | Swap one algorithm for another. | The rate-limit algorithm, [Step 15](../../topics/15-performance-and-safety/README.md) |

## The one rule

Use a pattern when it removes a real problem: a long `if` chain, a hard-wired outside service, or code you cannot test. Skip it when it only adds a layer. A `ParcelBuilderFactoryDecorator` that solves nothing is worse than plain code.

> [!CHECK]
> 1. Where is the full explanation of each pattern?
>    <details><summary>Answer</summary>On the Java hub page "Design patterns". This page only shows where they appear in ParcelPilot.</details>
> 2. In which step does a proxy appear, and what does it do there?
>    <details><summary>Answer</summary>Step 15. The cache stands in front of the database and answers repeated reads.</details>
