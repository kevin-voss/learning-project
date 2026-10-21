# Project 3: step by step

Seven small steps. After each step, save, reload the browser and test. Do not write the whole game first and test at the end.

**Brief:** [README](README.md) · **Stuck?** [Troubleshooting](help/troubleshooting.md)

## Step 0: open your desk

From the repo root:

```bash
cd projects/03-tic-tac-toe/starter
ls
```

You should see `index.html`, `style.css` and `app.js`. Open `index.html` in the browser and open the console (F12).

## Step 1: the board in HTML

> [!PICTURE]
> Each cell wears a name tag with its address: `data-row` and `data-col`. Later JavaScript reads the tag to know which cell was clicked.

Find `TODO 1` in `index.html`. Add 9 cells inside `<div class="board">`:

```html
<button class="cell" data-row="0" data-col="0"></button>
<button class="cell" data-row="0" data-col="1"></button>
<button class="cell" data-row="0" data-col="2"></button>
```

That is row 0. Add row 1 and row 2 the same way.

```text
0,0  0,1  0,2
1,0  1,1  1,2
2,0  2,1  2,2
```

You should see a 3×3 grid of empty squares. The CSS grid in `style.css` already lays them out.

## Step 2: find the cells and listen for clicks

Find both `TODO 2`s in `app.js`.

1. Find the elements. `querySelectorAll` gives you a list of all matching elements:

```js
const cells = document.querySelectorAll('.cell');
```

Do the same for `statusText` (`#status`) and `resetButton` (`#reset`) with `querySelector`.

2. You do not need 9 listeners by hand. Loop over the list:

```js
cells.forEach((cell) => {
  cell.addEventListener('click', () => play(cell));
});
```

Add the reset button's listener too (it calls `reset`).

You should see `clicked <button …>` in the console for every cell you click.

## Step 3: place a mark

> [!PICTURE]
> The **state** is everything the game must remember right now: what is on the board (`board`), whose turn it is (`currentPlayer`) and whether the game has ended (`gameOver`). It is already at the top of `app.js`.

A 2D array is an array of rows. You read and write one cell with two numbers:

```js
board[1][1];        // the middle cell
board[0][2] = 'o';  // top right becomes 'o'
```

Find `TODO 3` in `play(cell)`. Replace the `console.log` with:

1. Read the address. `dataset` gives text, so turn it into a number:

```js
const row = Number(cell.dataset.row);
const col = Number(cell.dataset.col);
```

2. Two **guard clauses** stop the move early:

```js
if (gameOver) return;
if (board[row][col] !== EMPTY) return;
```

3. Change the state first, then the screen:

```js
board[row][col] = currentPlayer;
cell.textContent = currentPlayer.toUpperCase();
```

You should see an X in every cell you click. A second click on the same cell changes nothing. Type `board` in the console: the array has `'x'` where you clicked.

## Step 4: take turns

At the end of `play`, switch the player and tell the players whose turn it is:

```js
if (currentPlayer === 'x') {
  currentPlayer = 'o';
} else {
  currentPlayer = 'x';
}
statusText.textContent = 'Player ' + currentPlayer.toUpperCase() + "'s turn";
```

> [!NOTE]
> The short form is `currentPlayer = currentPlayer === 'x' ? 'o' : 'x';`. It means the same.

You should see X, then O, then X … and the status line follows along.

## Step 5: who won?

There are 8 ways to win: 3 rows, 3 columns, 2 diagonals.

```text
rows         columns      diagonals
X X X        X . .        X . .    . . X
. . .        X . .        . X .    . X .
. . .        X . .        . . X    X . .
```

Find the two `TODO 5`s.

1. `sameMark(a, b, c)` returns true when all three are equal **and** not empty:

```js
return a !== EMPTY && a === b && b === c;
```

2. `checkWin(board)` returns `'x'`, `'o'` or `null`. Use one loop for the rows and one for the columns:

```js
for (let r = 0; r < 3; r++) {
  if (sameMark(board[r][0], board[r][1], board[r][2])) return board[r][0];
}
```

Write the column loop yourself (the column number stays, the row changes). Then check the two diagonals by hand. If nothing matched, `return null`.

3. In `play`, right **after** you show the mark and **before** you switch the player:

```js
const winner = checkWin(board);
if (winner) {
  statusText.textContent = 'Player ' + winner.toUpperCase() + ' wins!';
  gameOver = true;
  return;
}
```

You should see "Player X wins!" after three X in a row, and no more marks after that. Test a row, a column and both diagonals, for X and for O.

## Step 6: a draw

A draw means: nobody won and no cell is empty. Find `TODO 6` in `checkDraw`. Walk over every cell with two loops, one inside the other:

```js
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    // if board[r][c] is EMPTY, return false
  }
}
return true;
```

In `play`, after the win check: if `checkDraw(board)` is true, show "It's a draw!", set `gameOver = true` and `return`.

You should see "It's a draw!" when the board is full and nobody has three in a line. Try this order: X 0,0 · O 0,1 · X 0,2 · O 1,1 · X 1,0 · O 1,2 · X 2,1 · O 2,0 · X 2,2.

## Step 7: new game

Find `TODO 7` in `reset()`. Put everything back to the start, the state **and** the screen:

```js
board = newBoard();
currentPlayer = 'x';
gameOver = false;
cells.forEach((cell) => {
  cell.textContent = '';
});
statusText.textContent = "Player X's turn";
```

You should see an empty board after a click on **New game**, and X starts again.

## Done

Check every box under "Done when" in the [README](README.md). Then compare with the [solution](solution/).

Save your work:

```bash
git add projects/03-tic-tac-toe/starter
git commit -m "Finish project 3: tic-tac-toe"
git push
```

> [!TRY]
> Want more? The [extra challenges](help/troubleshooting.md#extra-challenges) are at the end of the troubleshooting page.
