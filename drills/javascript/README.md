# How the drills work

> [!PICTURE]
> A workbook with a strict but friendly teacher. Each page has small gaps to fill in. The moment you hand it in, the teacher marks every gap: a green tick or a red cross with a hint. You fix the red ones and hand it in again.

## The idea

Each drill is a folder with one topic. You fill gaps in `tasks.js`. Small test programs in `tasks.test.js` check your answers in a second. Green means right. Red means "not yet", with a hint.

| File | What it is |
|------|------------|
| `README.md` | The idea of the topic, with a tiny example |
| `tasks.js` | The gaps you fill in. **You only edit this file** |
| `tasks.test.js` | The teacher. Do not change it |
| `solutions.js` | One possible answer. Look only when you are stuck |

## Every task is a function

Every task in `tasks.js` looks like this:

```javascript
export function rectangleArea(width, height) {
  // TODO: write your code here
  return 0;
}
```

You replace the inside with your own code. The tests call your function with some values and look at what comes back.

> [!PICTURE]
> **A function is a vending machine.** Values go in through the slots in the brackets: here `width` and `height`. The machine does its work inside the curly braces. **One value comes out** with `return`. Without `return`, nothing comes out, and the test sees `undefined`.

```javascript
export function rectangleArea(width, height) {
  const area = width * height;
  return area;          // this value comes out of the machine
}
```

You learn more about functions in their own drill later. For now: read the inputs, compute, `return` the answer. (`export` just lets the test file use your function.)

## 1. Install Bun

**Bun** runs JavaScript in the terminal, without a browser. It also runs the tests. Website: [bun.sh](https://bun.sh).

macOS or Linux:

```bash
curl -fsSL https://bun.sh/install | bash
```

Windows (PowerShell):

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Close the terminal, open a new one, and check:

```bash
bun --version
```

You should see a version number like `1.2.23`.

## 2. Run one file

So far you ran `console.log('Hello')` in the browser console. Now run it from a file.

1. Make a new file `hello.js` (for example on your Desktop) with this line: `console.log('Hello');`
2. In the terminal, go to that folder and run:

```bash
bun hello.js
```

You should see: `Hello`. That is all `bun file.js` does: it runs the file from top to bottom.

## 3. Run the tests

Open a terminal in the **project folder** (the one with the `Makefile`). Then:

```bash
make variables            # every task in the variables drill
make variables-task-03    # only task 3
```

No `make` on your computer (common on Windows)? Use Bun directly:

```bash
bun test ./drills/javascript/variables/
bun test ./drills/javascript/variables/tasks.test.js --test-name-pattern variables-task-03
```

## 4. Read red and green

A failing task (red) looks like this:

```text
HINT: Multiply width and height with the '*' operator.

Expected: 20
Received: 0

(fail) variables-task-01: rectangleArea > multiplies width and height
```

- `HINT` tells you what to try.
- `Expected` is what the test wanted. `Received` is what your function returned.
- `0` here means you have not changed `return 0;` yet.

A passing task (green) looks like this:

```text
 1 pass
 0 fail
```

At the start, every task is red. That is normal. Your job is to turn them green, one at a time.

> [!TRY]
> 1. Run `make variables-task-01`. You should see one red `(fail)`.
> 2. Open `drills/javascript/variables/tasks.js`. In Task 1, change `return 0;` to `return width * height;`.
> 3. Save and run `make variables-task-01` again.
> You should see: `1 pass` and `0 fail`.

## The order

Do the drills in this order. Two short lessons sit in between.

1. [Variables](variables/README.md)
2. [Math](math/README.md)
3. [Strings](strings/README.md)
4. Lesson: [True or false: and, or, not](../../tracks/computer-science/index.html#logical-operators)
5. [If / else](conditionals/README.md)
6. [Loops](loops/README.md)
7. [Arrays](arrays/README.md)
8. Lesson: [Arrays: a shelf with numbered boxes](../../tracks/computer-science/index.html#arrays)
9. [Functions](functions/README.md)
10. [Objects](objects/README.md)

A drill is done when `make <topic>` shows `0 fail`.

> [!CHECK]
> 1. Which file do you edit?
>    <details><summary>Answer</summary>Only `tasks.js`. The test file is the teacher; leave it alone.</details>
> 2. A test says `Expected: 6` and `Received: undefined`. What is the most likely mistake?
>    <details><summary>Answer</summary>The function has no `return`. Nothing came out of the vending machine.</details>
> 3. How do you run only task 4 of the math drill?
>    <details><summary>Answer</summary>`make math-task-04` in the project folder.</details>

**Next:** [Drill: variables](variables/README.md)
