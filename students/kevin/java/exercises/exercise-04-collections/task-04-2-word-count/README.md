# Task 04_2 · Word count

Part of [Exercise 04 · Collections](../README.md). New ideas you need: **HashMap**, **TreeSet**, **reading `<String, Integer>`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that counts the words in the post office mail. Read text lines until a line is exactly `END` (that line is not a word). Words are separated by spaces; the titles have no punctuation. Counting is case-sensitive: `Java` and `java` are two different words.

After `END`, print:

1. `words: <total number of words>`
2. `unique: <number of distinct words>`
3. one line per distinct word, in alphabetical order: `word: count` (for example `parcel: 3`)

When `END` is the first line, print `words: 0` and `unique: 0` and no word lines.

Keep the counts in a `HashMap<String,Integer>` and print the words through a sorted set of the keys (`TreeSet<String>`). Use `public static void main(String[] args)`.

## The task, simply said

1. Make an empty `HashMap<String,Integer>`.
2. Read lines until a line is exactly `END`.
3. Split each line at spaces; every piece is one word.
4. Add `1` to that word in the map, and `1` to a running total.
5. After `END`: print `words`, `unique`, then every word in alphabetical order with its count.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `post parcel post` / `mail post` / `END` | `words: 5`, `unique: 3`, then `mail: 1`, `parcel: 1`, `post: 3` |
| `parcel parcel parcel` / `END` | `words: 3`, `unique: 1`, `parcel: 3` |
| `Java java` / `END` | `words: 2`, `unique: 2`, `Java: 1`, `java: 1` |
| `END` | `words: 0` and `unique: 0`, nothing else |

Note the first example: `mail` is typed last but printed first — that is the alphabetical order at work.

## Little helpers

<details>
<summary>How do I add 1 to a word's count?</summary>

Ask `containsKey` first. The word is in the map: `put(word, get(word) + 1)`. It is not: `put(word, 1)`.

</details>

<details>
<summary>How do I print the words in alphabetical order?</summary>

A `HashMap` does not remember order. Make `new TreeSet<String>(counts.keySet())`: the same words, sorted A to Z. Loop over that.

</details>

<details>
<summary>Why does Java come before java in the output?</summary>

Java sorts words like a dictionary, and in its dictionary every uppercase letter comes before every lowercase one. Both stay separate words — nothing is lowercased.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `Java` and `java` count as two words, and the word lines are in alphabetical order.
- [ ] You can explain your code out loud in your own words.

Next: [Task 04_3](../task-04-3-safe-removal/README.md)
