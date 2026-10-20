# Annotations and imports in Spring Boot

Step 04 is where `@Something` labels appear everywhere. This page explains what annotations are, the ones you use, how imports relate to them, and when to use which.

## The problem annotations solve

A framework like Spring needs to know things about your code: "this class handles HTTP", "call this method for a POST", "inject this dependency here". You could configure all that in giant XML files (the old way). **Annotations** let you attach that information **directly on the code it describes**, so it's readable and local.

## What is an annotation?

An annotation is a label starting with `@`, placed above a class, method, field, or parameter. It doesn't run on its own: something else (the compiler, or Spring at startup) **reads** it and acts on it.

```java
@RestController          // Spring reads this: "this class handles HTTP, return JSON"
public class ParcelController { ... }
```

Think of annotations as sticky notes: `@Test` says "run me as a test", `@RestController` says "I'm a web handler".

## Annotations need imports

An annotation is just a special type, so, like any class from another package, you must **import** it (unless it's in the same package or `java.lang`). Your editor usually adds imports automatically.

```java
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
```

If you see "cannot find symbol `@GetMapping`", it almost always means the import is missing.

## The annotations you use in Step 04

### Application + component annotations (what Spring manages)

| Annotation | Put it on | Meaning |
|---|---|---|
| `@SpringBootApplication` | the main class | Marks the app's entry point and enables auto-configuration + component scanning. |
| `@RestController` | a class | This class handles HTTP requests and returns data as JSON. |
| `@Component` / `@Service` / `@Repository` | a class | "Spring, create and manage one of these" (a **bean**). `@Service`/`@Repository` are specialized `@Component`s for readability. |

> **Bean** = an object Spring creates and manages for you. **Component scanning** = Spring automatically finds classes with these annotations at startup.

### Web mapping annotations (which method handles which request)

| Annotation | Meaning | Example |
|---|---|---|
| `@RequestMapping("/parcels")` | shared path prefix for the class | all methods live under `/parcels` |
| `@GetMapping("/{id}")` | handle `GET` on that path | `GET /parcels/P-1` |
| `@PostMapping` | handle `POST` | `POST /parcels` |
| `@PatchMapping("/{id}/status")` | handle `PATCH` | `PATCH /parcels/P-1/status` |
| `@PutMapping` / `@DeleteMapping` | handle `PUT` / `DELETE` | `PUT /parcels/P-1` / `DELETE /parcels/P-1` |

### Data-binding annotations (where a value comes from)

| Annotation | Reads from | Example |
|---|---|---|
| `@PathVariable` | a `{placeholder}` in the URL path | `/{id}` → `String id` |
| `@RequestParam` | the query string after `?` | `?status=CREATED` → `String status` |
| `@RequestBody` | the JSON request body | body → a `CreateParcelRequest` object |

```java
@GetMapping("/{id}")
public ParcelResponse getOne(@PathVariable String id) { ... }

@GetMapping
public List<ParcelResponse> list(@RequestParam(required = false) String status) { ... }

@PostMapping
public ResponseEntity<ParcelResponse> create(@RequestBody CreateParcelRequest req) { ... }
```

## Dependency injection is composition, automated

When a class needs another object, declare it in the constructor. Spring sees the `@Service`/`@Component` and **injects** the dependency automatically. This is the composition idea from step 02, done by the framework:

```java
@Service
public class ParcelApplication {
    private final ParcelRepository repository;   // a dependency

    public ParcelApplication(ParcelRepository repository) {  // Spring passes it in
        this.repository = repository;
    }
}
```

Prefer **constructor injection** (like above). Avoid putting `@Autowired` on fields, because it hides required dependencies and makes testing harder.

## When to use which: quick guide

- Building a web endpoint? Class = `@RestController`, methods = `@GetMapping`/`@PostMapping`/`@PatchMapping`.
- A class with business logic Spring should manage? `@Service`.
- A class that talks to the database? Often a Spring Data `@Repository` interface.
- Need a value from the URL path? `@PathVariable`. From `?query`? `@RequestParam`. From the JSON body? `@RequestBody`.

## Common beginner mistakes

- **Missing import** → "cannot find symbol". Let your editor add it, or copy the `import` lines.
- **Annotation on the wrong target** (e.g. `@GetMapping` on a class) → it belongs on a method.
- **Forgetting `@RequestBody`** → Spring won't fill your object from JSON, and fields come out null.
- **Field injection** with `@Autowired` → switch to constructor injection.

## Back to the step

Return to [Step 04](README.md) and read the controller again. Every annotation there is in the tables above.
