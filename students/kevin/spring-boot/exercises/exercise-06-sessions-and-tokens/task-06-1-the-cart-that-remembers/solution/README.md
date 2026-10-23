# Sample solution · Task 06_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac CartThatRemembers.java
java CartThatRemembers
```

## How it works, step by step

1. `Session` is one drawer: the guest's `user` and their `cart` (an `ArrayList`, so the order of the `ADD`s is kept).
2. `Map<Integer, Session> sessions` is the **server's session store** — cookie number → drawer. In the real thing this map lives in the servlet container; the browser only ever holds the key. `nextId` hands out 1, 2, 3 … and never reuses a number.
3. `LOGIN` opens the drawer and prints the `set-cookie` line: that single line is the moment the browser is given the key tag and the server fills the drawer.
4. The default branch handles `<id> ADD <item>` and `<id> SHOW`, which both start with the id. Unknown or closed id → `401 no session <id>`: the server has no drawer for this key, so there is no guest to serve. With a drawer: `ADD` puts the item on the server, quietly; `SHOW` prints the cart — the list's own printing already gives `[milk, bread]` and `[]`.
5. `LOGOUT` removes the drawer from the map. `remove` hands back what it removed, so `== null` tells "was not there" (another 401) apart from "closed now" (`session <id> closed`). After that, every use of the old number is a 401 — the state is really gone, not just hidden.

**Test run**

```text
7
LOGIN ana
LOGIN bob
1 ADD milk
2 ADD toys
1 SHOW
2 SHOW
1 SHOW
```

```text
set-cookie JSESSIONID=1 for ana
set-cookie JSESSIONID=2 for bob
cart of ana: [milk]
cart of bob: [toys]
cart of ana: [milk]
```

(Two guests, two drawers, two carts — the number in front picks the drawer.)

| Input | Output |
|-------|--------|
| `4` / `LOGIN ana`, `1 ADD milk`, `1 ADD bread`, `1 SHOW` | `set-cookie JSESSIONID=1 for ana`, `cart of ana: [milk, bread]` |
| `4` / `LOGIN ana`, `LOGOUT 1`, `1 SHOW`, `1 ADD x` | `set-cookie JSESSIONID=1 for ana`, `session 1 closed`, `401 no session 1`, `401 no session 1` |
| `3` / `LOGIN ana`, `9 SHOW`, `LOGOUT 9` | `set-cookie JSESSIONID=1 for ana`, `401 no session 9`, `401 no session 9` |
| `2` / `LOGIN bob`, `1 SHOW` | `set-cookie JSESSIONID=1 for bob`, `cart of bob: []` |
| `5` / `LOGIN ana`, `LOGOUT 1`, `LOGIN bob`, `2 SHOW`, `1 SHOW` | `set-cookie JSESSIONID=1 for ana`, `session 1 closed`, `set-cookie JSESSIONID=2 for bob`, `cart of bob: []`, `401 no session 1` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Reusing ids after `LOGOUT` | the new guest finds the old guest's cart | Count up and never reuse: `nextId++` |
| Keeping the cart in a `Map<String, List>` keyed by user | two logins of "ana" share one cart — and a logged-out guest still has one | Key by the cookie number; the drawer holds user **and** cart |
| `LOGOUT` of an unknown id prints `session closed` | the tests wait for `401 no session <id>` | Check what `remove` returned before you claim success |
| Printing the cart by hand with a loop | `[milk,bread]` without the space | Print the list directly: `[milk, bread]` and `[]` come out right |
| Building the drawer in the browser | there is nothing on the server after a restart | All state sits in the map — that is exactly the point of `HttpSession` |

Back to [Task 06_1](../README.md).
