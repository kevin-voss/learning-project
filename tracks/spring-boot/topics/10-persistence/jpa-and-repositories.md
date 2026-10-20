# JPA, entities, and repositories

This page explains how ParcelPilot talks to PostgreSQL from Java **without writing SQL by hand**.

## The problem

Your code has Java objects (`Parcel`), and the database has rows in a table. Something must translate between "a Java object" and "a database row": reading, writing, and querying. Writing that translation by hand (raw SQL + manual mapping) is repetitive and error-prone.

## The solution: an ORM (JPA/Hibernate)

**ORM** = Object-Relational Mapping: a library that maps Java objects to table rows automatically. In Spring, the standard is **JPA** (the specification), usually implemented by **Hibernate**. **Spring Data JPA** adds ready-made repositories so you get CRUD with almost no code.

```mermaid
flowchart LR
  J["Java object: ParcelEntity"] <-->|JPA / Hibernate maps| R["DB row in parcels table"]
  APP["your code"] --> REPO["ParcelRepository (interface)"]
  REPO --> J
```

## Key words

| Word | Meaning |
|---|---|
| **ORM** | Maps Java objects to DB rows automatically. |
| **JPA** | The Java standard for ORM (annotations like `@Entity`). |
| **Hibernate** | The most common JPA implementation. |
| **Entity** | A Java class mapped to a table (`@Entity`). |
| **Repository** | An interface Spring implements for you to read/write entities. |
| **CRUD** | Create, Read, Update, Delete. |
| **Derived query** | A repository method whose name Spring turns into a query. |

## Step 1: mark the class as an entity

Annotations tell JPA how to map the class to the `parcels` table:

```java
package com.parcelpilot;

import jakarta.persistence.*;

@Entity                          // this class maps to a table
@Table(name = "parcels")         // the table name
public class ParcelEntity {
    @Id                          // primary key
    private String id;

    private String recipient;

    @Enumerated(EnumType.STRING) // store the enum as text ("CREATED"), not a number
    private Status status;

    @Version                     // enables optimistic locking (see locking page)
    private long version;

    // JPA needs a no-arg constructor; add getters/setters as needed
    protected ParcelEntity() {}
}
```

## Step 2: create a repository

You write an **interface**, and Spring Data JPA generates the implementation at startup. Extending `JpaRepository<Entity, IdType>` gives you `save`, `findById`, `findAll`, `deleteById`, and more, all for free:

```java
package com.parcelpilot;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParcelRepository extends JpaRepository<ParcelEntity, String> {

    // "derived query": Spring reads the method name and writes the SQL
    // -> SELECT * FROM parcels WHERE status = ?
    List<ParcelEntity> findByStatus(Status status);
}
```

That method name (`findByStatus`) is not magic naming for fun. Spring parses it into a real query. `findByRecipientAndStatus(...)` would generate a two-condition query.

## Step 3: use it (no SQL in your code)

```java
// create / update
repository.save(parcel);

// read one (Optional means "maybe present")
ParcelEntity p = repository.findById("P-1").orElseThrow();

// filtered list
List<ParcelEntity> created = repository.findByStatus(Status.CREATED);
```

## Why JPA? Pros and cons

| Pros | Cons |
|---|---|
| Little/no SQL for common operations | Hides SQL, so it's easy to write slow queries unknowingly |
| Repositories give instant CRUD | Learning curve (entities, sessions, lazy loading) |
| Portable across databases | Complex queries can be awkward, and sometimes raw SQL is clearer |
| Handles mapping + optimistic locking | Can surprise you if you don't understand what it generates |

**When to reach past JPA:** for a very complex report query, you can write native SQL or use a query builder. For ParcelPilot's CRUD, JPA is ideal.

## Alternatives (so you know they exist)

- **Spring JDBC / JdbcTemplate**: you write SQL, Spring maps results. More control, less magic.
- **jOOQ**: type-safe SQL in Java. Great when SQL is central.
- **MyBatis**: SQL in mapper files.

We choose **Spring Data JPA** because it gives a beginner working persistence fastest, matches the Spring ecosystem, and supports optimistic locking with one annotation.

## Back to the step

Return to [Step 10](README.md) and turn `Parcel` into an entity with a repository. Then read [Locking explained](locking-explained.md) for the `@Version` field.
