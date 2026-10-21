# Tic-tac-toe: troubleshooting

Something does not work? Find your problem below. Back to the [step-by-step guide](../step-by-step.md).

## Clicks do nothing

- Open the console (F12). A red error stops all code after it.
- Is the script loaded with `defer`? Without it, `querySelectorAll('.cell')` runs before the cells exist and finds nothing.
- Do your cells have `class="cell"` (not `class="cells"`)?

## Clicking the top-left cell does not give `0 0`

`dataset` always gives **text**:

```js
cell.dataset.row;         // "0"  (text)
Number(cell.dataset.row); // 0    (number)
```

Turn it into a number with `Number(...)`.

## `=` is not `===`

```js
if (board[0][0] = 'x') { }   // wrong: this PUTS 'x' into the cell
if (board[0][0] === 'x') { } // right: this COMPARES
```

## An empty row counts as a win

Three empty cells are also equal. Test that the first cell is not empty:

```js
a !== EMPTY && a === b && b === c
```

## The message names the wrong winner

You switched the player before the win check. The order is: place the mark → check the winner → then switch.

## The game goes on after a win

After a win or a draw, set `gameOver = true` and `return`. The first line of `play` must stop when `gameOver` is true.

## New game does not work

Reset **all three** pieces of state (`board`, `currentPlayer`, `gameOver`) **and** the screen (every cell's text and the status line).

## Debugging tips

Log what the code sees, one small step at a time:

```js
console.log('row:', row, 'col:', col);
console.log('player:', currentPlayer);
console.table(board);
console.log('winner:', checkWin(board));
```

`console.table(board)` prints the 2D array as a small grid.

## Extra challenges

Only after the game works:

1. Colour X and O differently (add a class to the cell).
2. Keep a score for X, O and draws.
3. Highlight the three winning cells.
4. Let the players type their names.
5. A computer player that picks a random empty cell.
