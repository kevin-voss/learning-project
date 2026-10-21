# Project 3: Tic-tac-toe

Build the game for two players on one screen. X and O take turns on a 3×3 board. The game sees who wins, sees a draw, and starts again with one click.

> [!PICTURE]
> An egg box with 3 rows of 3 holes. To find one egg you say the **row** and the **column**: "row 1, column 2". In JavaScript the egg box is a **2D array**: an array of 3 rows, and each row is an array of 3 cells. `board[1][2]` is row 1, column 2.

## What you build

- A 3×3 board you can click.
- X starts. Players take turns. A taken cell cannot change.
- Three in a row, column or diagonal wins. A full board with no winner is a draw.
- After the game ends, clicks do nothing until you press **New game**.

## New in this project

| New skill | You already know |
|-----------|------------------|
| Game state: variables that say what is going on right now | DOM and click events (project 2) |
| A 2D array: `board[row][col]` | Arrays and loops (drills) |
| A win check with loops | `if`, functions (drills) |

## What you need to know

- [Project 2: shopping list](../02-shopping-list-web/README.md): `querySelector`, `addEventListener`, "the array is the truth"
- [DOM and events](../../sheets/javascript/dom.md) if you need a reminder
- [Arrays](../../drills/javascript/arrays/README.md) and [loops](../../drills/javascript/loops/README.md) drills

A word you do not know? Look it up in the [glossary](../../sheets/start/glossary.md).

## How this folder works

| File or folder | What it is for |
|----------------|----------------|
| [step-by-step.md](step-by-step.md) | The build guide in seven steps. Each ends with "You should see …" |
| [starter/](starter/) | **Your desk.** `style.css` is ready. `index.html` and `app.js` have numbered `TODO`s |
| [solution/](solution/) | One finished game. Peek only when you are done or really stuck |
| [help/troubleshooting.md](help/troubleshooting.md) | Common bugs, debugging tips and extra challenges |

## The one big rule

> [!NOTE]
> **The 2D array is the truth. The board on the screen is a mirror.** On every click, change the array first. Then make the screen show it.

```text
click a cell
  → get row and col
  → game over? cell taken? then stop
  → board[row][col] = currentPlayer
  → show the mark in the cell
  → winner? then stop
  → draw? then stop
  → switch player
```

## Done when

- [ ] A 3×3 board appears and every cell can be clicked.
- [ ] A click on an empty cell places the current player's mark. X and O take turns.
- [ ] A taken cell cannot be overwritten.
- [ ] All 3 rows, all 3 columns and both diagonals win.
- [ ] A full board with no winner shows a draw.
- [ ] After a win or a draw, clicks on the board do nothing.
- [ ] **New game** empties the board and X starts again.
- [ ] Your work is committed and pushed on your branch.

> [!CHECK]
> 1. Which cell is `board[2][0]`?
>    <details><summary>Answer</summary>Row 2, column 0: the bottom-left cell. Counting starts at 0.</details>
> 2. Why must the win check also test that the cell is not empty?
>    <details><summary>Answer</summary>Three empty cells are also "the same". Without the test, an empty row would count as a win.</details>
> 3. Why do you check for a winner **before** you switch the player?
>    <details><summary>Answer</summary>The player who just moved is the one who can win. If you switch first, the message names the wrong player.</details>

## Next

Start the [step-by-step guide](step-by-step.md). After this game, the path goes on with how the web works, then [Project 4: weather dashboard](../04-weather-dashboard/README.md).
