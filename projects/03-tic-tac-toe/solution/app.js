// Tic-tac-toe for two players on one screen.
// The 2D array `board` is the truth. The page only shows what the array says.

const EMPTY = '-';

// 1. Find the elements on the page.
const statusText = document.querySelector('#status');
const resetButton = document.querySelector('#reset');
const cells = document.querySelectorAll('.cell');

// 2. The game state.
let board = newBoard();
let currentPlayer = 'x';
let gameOver = false;

function newBoard() {
  return [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
}

// 3. Three cells in a line win when they hold the same mark and are not empty.
function sameMark(a, b, c) {
  return a !== EMPTY && a === b && b === c;
}

// Returns 'x' or 'o' for the winner, or null when nobody has won.
function checkWin(board) {
  for (let r = 0; r < 3; r++) {
    if (sameMark(board[r][0], board[r][1], board[r][2])) return board[r][0];
  }
  for (let c = 0; c < 3; c++) {
    if (sameMark(board[0][c], board[1][c], board[2][c])) return board[0][c];
  }
  if (sameMark(board[0][0], board[1][1], board[2][2])) return board[1][1];
  if (sameMark(board[0][2], board[1][1], board[2][0])) return board[1][1];
  return null;
}

// A draw: no empty cell is left (and nobody has won, which we check first).
function checkDraw(board) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === EMPTY) return false;
    }
  }
  return true;
}

// 4. One move: guards first, then state, then screen, then win, draw, next player.
function play(cell) {
  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);

  if (gameOver) return;
  if (board[row][col] !== EMPTY) return;

  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer.toUpperCase();

  const winner = checkWin(board);
  if (winner) {
    statusText.textContent = 'Player ' + winner.toUpperCase() + ' wins!';
    gameOver = true;
    return;
  }

  if (checkDraw(board)) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  statusText.textContent = 'Player ' + currentPlayer.toUpperCase() + "'s turn";
}

// 5. Start again: reset the state and clear the screen.
function reset() {
  board = newBoard();
  currentPlayer = 'x';
  gameOver = false;
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  statusText.textContent = "Player X's turn";
}

// 6. One listener per cell, one for the reset button.
cells.forEach((cell) => {
  cell.addEventListener('click', () => play(cell));
});
resetButton.addEventListener('click', reset);
