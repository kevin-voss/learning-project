# How a Java server is structured

**Scope:** Java **Layer D** (foundation). Not Spring Boot deep-dive. Not JPA.

**Read after:** Gates A–C (language, collections, weather CLI).  
**Then:** Postgres + Docker + [`apps/todo-e2e`](../../../apps/todo-e2e/) (Layer E).

## Problem

If every line of code lives in one class, the app becomes spaghetti. HTTP, rules, and SQL get mixed. Hard to test. Hard to change.

## Solution

Give each job its own place.

```text
Browser or API client
        │
        ▼
  Controller     ← HTTP only (path, status, DTO in/out)
        │
        ▼
  Service        ← business rules ("can this user do that?")
        │
        ▼
  Repository     ← database talk (SQL or JPA)
        │
        ▼
    Postgres
```

| Piece | Job | Not its job |
|-------|-----|-------------|
| **Controller** | Read request, call service, return response | Heavy rules, raw SQL |
| **Service** | Rules and workflows | HTTP status trivia, SQL strings (ideally) |
| **Repository** | Load and save data | Business policy |
| **DTO** | Shape of data on the wire (JSON) | DB table mapping |
| **Entity** | Shape of data in the domain / DB row | HTTP headers |

Toy picture:

- Controller = waiter (takes the order, brings the plate)
- Service = kitchen (cooks by the recipe)
- Repository = pantry (gets ingredients / puts leftovers away)
- DTO = order ticket the waiter writes
- Entity = the actual ingredient jars in the pantry

## Example flow (todo app)

1. `POST /api/todos` with JSON `{ "title": "Milk" }`  
2. Controller turns JSON into a DTO and calls service  
3. Service checks title is not blank  
4. Repository `INSERT` into Postgres  
5. Controller returns `201` and a DTO for the new todo  

## Postgres and connection

| Idea | Meaning |
|------|---------|
| Database | Named box of tables (example: `todo`) |
| Table | Rows and columns |
| JDBC | Java API to send SQL |
| Connection URL | `jdbc:postgresql://localhost:5432/todo` |
| User / password | Who may open the box |

Always use **parameters** in SQL (prepared statements). Never glue user text into a query string.

## Docker role

- Run **Postgres** in a container so everyone has the same DB  
- Later run the **app** in a container too  
- Compose file = "start DB (+ app) with one command"

CS Docker lesson is canonical. Todo-e2e shows a real compose setup.

## When to use what (persistence)

| Approach | When |
|----------|------|
| Plain JDBC | Learning SQL and connections |
| JdbcTemplate | Spring app, you still write SQL (todo-e2e) |
| JPA / entities | After JDBC feels clear (Pokédex) |

## Pitfalls

- Fat controllers (rules inside HTTP layer)
- Skipping service "because the app is small" then growing forever
- Using entities as API JSON without thinking (tight coupling)
- Opening DB connections and never closing them (use try-with-resources)

## Checkpoint

Point at a todo-e2e class and say: controller, repository, or neither.  
Explain DTO vs entity in one sentence each.

**Next:** CS SQL fundamentals → JDBC practice → [`apps/todo-e2e`](../../../apps/todo-e2e/) CODE-TOUR.
