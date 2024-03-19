"use strict";
const mainBox = document.querySelector(".mainBox");
const gridSize = 3;

let xTurn = false;
let board = new Array(gridSize * gridSize).fill("");
// console.log(board);

for (let i = 0; i < gridSize * gridSize; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.index = i;
  mainBox.appendChild(square);
}

mainBox.addEventListener("click", (event) => {
  const clickedSquare = event.target;
  if (
    !clickedSquare.classList.contains("square") ||
    board[clickedSquare.dataset.index] !== ""
  )
    return;

  const squareIndex = parseInt(clickedSquare.dataset.index);

  xTurn = !xTurn;
  if (xTurn) {
    clickedSquare.textContent = "X";
    board[squareIndex] = "X";
  } else {
    clickedSquare.textContent = "O";
    board[squareIndex] = "O";
  }

  // Checking winner
  if (checkWin("X")) {
    alert("Player X wins!");
    resetGame();
  } else if (checkWin("O")) {
    alert("Player O wins!");
    resetGame();
  } else if (isBoardFull()) {
    alert("No Winner");
    resetGame();
  }
});

function checkWin(player) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  return board.every((square) => square !== "");
}

function resetGame() {
  for (let i = 0; i < board.length; i++) {
    board[i] = "";
    const square = mainBox.children[i];
    square.textContent = "";
  }
}
