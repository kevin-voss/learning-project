# How a Java server is structured

> [!PICTURE]
> A **restaurant**. The **waiter** takes your order and brings the plate. The **chef** cooks by the recipe. The **pantry** keeps the food on shelves.
>
> Nobody does the other one's job. The waiter never cooks, the chef never runs to your table.

<div data-anim="restaurant"></div>

## The idea

A server gets many jobs: read the HTTP request, check the rules, save data. If one class does all of that, it turns into spaghetti: hard to read, hard to test, hard to change.

So a Java server gives each job its own class:

| Restaurant | Server part | Its one job |
|---|---|---|
| Waiter | **Controller** | reads the HTTP request, calls the service, sends the response |
| Chef | **Service** | the rules: "is the title empty?", "may this user do that?" |
| Pantry | **Repository** | loads and saves data in the database |
| Order ticket | **DTO** | the shape of the data in a request or response (JSON) |

```text
Browser ──▶ Controller ──▶ Service ──▶ Repository ──▶ Database
  (guest)     (waiter)      (chef)       (pantry)
```

## Tiny example

One order goes through the restaurant: a new todo "Milk".

```java
class TodoController {                    // waiter
  TodoService service;
  TodoDto create(TodoDto order) {         // POST /api/todos
    return service.add(order.title());
  }
}

class TodoService {                       // chef
  TodoRepository repository;
  TodoDto add(String title) {
    if (title.isBlank()) throw new IllegalArgumentException("Title is empty");
    return repository.save(title);
  }
}
```

The controller does not check rules. The service does not know about HTTP. The repository (not shown) only talks to the database.

> [!TRY]
> 1. Open the [Spring Boot course](../../tracks/spring-boot/README.md) and find the first web API step.
> 2. Look at the class names in its code.
>
> You should see: names that end in `Controller`, `Service` and `Repository`. For each, say out loud: waiter, chef or pantry?

> [!WARN]
> The most common mistake is a **fat controller**: rules and database code inside the waiter. It works for a day, then nobody can change it. Keep the waiter thin.

> [!NOTE]
> How the repository really talks to a database with SQL is the job of [Project 11: the parcel database](../../projects/README.md). The idea of tables and queries is in [Databases and SQL](../../tracks/computer-science/index.html#database-sql-fundamentals).

> [!CHECK]
> 1. Which part decides "a todo title may not be empty"?
>    <details><summary>Answer</summary>The service (the chef). Rules live there.</details>
> 2. Which part knows the URL `/api/todos` and the status code `201`?
>    <details><summary>Answer</summary>The controller (the waiter). It is the only part that speaks HTTP.</details>
> 3. A class has `INSERT INTO todo …` in it. What should it be called?
>    <details><summary>Answer</summary>A repository (the pantry). Database code lives only there.</details>

**Next:** [Databases and SQL](../../tracks/computer-science/index.html#database-sql-fundamentals)
