# Java — foundation sheet

**Rule:** lock the base before frameworks and deep theory.

Full layered path: [`../../../docs/LEARNING_PATH.md`](../../../docs/LEARNING_PATH.md) Phase 4 (Layers A–F).  
Hub: [`../../../tracks/java/`](../../../tracks/java/index.html)  
Server picture: [`server-layers.md`](./server-layers.md)  
HTTP apply: [`../../05-java-weather-cli/`](../../05-java-weather-cli/)

## Toy story

| Word | Picture |
|------|---------|
| **Class** | Cookie cutter |
| **Object** | One cookie |
| **Field** | Writing on the cookie |
| **Method** | What the cookie can do |
| **`main`** | Front door |

```java
public class Dog {
  String name;

  void bark() {
    System.out.println(name + " says woof");
  }

  public static void main(String[] args) {
    Dog d = new Dog();
    d.name = "Rex";
    d.bark();
  }
}
```

```bash
javac Dog.java
java Dog
```

## What “foundation” means here

### 1. Language base

- Data types (primitives and references)
- Methods and classes
- Control flow
- Arrays and strings

### 2. Folders, files, packages

```text
my-app/
  src/main/java/com/example/demo/
    DemoApp.java          ← package com.example.demo
    model/
      Item.java
```

- One public class per file (usual rule)
- Folder path matches package name
- `javac` / `java` (then Maven later)

### 3. Everyday types

| Type | Use when |
|------|----------|
| array | Fixed size, simple list of same type |
| `ArrayList` | Growable list |
| `HashMap` | Key → value lookup |
| `HashSet` | Unique values only |

Pair with CS: arrays, hash tables, Big-O skim.

### 4. Algorithms (light)

- Walk a list (search)
- Sort a small list
- Count with a map

Deep algorithm courses stay in [`tracks/computer-science`](../../../tracks/computer-science/). Java applies them with lists and maps.

### 5. Java features (base set)

Interfaces, enums, `equals` / `hashCode`, exceptions, try-with-resources.  
Streams / advanced generics / concurrency wait until Layer F.

### 6. Server shape (before Spring deep-dive)

Read [`server-layers.md`](./server-layers.md): controller → service → repository, plus DTO and entity.  
Then Postgres + Docker + JDBC. Then todo-e2e.

## Gates (honest checkpoints)

| Gate | You can… |
|------|----------|
| A | Packages, compile, class vs object |
| B | Use `ArrayList` and `HashMap` in a small program |
| C | Weather CLI + GET vs POST |
| D | Name controller / service / repo / DTO / entity · Postgres in Docker · one SQL `SELECT` |

Only after **A–D** go deep (JVM detail, patterns catalog, Spring Boot course, JPA-heavy Pokédex).

## Next clicks

1. Hub Layer A topics (getting started → classes)  
2. Collections + multi-file console practice  
3. REST topic → project 05  
4. [`server-layers.md`](./server-layers.md) → JDBC / Postgres / Docker → [`apps/todo-e2e`](../../../apps/todo-e2e/)
