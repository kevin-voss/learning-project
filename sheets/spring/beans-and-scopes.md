# Beans and scopes: the container holds your objects

> [!PICTURE]
> A **theatre**. The director (the container) reads the cast list, hires each actor once, hands them their props, and keeps them backstage for the whole run. An actor who needs a prop never goes shopping — the director brings it.

## The idea

Without Spring, a service makes its own helpers: `new Printer()` inside `new PostOffice()`. Testing it means building the whole chain by hand.

**Inversion of control**: you describe the parts; the **container** (`ApplicationContext`) creates them and wires them together. A managed object is a **bean**.

```java
@Service
public class PostOffice {
    private final Printer printer;

    public PostOffice(Printer printer) {    // constructor injection: the standard
        this.printer = printer;
    }
}
```

- `@Component`, `@Service`, `@Repository`, `@Controller` mark classes the container should create.
- `@Configuration` + `@Bean` methods create beans by hand (for classes you do not own).
- The container looks at the constructor, finds a bean of each parameter type, and passes it in.
- Two beans of one type? Pick with `@Qualifier("name")` or mark one `@Primary`.

Field injection (`@Autowired` on a field) works but hides the dependency and cannot be constructed in a test. Prefer the constructor.

## Scopes: how many copies exist

| Scope | How many | Use |
|-------|----------|-----|
| `singleton` (default) | one per container | services, repositories — **stateless** |
| `prototype` | a new one every time it is asked for | workers that keep state |
| `request` | one per HTTP request | request data |
| `session` | one per user session | a user's cart |

```java
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserCart { … }       // one cart per logged-in user
```

> [!WARN]
> A singleton is shared by **every** request at once. A field in a `@Service` that holds "the current user" is a race condition waiting to happen. Keep services stateless; keep per-request data in parameters.

> [!NOTE]
> Lifecycle hooks: `@PostConstruct` runs once after wiring, `@PreDestroy` before the container shuts down. `@SpringBootApplication` is three annotations in one: `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`.

> [!CHECK]
> 1. Two controllers both ask for `PostOffice`. How many `PostOffice` objects exist?
>    <details><summary>Answer</summary>One — singleton is the default.</details>
> 2. Why prefer constructor injection?
>    <details><summary>Answer</summary>Dependencies are visible and final, and a test can call <code>new PostOffice(fakePrinter)</code>.</details>

**Next:** [The session family](session-family.md)
