# Task 02_1 · Personal data

Part of [Exercise 02 · Data types and variables](../README.md). New ideas you need: variables, data types, choosing the right box, camelCase, literals, gluing with `+`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** `PersonalData.java` is half-ready: fill in the `TODO`s |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a Java program that declares **suitable variables** for the following data:

- First name  
- Last name  
- Year of birth  
- Gender (e.g. `m`, `f` or `d`)  
- Name of the study programme  
- Current semester  
- Whether this is your **first degree** or not  
- Price of your last canteen meal in **EUR**

**Requirements**

- Choose fitting **data types** (e.g. `String`, `int`, `char`/`String`, `boolean`, `double`).  
- Follow the **naming conventions** for variables (`camelCase`, meaningful names).  
- Initialise the variables with **your own personal values**.  
- Print all variables to the console; in front of each line a **label**, so you can see which variable is printed.

**Example output**

```
First name: Donald
Last name: Duck
Year of birth: 1934
Gender: m
Study programme: Duck Informatics
Semester: 1
First degree: true
Canteen meal: 3.8
```

**Hints**

- `System.out.println("Label: " + variable);` joins text and value.  
- For a `boolean`, the output shows `true` or `false`.  
- The canteen price as a `double` (decimal point, not a comma).

## The task, simply said

1. Make 8 boxes, one for each line of the list.
2. For each box, choose the right shape: text, one letter, whole number, yes/no, or number with a dot.
3. Give each box a clear camelCase name.
4. Put a value in each box.
5. Print every box on its own line, with a label in front: `Label: value`.

The sheet says "your own personal values". This folder is on a **public website**, so here use **made-up** values, like the sheet's Donald Duck. Your real data stays on your own computer.

## Test examples

Your program is right when it gives exactly these answers.

| Values in your boxes | The program says |
|----------------------|------------------|
| The sheet's Donald Duck: `"Donald"`, `"Duck"`, `1934`, `'m'`, `"Duck Informatics"`, `1`, `true`, `3.8` | exactly the 8 lines of the **example output** above |
| Canteen price `4.0` | `Canteen meal: 4.0` (a `double` always shows at least one digit after the dot) |
| Canteen price `2.50` | `Canteen meal: 2.5` (the 0 at the end is dropped) |
| First degree `false` | `First degree: false` |
| Gender `'d'` | `Gender: d` (no quotes in the output) |

Check every line for: label, colon, **one** space, value. 8 boxes in, 8 lines out.

## Your first try

What is already good:

- You chose a fitting box for every piece of data: text in `String`, the gender as a `char`, whole numbers in `int`, yes/no as `boolean`, the price as a `double`.
- Your names are camelCase and say what is inside. And you glued text and values with `+` and `\n`, an idea from exercise 01.

What is still open:

- Compare your output with the example output line by line: one of your boxes never appears on the screen, and some labels have no `: ` before the value.
- Read your box names out loud once: one has a letter missing, and one uses an English word that means something else (a prize is what you win, a price is what you pay).

## Little helpers

<details>
<summary>Java says "incompatible types: String cannot be converted to char"</summary>

You put a text (`"m"`, double quotes) into a `char` box. A `char` takes one letter in **single** quotes: `'m'`.

</details>

<details>
<summary>Java says "&lt;identifier&gt; expected" at the price line</summary>

You wrote the price with a comma: `3,8`. Java only understands the dot: `3.8`. The comma means something else to Java.

</details>

<details>
<summary>My output says "Last name:Duck" with no space</summary>

The space belongs inside the quotes of the label: `"Last name: "`. The `+` glues without adding anything.

</details>

<details>
<summary>Should the gender be a char or a String?</summary>

Both are allowed by the sheet. It is exactly one letter (`m`, `w`, `d`), so `char` is the tighter fit. A `String` would also work. Just be consistent with the quotes: `'m'` for `char`, `"m"` for `String`.

</details>

## Done when

- [ ] With the Donald Duck values, your output is exactly the example output.
- [ ] Every box has a fitting type and a camelCase name that says what is inside.
- [ ] You can say for each box **why** you picked its type.
- [ ] You can explain your code out loud in your own words.

Next: [Task 02_2](../task-02-2-limits-of-long/README.md)
