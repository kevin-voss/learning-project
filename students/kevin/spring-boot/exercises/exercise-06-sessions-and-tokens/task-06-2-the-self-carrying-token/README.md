# Task 06_2 · The self-carrying token

Part of [Exercise 06 · Sessions and tokens](../README.md). New ideas you need: the **JWT** (a signed token), the **security filter**, and **401 vs 403**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Same shop as in task 06_1, but the server keeps no drawers at all. A login hands out a token that carries everything — a fake JWT of the shape

```text
<user>.<role>.<signature>
```

The signature is the text `user + role` **reversed**: for `ana` and `user` it is `resuana`, so the whole token is `ana.user.resuana`. Only your program can make valid signatures — changing `user` or `role` on a token breaks the stamp.

First line: an integer `n` — how many commands follow.

Then `n` lines, each one command:

| Command | What the program does | Output |
|---------|----------------------|--------|
| `LOGIN <user> <role>` | stamps the badge | `token <user>.<role>.<signature>` |
| `GET /me <token>` | the filter checks, then the handler answers | see below |
| `GET /admin <token>` | the filter checks, then the role decides | see below |

The check (`verify`), in order:

1. Split the token on `.`. Not exactly 3 parts → `401 bad token`.
2. Recompute the signature from `user` and `role`; it differs → `401 bad signature`.
3. The token is trusted: `/me` answers `200 <user> (<role>)`; `/admin` answers `200 welcome <user>` for role `admin` and `403 forbidden` for any other role.

The server keeps **no map of users or sessions**. Model it like the real thing:

- `Optional<Principal> verify(String token)` is the filter — empty means the request never reaches a handler.
- `record Principal(String user, String role)` is what goes into the security context.
- The two handlers read only the principal; nothing is looked up anywhere.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. `LOGIN` prints `token user.role.signature`, signature = reverse(user + role).
2. `verify`: 3 parts? signature matches? — otherwise `401 bad token` / `401 bad signature`.
3. `/me`: `200 <user> (<role>)`.
4. `/admin`: role `admin` → `200 welcome <user>`; any other role → `403 forbidden`.
5. No map, no lookup: the token carries everything.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `LOGIN ana user` | `token ana.user.resuana` |
| `2` then `LOGIN ana user` / `GET /me ana.user.resuana` | `token ana.user.resuana` and `200 ana (user)` |
| `2` then `LOGIN ana admin` / `GET /admin ana.admin.nimdaana` | `token ana.admin.nimdaana` and `200 welcome ana` |
| `2` then `LOGIN ana user` / `GET /admin ana.user.resuana` | `token ana.user.resuana` and `403 forbidden` |
| `1` then `GET /me ana.admin.resuana` | `401 bad signature` (the role was changed, so the stamp broke) |
| `1` then `GET /me ana.user` | `401 bad token` (not 3 parts) |
| `0` | nothing |

## Little helpers

<details>
<summary>How do I reverse a text?</summary>

`new StringBuilder(text).reverse().toString()`.

</details>

<details>
<summary>Split on a dot — why the two backslashes?</summary>

`token.split("\\.")`: `split` takes a regex, and a bare `.` means "any character", so the dot is escaped.

</details>

<details>
<summary>Who prints the 401 — the filter or the handler?</summary>

The filter: with a broken token the request never reaches a handler. In real Spring the filter writes the response itself; here `main` prints it for `verify`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] No map of users or sessions anywhere; the handlers only read the `Principal`.
- [ ] You can explain why changing the role breaks the token — and when a request gets 401 vs 403.

Back to [Exercise 06](../README.md).
