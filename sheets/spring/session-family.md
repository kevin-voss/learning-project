# The session family: who remembers what, and where

> [!PICTURE]
> A **hotel**. The building is the container. The front desk keeps a drawer per guest (the session). A wristband says who you are without the desk looking anything up (the token). The receptionist on duty knows who is standing in front of them right now (the security context).

## The idea

Several different things in Spring are called a "context" or a "session". They are not the same thing:

| Name | What it is | Typical use |
|------|-----------|-------------|
| `ApplicationContext` | the container itself, holds every bean | lives for the whole app |
| `HttpSession` | a server-side drawer per browser, found by the `JSESSIONID` cookie | classic carts and logins |
| `RequestContextHolder` | static access to the current request | request info deep in non-web code |
| `@SessionAttributes` | puts model objects in the session (classic MVC forms) | rarely in REST |
| Spring Session | the drawers stored in Redis / a DB, shared by all servers | scaling out |
| `SecurityContextHolder` | thread-local "who is calling right now" | `@AuthenticationPrincipal` in controllers |
| `Model` / `ModelAndView` | request data on the way to an HTML view | server-rendered pages |

## Session login vs token login

**Session (stateful):** login creates a drawer on the server; the browser gets a cookie with the drawer number; every request opens the drawer. Simple, but a second server does not have the drawer — you need sticky sessions or Spring Session.

**JWT (stateless):** login hands out a **signed** token holding the user and roles; every request carries it in a header; the server checks the signature and stores **nothing**. Any server can serve any request. This is the usual choice for REST APIs today.

```java
@GetMapping("/me")
public MeDto me(@AuthenticationPrincipal UserDetails user) {
    return new MeDto(user.getUsername());   // filled by the security filter, no lookup
}
```

How a request reaches your controller with JWT: a **filter** in the `SecurityFilterChain` runs first, reads the header, checks the signature, and puts the user into `SecurityContextHolder`. Your controller then reads it.

> [!WARN]
> `SecurityContextHolder` is thread-local. An `@Async` method runs on another thread and sees **no user** unless you hand the context over (`DelegatingSecurityContextAsyncTaskExecutor`).

> [!NOTE]
> Other security basics live in the course [step 16](../../tracks/spring-boot/topics/16-jwt-authentication/README.md): `SecurityFilterChain`, `UserDetailsService`, BCrypt passwords, why REST APIs usually disable CSRF.

> [!CHECK]
> 1. With JWT, what does the server store between two requests of the same user?
>    <details><summary>Answer</summary>Nothing. The token carries the user; the signature proves it.</details>
> 2. Which holder tells a service "who is calling"?
>    <details><summary>Answer</summary><code>SecurityContextHolder</code>.</details>

Back to [Spring](README.md). Next sheets: [Hibernate](../hibernate/README.md).
