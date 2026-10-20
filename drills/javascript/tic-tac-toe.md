# Build Tic Tac Toe: JavaScript Logic Practice

Goal: build a simple Tic Tac Toe game with HTML, CSS, and JavaScript.

The UI can be ugly. The real goal is to practice:

- 2D arrays
- DOM selectors
- click events
- state updates
- `if` / `else`
- loops
- functions
- win and draw logic

By the end, two players should be able to click a 3x3 board, take turns placing `X` and `O`, and the game should detect wins, draws, and resets.

## The Big Idea

Your game has two parts:

- **State**: the real data of the game in JavaScript
- **DOM**: what the user sees on the screen

Important rule:

> The 2D array is the truth. The HTML is only a visual mirror.

When a player clicks a cell:

1. Check if the move is allowed.
2. Update the array.
3. Update the screen.
4. Check if someone won.
5. Check if it is a draw.
6. Switch to the next player.

## 1. Understand The Board

A normal array is a list:

```js
const fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[2]); // "cherry"
```

Array indexes start at `0`, not `1`.

A 2D array is an array inside another array. It is useful for grids.

```js
const map2d = [
  ["-", "-", "o"],
  ["-", "x", "-"],
  ["-", "-", "-"]
];
```

Think of it like this:

```txt
      col 0  col 1  col 2
row 0   -      -      o
row 1   -      x      -
row 2   -      -      -
```

You access a position with:

```js
map2d[row][column];
```

Examples:

```js
console.log(map2d[1][1]); // "x"
console.log(map2d[0][2]); // "o"
```

You change a position like this:

```js
map2d[0][1] = "x";
```

That means:

```txt
row 0, column 1 now contains "x"
```

For Tic Tac Toe, your board can start like this:

```js
let board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"]
];
```

`"-"` means the cell is empty.

## 2. Game State

State means: what is happening in the game right now?

For this game, you need:

```js
let board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"]
];

let currentPlayer = "x";
let gameOver = false;
```

Meaning:

- `board` stores all cell values
- `currentPlayer` stores whose turn it is
- `gameOver` stores whether the game is finished

## 3. Files To Create

Create one folder for your game:

```txt
tic-tac-toe/
  index.html
  style.css
  script.js
```

In `index.html`, connect the files:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
```

`defer` means the JavaScript waits until the HTML exists.

## 4. HTML Requirements

Your HTML needs:

- a title
- a status text, for example `Player X's turn`
- 9 clickable cells
- a reset button

Each cell should know its row and column.

Use `data-row` and `data-col`:

```html
<div class="cell" data-row="0" data-col="0"></div>
<div class="cell" data-row="0" data-col="1"></div>
<div class="cell" data-row="0" data-col="2"></div>
```

For the full board, you need 9 cells:

```txt
0,0  0,1  0,2
1,0  1,1  1,2
2,0  2,1  2,2
```

Checkpoint:

- You can see 9 cells on the page.
- They do not need to do anything yet.

## 5. CSS Requirements

Use CSS Grid to make the board 3x3.

General example:

```css
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 4px;
}

.cell {
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.cell:hover {
  background: #eee;
}
```

Checkpoint:

- The board looks like a 3x3 grid.
- Each cell is clickable-looking.

## 6. Select DOM Elements

JavaScript needs to find the HTML elements.

General examples:

```js
const statusText = document.querySelector("#status");
const resetButton = document.querySelector("#reset");
const cells = document.querySelectorAll(".cell");
```

`querySelector` gives you one element.

`querySelectorAll` gives you a list of elements.

## 7. Add Click Events

You do not need 9 separate event listeners.

Loop over all cells:

```js
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    console.log("cell clicked");
  });
});
```

Checkpoint:

- Clicking any cell logs a message in the browser console.

## 8. Read Row And Column From A Clicked Cell

`data-row` and `data-col` are available in JavaScript through `dataset`.

```js
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    console.log(row, col);
  });
});
```

Important:

```js
cell.dataset.row; // "0" as a string
Number(cell.dataset.row); // 0 as a number
```

Checkpoint:

- Clicking the top-left cell logs `0 0`.
- Clicking the center cell logs `1 1`.
- Clicking the bottom-right cell logs `2 2`.

## 9. The Move Flow

When a player clicks a cell, follow this order:

```txt
click cell
  -> get row and col
  -> if game is over, stop
  -> if cell is already filled, stop
  -> update board[row][col]
  -> update the clicked cell text
  -> check win
  -> check draw
  -> switch player
```

This order matters.

## 10. Guard Clauses

A guard clause stops a function early.

General example:

```js
function buyTicket(age) {
  if (age < 18) {
    return "Too young";
  }

  return "Ticket bought";
}
```

For Tic Tac Toe, use guards like:

```js
if (gameOver) return;
if (board[row][col] !== "-") return;
```

Meaning:

- if the game ended, ignore the click
- if the cell is already taken, ignore the click

## 11. Place A Move

After the guards, update the state first:

```js
board[row][col] = currentPlayer;
```

Then update the screen:

```js
cell.textContent = currentPlayer.toUpperCase();
```

Example:

```js
// Player x clicks row 1, col 1
board[1][1] = "x";
cell.textContent = "X";
```

Checkpoint:

- Clicking an empty cell places `X`.
- Clicking the next empty cell places `O`.
- Players should alternate turns.
- A filled cell cannot be changed.

## 12. Switch Players

After a valid move, switch turns:

```js
if (currentPlayer === "x") {
  currentPlayer = "o";
} else {
  currentPlayer = "x";
}
```

Short version:

```js
currentPlayer = currentPlayer === "x" ? "o" : "x";
```

Also update the status text:

```js
statusText.textContent = "Player " + currentPlayer.toUpperCase() + "'s turn";
```

## 13. Win Logic

There are 8 possible wins:

```txt
Rows:
0,0 0,1 0,2
1,0 1,1 1,2
2,0 2,1 2,2

Columns:
0,0 1,0 2,0
0,1 1,1 2,1
0,2 1,2 2,2

Diagonals:
0,0 1,1 2,2
0,2 1,1 2,0
```

A winning line means:

- all 3 values are the same
- the value is not `"-"`

General row check:

```js
if (
  board[0][0] === board[0][1] &&
  board[0][1] === board[0][2] &&
  board[0][0] !== "-"
) {
  console.log("row 0 wins");
}
```

Do not forget `board[0][0] !== "-"`.

Without that check, this would count as a win:

```js
["-", "-", "-"]
```

## 14. Make A `checkWin` Function

Your `checkWin` function should answer one question:

```txt
Did someone win?
```

Suggested return value:

- return `"x"` if X wins
- return `"o"` if O wins
- return `null` if nobody wins

Function shape:

```js
function checkWin(board) {
  // check rows
  // check columns
  // check diagonals
  // return null if nobody won
}
```

Hints:

- For rows, the row changes: `board[r][0]`, `board[r][1]`, `board[r][2]`
- For columns, the column changes: `board[0][c]`, `board[1][c]`, `board[2][c]`
- For diagonals, write the two checks manually

Use loops for rows and columns:

```js
for (let r = 0; r < 3; r++) {
  // check row r
}

for (let c = 0; c < 3; c++) {
  // check column c
}
```

Checkpoint:

- X can win with a row.
- O can win with a row.
- X can win with a column.
- O can win with a column.
- Diagonal wins work too.

## 15. Check Win Before Switching Player

This is important.

Correct order:

```txt
player places move
check if that player won
then switch player
```

If you switch first, your message may say the wrong player won.

Example flow:

```js
board[row][col] = currentPlayer;
cell.textContent = currentPlayer.toUpperCase();

const winner = checkWin(board);

if (winner) {
  statusText.textContent = "Player " + winner.toUpperCase() + " wins!";
  gameOver = true;
  return;
}

currentPlayer = currentPlayer === "x" ? "o" : "x";
```

## 16. Draw Logic

A draw means:

- nobody won
- no empty cells are left

Function shape:

```js
function checkDraw(board) {
  // loop through every row and column
  // if you find "-", return false
  // if you finish the loops, return true
}
```

Nested loop example:

```js
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    console.log(board[r][c]);
  }
}
```

Use that idea to search for empty cells.

Checkpoint:

- If all cells are full and nobody won, show a draw message.
- No more moves should be possible after a draw.

## 17. Reset Logic

The reset button should:

- reset the 2D array
- set `currentPlayer` back to `"x"`
- set `gameOver` back to `false`
- clear every cell in the DOM
- reset the status text

General example:

```js
resetButton.addEventListener("click", () => {
  console.log("reset clicked");
});
```

Resetting the board state:

```js
board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"]
];
```

Clearing all cells:

```js
cells.forEach((cell) => {
  cell.textContent = "";
});
```

Checkpoint:

- After reset, the board is empty.
- X starts again.
- The game accepts clicks again.

## Final Specs

Your game is finished when:

- a 3x3 board appears
- clicking an empty cell places the current player's symbol
- players alternate between X and O
- a filled cell cannot be overwritten
- all 3 row wins work
- all 3 column wins work
- both diagonal wins work
- draw detection works
- no moves are possible after the game ends
- reset starts a new game

## Common Bugs

### `dataset` gives strings

```js
cell.dataset.row; // "0"
Number(cell.dataset.row); // 0
```

Convert with `Number(...)`.

### `=` is not the same as `===`

Wrong:

```js
if (board[0][0] = "x") {
  // This assigns "x"
}
```

Right:

```js
if (board[0][0] === "x") {
  // This compares with "x"
}
```

### Empty cells can accidentally look like a win

Wrong:

```js
board[0][0] === board[0][1] && board[0][1] === board[0][2]
```

Right:

```js
board[0][0] !== "-" &&
board[0][0] === board[0][1] &&
board[0][1] === board[0][2]
```

### Checking win after switching player

Wrong order:

```txt
place move
switch player
check winner
```

Correct order:

```txt
place move
check winner
switch player
```

## Debugging Tips

Use the browser console often:

```js
console.log("row:", row);
console.log("col:", col);
console.log("currentPlayer:", currentPlayer);
console.log("board:", board);
console.log("winner:", checkWin(board));
```

Debug one small step at a time.

Do not write the whole game first and test at the end.

## Extra Challenges

Only try these after the base game works:

- highlight the winning 3 cells
- keep score for X, O, and draws
- add a small animation when a symbol appears
- let the user choose player names
- make a simple computer opponent that picks a random empty cell

## One Sentence Summary

Store the real game in the 2D array, then update the DOM to show what the array says.
