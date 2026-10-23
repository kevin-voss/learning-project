# Exercise 06 · Sessions and tokens

| | |
|---|---|
| Student | Kevin |
| Subject | Spring Boot |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

One hotel desk keeps a **drawer** per guest and the key tag holds only a number; a **wristband** instead says who you are — and the desk looks nothing up.

## Before you code

Sheet and course lesson (read the parts you need):

1. [The session family: who remembers what, and where](../../../../../sheets/spring/session-family.md) — the drawer, the wristband, the receptionist.
2. Course step 16, [Password login and JWT protection](../../../../../tracks/spring-boot/topics/16-jwt-authentication/README.md) — the badge, the filter, the door rules.

Map of the Spring sheets: [sheets/spring](../../../../../sheets/spring/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 06_1 | [The cart that remembers](task-06-1-the-cart-that-remembers/README.md) | todo |
| 06_2 | [The self-carrying token](task-06-2-the-self-carrying-token/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`, then run the tests from the main folder of the repo (where the `Makefile` is), with your task's id: `make test-task TASK=06_1 STUDENT=kevin SUBJECT=spring-boot`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

Like in exercise 05, both tasks are **plain-Java models**: no Spring, no server. Each program plays the server, the input lines are a script, and the run is the same every time. Task 06_1 builds the server-side drawer by hand; task 06_2 throws it away and lets the token carry everything.

### 1. `HttpSession` — the drawer and the key tag

Picture a hotel desk: one drawer per guest. The key tag holds only the drawer number. The desk (the server) keeps the content; the guest (the browser) carries just a number — the `JSESSIONID` cookie.

```java
@PostMapping("/login")
String login(String user, HttpServletRequest request) {
    HttpSession session = request.getSession();   // open a drawer
    session.setAttribute("user", user);           // put things inside
    return "logged in as " + session.getId();     // the browser keeps this number as a cookie
}
```

**In task 06_1** you build this by hand: `Map<Integer, Session>` is the server's session store, the id is the cookie value, and `LOGOUT` throws the drawer away.

### 2. Why drawers do not scale — Spring Session

Picture a hotel chain: you check in at hotel A, but dinner is at hotel B — and hotel B has no drawer for you. A second server does not have the first server's session map. Fix: keep the drawers in one shared place (Redis) with Spring Session — or stop keeping state at all, which is the next idea.

```properties
# the drawers move into Redis: every server serves every guest
spring.session.store-type=redis
```

**In task 06_1** your one `Map` is one server: a second copy of your program would not know session 1.

### 3. JWT — the wristband

Picture a festival wristband: your name and your role, under a stamp only the festival can make. Every door reads the wristband; the desk looks nothing up. In Spring a **filter** checks the token on every request and fills `SecurityContextHolder`; the controller reads it with `@AuthenticationPrincipal`:

```java
class TokenFilter extends OncePerRequestFilter {
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) {
        String token = req.getHeader("Authorization").replace("Bearer ", "");
        Authentication who = tokenService.verify(token);           // checks the stamp
        SecurityContextHolder.getContext().setAuthentication(who); // who is calling, for this request
        chain.doFilter(req, res);
    }
}
```

```java
@GetMapping("/me")
String me(@AuthenticationPrincipal UserDetails me) {
    return "hello " + me.getUsername();   // no lookup: the token said it
}
```

**In task 06_2** you build this by hand: `verify(token)` stands for the filter (empty = the 401 before any handler), `Principal` is what lands in the security context, and the two handlers read only the principal.

### 4. 401 vs 403 — who are you vs what you may

Picture the door guard. No wristband, or a fake one: "I cannot even tell who you are" — **401**. A real wristband, but this door is staff-only: "I know you, and you may not come in" — **403**.

```java
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/**").hasRole("ADMIN")   // known, wrong role  -> 403
    .anyRequest().authenticated());                  // no valid token     -> 401
```

**In task 06_2** the `/admin` handler answers `403 forbidden` for a valid user token, and both handlers answer `401` when `verify` says no.

---

## Words to know

| Word | Means |
|------|-------|
| **`HttpSession`** | The server-side drawer: state kept between requests of one browser |
| **`JSESSIONID`** | The cookie with the drawer number — the browser's only memory |
| **session store** | The server's map from session id to session data |
| **sticky sessions** | Keeping one user on the server that holds their drawer |
| **Spring Session** | Puts the drawers in Redis or a database, so all servers share them |
| **JWT** | A signed token carrying user and role; the server stores nothing |
| **claims** | The facts inside a token: `sub` (who), `role`, expiry |
| **signature** | The stamp: proves the token is ours and was not changed |
| **filter** | Code before the controller; checks the token, fills the security context |
| **`SecurityContextHolder`** | "Who is calling right now", held per request thread |
| **`@AuthenticationPrincipal`** | Pulls the user from the context into a controller parameter |
| **401** | I cannot tell who you are (no token, a fake or broken one) |
| **403** | I know who you are; your role may not do this |

## Source

Written for Kevin: plain-Java practice for the session and JWT lessons of the course.

Back to [all exercises](../README.md).
