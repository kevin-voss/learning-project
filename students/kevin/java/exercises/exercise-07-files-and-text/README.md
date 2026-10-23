# Exercise 07 · Files and text

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

When your program stops, its variables forget everything — so the post office now writes its diary and its savings table into files, and tomorrow's run reads what today wrote.

## Before you code

Deep lesson (read the parts you need): [Reading and writing files](../../../../../tracks/java/topics/io-basics/index.html) in the Java track. Text blocks live in [Strings](../../../../../tracks/java/topics/strings/index.html).

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 07_1 | [Diary file](task-07-1-diary-file/README.md) | todo |
| 07_2 | [Savings table](task-07-2-savings-table/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. `Path` — the address of a file

Picture a house address. The address is not the house. It only tells the postman where the house is.

```java
import java.nio.file.Path;

Path diary = Path.of("diary.txt");   // the address of diary.txt, in this folder
```

- A `Path` is only the address. Until you write, no file exists on disk.
- **In task 07_1** you use this to point at `diary.txt` before anything is written.

### 2. `Files.writeString` and `Files.readString` — the whole file in one call

Picture taking a photo of a page. One click saves everything, and one look later shows the whole page again.

```java
import java.nio.file.Files;

String page = "morning: sorted the mail\n";   // build the page in memory ...
page = page + "evening: locked the door\n";   // ... one line at a time

Files.writeString(diary, page);               // one call writes the whole file
String back = Files.readString(diary);        // one call reads it all back
```

- Build the whole file text in a `String` first (`+` and `"\n"` join the lines), then one call writes it. If the file exists, its old content is thrown away first.
- **In task 07_1** you use this to join the diary entries and save the whole file at once — and in 07_2 the whole savings table.

### 3. `Files.readAllLines` — the page cut into lines

Picture the page cut into strips. One strip per line, kept in order, top to bottom.

```java
import java.nio.file.Files;
import java.util.List;

List<String> lines = Files.readAllLines(diary);   // one strip per element
System.out.println("wrote " + lines.size() + " lines");
for (String line : lines) {
    System.out.println(line);                     // one strip per pass
}
```

- `readAllLines` gives a `List<String>`: one line per element, in file order, without the line breaks. An empty file gives an empty list.
- **In task 07_1** you use this to read the diary back and print it; in 07_2 to read the savings rows.

### 4. Text blocks — a page of text inside your code

> [!NOTE]
> Extra for later: not needed for the tasks, handy for reports.

A long text full of `\n` is hard to read. Triple quotes `"""` keep it like a real page:

```java
String report = """
        Morning shift: 40 parcels
        Evening shift: 12 parcels
        Total: 52 parcels
        """;
```

Every line starts where the least-indented line starts, so the code stays tidy. The result is a normal `String`, nothing more.

---

## Words to know

| Word | Means |
|------|-------|
| **file** | A named place on disk that keeps its content after the program ends |
| **`Path`** | The address of a file, e.g. `Path.of("diary.txt")` |
| **`Files.writeString(path, text)`** | Write the whole text into the file in one call (old content is replaced) |
| **`Files.readString(path)`** | Read the whole file back as one `String` |
| **`Files.readAllLines(path)`** | Read the file into a `List<String>`, one line per element |
| **text block** | Multi-line text between triple quotes `"""`, readable like a page |
| **CSV** | Comma-separated values: one line per row, commas between the columns |

## Source

Written for Kevin: practice for the [Files (io-basics)](../../../../../tracks/java/topics/io-basics/index.html) topic of the Java track.

Back to [all exercises](../README.md).
