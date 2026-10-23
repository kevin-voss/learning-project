# Task 06_1 · The cart that remembers

Part of [Exercise 06 · Sessions and tokens](../README.md). New ideas you need: **`HttpSession`**, the **`JSESSIONID` cookie**, the **session store**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Your program plays the server of a shop. It keeps one drawer per logged-in guest: the drawer remembers who the guest is and what is in their cart. The guest's browser would hold only the drawer number (the cookie) — in this simulation the script types the number for them.

First line: an integer `n` — how many commands follow.

Then `n` lines, each one command:

| Command | What the program does | Output |
|---------|----------------------|--------|
| `LOGIN <user>` | opens a drawer; ids count up 1, 2, 3 … | `set-cookie JSESSIONID=<id> for <user>` |
| `<id> ADD <item>` | puts one item in that drawer's cart | nothing |
| `<id> SHOW` | reads the cart | `cart of <user>: [a, b]` in add order; `[]` when empty |
| `LOGOUT <id>` | throws the drawer away | `session <id> closed` |
| any command with an unknown or closed id | the drawer is not there | `401 no session <id>` |

Ids are never reused: after `LOGOUT 1`, the next `LOGIN` gets `2`.

Model it like the real thing: `class Session { String user; List<String> cart; }` and a `Map<Integer, Session>` — the map is the server's session store, and the id is what the `JSESSIONID` cookie carries.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. One map: cookie number → drawer (user + cart).
2. `LOGIN` makes a drawer with the next number and prints the set-cookie line.
3. `ADD` changes the cart on the server, quietly.
4. `SHOW` prints `cart of <user>: [...]` in add order.
5. `LOGOUT` removes the drawer.
6. Unknown or closed number: `401 no session <id>`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `4` then `LOGIN ana` / `1 ADD milk` / `1 ADD bread` / `1 SHOW` | `set-cookie JSESSIONID=1 for ana` and `cart of ana: [milk, bread]` |
| `7` then `LOGIN ana` / `LOGIN bob` / `1 ADD milk` / `2 ADD toys` / `1 SHOW` / `2 SHOW` / `1 SHOW` | two set-cookie lines, then `cart of ana: [milk]`, `cart of bob: [toys]`, `cart of ana: [milk]` |
| `4` then `LOGIN ana` / `LOGOUT 1` / `1 SHOW` / `1 ADD x` | `set-cookie JSESSIONID=1 for ana`, `session 1 closed`, then two times `401 no session 1` |
| `3` then `LOGIN ana` / `9 SHOW` / `LOGOUT 9` | `set-cookie JSESSIONID=1 for ana` and two times `401 no session 9` |
| `2` then `LOGIN bob` / `1 SHOW` | `set-cookie JSESSIONID=1 for bob` and `cart of bob: []` |
| `5` then `LOGIN ana` / `LOGOUT 1` / `LOGIN bob` / `2 SHOW` / `1 SHOW` | the set-cookie and closed lines, then `set-cookie JSESSIONID=2 for bob`, `cart of bob: []` and `401 no session 1` |
| `0` | nothing |

## Little helpers

<details>
<summary>Where does the cart live?</summary>

In the `Session` object, on the server. The browser holds only the number. Nothing about the cart ever travels to the guest.

</details>

<details>
<summary>How do I print the cart?</summary>

The list already knows: printing a `List<String>` gives `[milk, bread]` and `[]` — exactly the shape you need.

</details>

<details>
<summary>Does a closed number come back?</summary>

No. The counter only counts up. A new drawer after `LOGOUT 1` gets number 2 — old numbers stay gone, and using one is a 401.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] One `Map<Integer, Session>` holds everything; `LOGOUT` really removes the drawer.
- [ ] You can say what the browser stores and what the server stores.

Next: [Task 06_2](../task-06-2-the-self-carrying-token/README.md)
