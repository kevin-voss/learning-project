# Sample solution · Task 02_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac PersonalData.java
```

```bash
java PersonalData
```

## How it works, step by step

1. **One box per line of the sheet.** For each, one question decides the type:

   | Data | Question | Type | Name |
   |------|----------|------|------|
   | First name, last name | text? | `String` | `firstName`, `lastName` |
   | Year of birth | whole number? | `int` | `birthYear` |
   | Gender | exactly one letter? | `char` | `gender` |
   | Study programme | text? | `String` | `studyProgramme` |
   | Semester | whole number? | `int` | `semester` |
   | First degree | yes or no? | `boolean` | `firstDegree` |
   | Canteen meal | number with a dot? | `double` | `lastMealPrice` |

2. **Why `int` and not `long` for the year?** 1934 fits easily into an `int` (up to about 2.1 billion). `long` is for really huge numbers. Use the normal box unless you need the big one.
3. **Why `char` for the gender?** It is always exactly one letter. `'m'` has single quotes, because it is a `char`. A `String` `"m"` would also be allowed by the sheet.
4. **Why `double` for the price?** Prices have cents. `3.8` with a **dot**; `3,8` is an error.
5. **Names in camelCase**, each saying what is inside. The labels on the screen are exactly the ones of the sheet's example output.
6. **Printing:** `"First name: " + firstName` glues the label (with its colon and space) and the value. One `println` per box keeps every line easy to find and to change.
7. The values are **made up** (Donald Duck from the sheet), because this page is public.

**Test run** (the Donald Duck values: same as the sheet's example output, checked character by character)

```text
First name: Donald
Last name: Duck
Year of birth: 1934
Gender: m
Study programme: Duck Informatics
Semester: 1
First degree: true
Canteen meal: 3.8
```

**The other test examples**, each with only the changed box (the rest of the output stays the same):

```text
price 4.0, first degree false, gender 'd':
Gender: d
First degree: false
Canteen meal: 4.0

price 2.50:
Canteen meal: 2.5
```

A `double` shows as few digits as needed, but at least one after the dot: `4.0`, `2.5`. That is fine for this task. Printing money always with two decimals (`2.50`) comes later with `printf`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `char gender = "m";` | `incompatible types: String cannot be converted to char` | `char` takes single quotes: `'m'` |
| `double price = 3,80;` | `<identifier> expected` | Dot, not comma: `3.80` |
| `int birthYear = 1934.5;` | `incompatible types: possible lossy conversion from double to int` | Whole numbers only in an `int` |
| `boolean firstDegree = "true";` | `incompatible types: String cannot be converted to boolean` | No quotes: `true` |
| `String lastName = Duck;` | `cannot find symbol` | Text needs quotes: `"Duck"` |
| `"Last name:" + lastName` | `Last name:Duck` | The space goes inside the label: `"Last name: "` |
| A box declared but never printed | One line missing in the output | 8 boxes in, 8 `println` out |

Back to [Task 02_1](../README.md).
