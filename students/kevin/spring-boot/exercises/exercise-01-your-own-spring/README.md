# Exercise 01 · Your own Spring

| | |
|---|---|
| Student | Kevin |
| Subject | Spring Boot |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

Before you use the real theatre, you build a tiny one yourself: a **director** who hires each actor once and hands them their props — that is Spring's container.

## Before you code

Sheet and course this exercise practices (read the parts you need):

1. Sheet: [Beans and scopes: the container holds your objects](../../../../../sheets/spring/beans-and-scopes.md)
2. Course: [Dependency injection walkthrough](../../../../../tracks/spring-boot/topics/04-first-spring-api/dependency-injection-walkthrough.md)
3. Map: [Spring sheets](../../../../../sheets/spring/README.md)

**How this subject works:** real Spring needs Maven and a running server, and the test runner here runs plain Java. So every task builds **one Spring idea by hand**: you write the tiny mechanism yourself and see what the annotation does underneath. Each task page names the stand-ins — which plain-Java class plays which Spring part. The course stays the deep hands-on home.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 01_1 | [Bean jar](task-01-1-bean-jar/README.md) | todo |
| 01_2 | [Wiring by hand](task-01-2-wiring-by-hand/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. The container — the theatre director

Picture a theatre. You write the play (your classes). The **director** reads the cast list, hires every actor once, and keeps them backstage. Anyone who needs an actor asks the director — nobody calls `new Actor()` themselves.

Real Spring:

```java
ApplicationContext context = SpringApplication.run(TheatreApp.class, args);
PostOffice desk = context.getBean(PostOffice.class);   // ask the director, never new
```

The container is the `ApplicationContext`. A managed object is a **bean**. `getBean` hands one out.

**In task 01_1 you build this by hand:** your `Container` class stands for the `ApplicationContext`, its `get` method stands for `getBean`, and every bean gets a number so you can see who was created.

### 2. Singleton and prototype — one light vs one script per actor

Picture the stage light: one for the whole theatre, everyone shares it. Now the script: every actor needs a fresh copy.

| Scope | How many | Like |
|-------|----------|------|
| `singleton` (default) | one per container | the stage light |
| `prototype` | a new one per ask | the script copy |

Real Spring:

```java
@Component
public class StageLight { … }          // singleton: one per container

@Component
@Scope("prototype")
public class Script { … }              // a new one every time it is asked for
```

**In task 01_1 you build this by hand:** a singleton name is stored in a `Map` once and handed out again and again; a prototype name builds a fresh bean every time — with the next number.

### 3. Constructor injection — props come from the director

Picture an actor who never goes shopping: the director hands every prop over at the door. A service that builds its own helper (`new Greeter()` inside) is an actor shopping alone — you cannot swap the prop, not even in a test.

Real Spring:

```java
@Service
public class GreetingService {
    private final Greeter greeter;
    public GreetingService(Greeter greeter) {   // the container fills this
        this.greeter = greeter;
    }
}
```

The container looks at the constructor, finds a bean for every parameter, and passes it in. The field can be `final`.

**In task 01_2 you build this by hand:** your `GreetingService` never calls `new` on a greeter; its constructor receives one, and `Container.createService` plays the director.

### 4. `@Qualifier` — two beans, one type

Picture two ushers in the same uniform. "Bring me an usher" is not enough — the ticket must say **which one**.

Real Spring:

```java
@Component("formal")
public class FormalGreeter implements Greeter { … }

public GreetingService(@Qualifier("formal") Greeter greeter) { … }
```

**In task 01_2 you build this by hand:** the first input line (`formal` or `casual`) is the qualifier; `createService` reads it and passes the matching greeter into the constructor.

---

## Words to know

| Word | Means |
|------|-------|
| **container** | The thing that creates and keeps your objects; Spring's is the `ApplicationContext` |
| **bean** | An ordinary object that the container created and manages |
| **`getBean`** | Ask the container for a bean |
| **singleton** | One shared copy per container — the default scope |
| **prototype** | A new copy every time it is asked for |
| **`@Scope("prototype")`** | The label that switches a bean from singleton to prototype |
| **dependency injection** | Someone else creates your helper and hands it in; you never call `new` |
| **constructor injection** | The dependencies arrive as constructor parameters — the standard style |
| **`@Service`** | Label: "container, please create one of this class" |
| **`@Qualifier`** | Label on an injection: which bean to pick when two share a type |
| **wiring** | Connecting beans together — the constructor calls the container makes |

## Source

Written for Kevin: plain-Java practice for the [Beans and scopes](../../../../../sheets/spring/beans-and-scopes.md) sheet.

Back to [all exercises](../README.md).
