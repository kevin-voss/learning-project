# Java — sheet (before the Java hub)

**Time:** ~15 minutes. **Next deep track:** [`../../../tracks/java/`](../../../tracks/java/index.html).  
**Small apply project:** [`../../05-java-weather-cli/`](../../05-java-weather-cli/).

This sheet uses **toy words**. The Java hub has the full path (types, methods, objects, collections, REST…).

## Toy story

| Real Java word | Toy picture |
|----------------|-------------|
| **Class** | Cookie cutter (the shape) |
| **Object** | One cookie you stamped |
| **Field** | What is written on that cookie (name, age) |
| **Method** | What the cookie can *do* (“say hello”) |
| **`main`** | The front door — Java starts here |

```java
public class Dog {
  String name;

  void bark() {
    System.out.println(name + " says woof");
  }

  public static void main(String[] args) {
    Dog d = new Dog();   // stamp one cookie
    d.name = "Rex";
    d.bark();
  }
}
```

## Compile then run (Ubuntu / terminal)

Java is not “save and refresh.” You **bake** then **eat**:

```bash
javac Dog.java    # cutter → .class (bytecode)
java Dog          # run
```

Or use the hub’s Java 21 setup: [`tracks/java/README.md`](../../../tracks/java/README.md).

## Why Java is the focus here

1. Clear types — fewer “mystery” bugs for beginners.  
2. Same language from tiny `main` → Spring services.  
3. This monorepo’s deep path is Java hub → todo-e2e → Pokédex → Spring Boot.

## What to do next (order)

1. Open [`tracks/java/index.html`](../../../tracks/java/index.html) — follow the curriculum path.  
2. Prefer **simple examples** in the terminal every lesson.  
3. When you reach REST/HTTP in the hub, build [`05-java-weather-cli`](../../05-java-weather-cli/) (same weather API as the browser project).

## Checkpoint

You can say out loud: class = cutter, object = cookie, `javac` then `java`.

**Not duplicated here:** full OOP, collections, Spring — those live in `tracks/java` and `tracks/spring-boot`.
