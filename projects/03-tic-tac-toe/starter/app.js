// Tic-tac-toe for two players on one screen.
// The 2D array `board` is the truth. The page only shows what the array says.
// Follow step-by-step.md. Each TODO number is one step.

const EMPTY = '-';

// TODO 2: find the status text (#status), the reset button (#reset)
//         and all cells (.cell, use querySelectorAll).
const statusText = null;
const resetButton = null;
const cells = [];

// The game state.
let board = newBoard();
let currentPlayer = 'x';
let gameOver = false;

// A fresh 3×3 board: 3 rows, each with 3 empty cells.
function newBoard() {
  return [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
}

// TODO 5: return true when a, b and c are the same mark AND a is not EMPTY.
function sameMark(a, b, c) {
  return false;
}

// TODO 5: return 'x' or 'o' when that player has 3 in a line, otherwise null.
//   - a loop for the 3 rows:    board[r][0], board[r][1], board[r][2]
//   - a loop for the 3 columns: board[0][c], board[1][c], board[2][c]
//   - the 2 diagonals by hand
function checkWin(board) {
  return null;
}

// TODO 6: return false as soon as you find an EMPTY cell (two nested loops).
//         If the loops finish, the board is full: return true.
function checkDraw(board) {
  return false;
}

// TODO 3 and 4: one move.
//   3: read row and col from cell.dataset (turn them into numbers with Number)
//      stop (return) if the game is over or the cell is not EMPTY
//      write currentPlayer into board[row][col] and show it in the cell
//   4: switch currentPlayer and update the status text
//   5: before switching, check for a winner
//   6: then check for a draw
function play(cell) {
  console.log('clicked', cell);
}

// TODO 7: reset the board, currentPlayer and gameOver, empty every cell,
//         and set the status text back to "Player X's turn".
function reset() {
}

// TODO 2: give every cell a click listener that calls play(cell),
//         and give the reset button a click listener that calls reset.
