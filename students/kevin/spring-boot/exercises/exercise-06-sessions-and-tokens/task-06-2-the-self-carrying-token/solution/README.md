# Sample solution · Task 06_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac SelfCarryingToken.java
java SelfCarryingToken
```

## How it works, step by step

1. The fake JWT is `user.role.signature`, and `signature(user, role)` is `user + role` reversed — `ana` + `user` → `resuana`. The reversal is the stamp: it depends on **both** parts, so changing `user` or `role` changes the stamp too, and a forged token no longer matches.
2. `verify(token)` is the security filter, in the order the real one checks: shape first (split on the dot, exactly 3 parts), then the signature (recompute and compare). Only then does it hand back a `Principal` — the user and role read straight out of the token. `Optional.empty()` means the request never reaches a handler.
3. `record Principal(String user, String role)` is what lands in the security context — the same job `SecurityContextHolder` does for one request.
4. `main` plays both handlers. A `401` is printed by the filter's side (`rejectReason` says which check failed — a real filter writes that response itself). `/me` reads only the principal: no map, no lookup. `/admin` reads the same principal and then decides by role: `admin` → `200 welcome`, anything else → `403 forbidden` — known, but not allowed.
5. The whole program holds **no map of users or sessions**. Every fact travels inside the token; the stamp proves it is ours.

**Test run**

```text
3
LOGIN ana user
GET /me ana.user.resuana
GET /admin ana.user.resuana
```

```text
token ana.user.resuana
200 ana (user)
403 forbidden
```

(The token is valid — it opens `/me` — but the role `user` may not open `/admin`. That is 401 vs 403 in one run.)

| Input | Output |
|-------|--------|
| `1` / `LOGIN ana user` | `token ana.user.resuana` |
| `2` / `LOGIN ana admin`, `GET /admin ana.admin.nimdaana` | `token ana.admin.nimdaana`, `200 welcome ana` |
| `1` / `GET /me ana.admin.resuana` | `401 bad signature` (the role was changed, the stamp broke) |
| `1` / `GET /me ana.user` | `401 bad token` (only 2 parts) |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Keeping a `Map<String, String>` of issued tokens | the server remembers state — the whole idea is gone | Recompute the signature from the token's own content; no map |
| Checking the signature before the shape | `ana.user` crashes on `parts[2]` | Shape first (3 parts), then signature |
| `split(".")` | every character becomes a part — always "bad token" | Escape it: `split("\\.")` — the dot is a regex wildcard |
| `403` for a broken token | a forgery looks like a permission problem | 401 = who are you (filter says no); 403 = I know you, wrong role |
| Reversing `role + user` | even valid tokens fail | The stamp is over `user + role`, in that order |

Back to [Task 06_2](../README.md).
