# Task 04_3 · Safe removal

Part of [Exercise 04 · Collections](../README.md). New ideas you need: **removeIf**, **lambda** (a first look), **Iterator**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that tidies the post office word shelf. Every word that carries a forbidden letter has to come off the list — while the list itself stays in one piece.

First line: an integer `n` — how many words follow.

Then `n` lines, each holding exactly one word. Words may repeat. The words come as single tokens, no spaces inside.

Then one last line: a single letter. This is the forbidden letter.

Remove every word that **contains** that letter from the `ArrayList<String>`, then print:

- `kept: <w1> <w2> …` — the surviving words on one line, space-separated, in their original order. When no word survives: `kept: (none)`
- `removed: <count>` — how many words left the list

Case matters: the letter `a` does not remove `ARM` — a big `A` is a different letter.

Remove with `words.removeIf(word -> word.contains(letter))` — `word -> word.contains(letter)` is a tiny method without a name: for each word, is this true? (The exercise page shows the older `Iterator` way as the alternative.)

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read `n`, then `n` words into an `ArrayList<String>`.
2. Read the forbidden letter.
3. Let `removeIf` throw out every word that contains the letter.
4. Print the kept words on one line — or `(none)` when the list is empty.
5. Print how many words left: `n` minus what stayed.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `4` then `cat` / `dog` / `cattle` / `bird`, then `a` | `kept: dog bird`, `removed: 2` |
| `3` then `sun` / `moon` / `sky`, then `x` | `kept: sun moon sky`, `removed: 0` |
| `3` then `ape` / `ant` / `cobra`, then `a` | `kept: (none)`, `removed: 3` |
| `3` then `ha` / `hi` / `ha`, then `a` | `kept: hi`, `removed: 2` (the repeated word goes twice) |
| `3` then `ARM` / `arm` / `andy`, then `a` | `kept: ARM`, `removed: 2` (big `A` is not little `a`) |
| `3` then `a` / `b` / `aa`, then `a` | `kept: b`, `removed: 2` (the letter alone counts too) |
| `0` then `a` | `kept: (none)`, `removed: 0` |

## Little helpers

<details>
<summary>Can I just call remove inside my for-each loop?</summary>

No — that is the trap this task is about. Taking a book off the shelf while you count the shelf loses your place, and Java stops you with a `ConcurrentModificationException`. Hand the removing to `removeIf` (or to an `Iterator` with `it.remove()`): they walk the list themselves, safely.

</details>

<details>
<summary>What exactly is `word -> word.contains(letter)`?</summary>

A lambda: a tiny method without a name. For each word, is this true? `removeIf` keeps every word where it is false and throws out every word where it is true. Read it aloud: "word goes to word contains letter".

</details>

<details>
<summary>How do I count the removed words?</summary>

Every word is either kept or removed — so `n - words.size()` is exactly how many left. No second counter needed.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] No word is removed inside a for-each loop — `removeIf` (or an `Iterator`) does the removing.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 04](../README.md).
