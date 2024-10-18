const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const winnerMessage = document.getElementById("winner-message");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !isGameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    const winningCombo = getWinningCombo();
    highlightWinningCells(winningCombo);
    showWinnerMessage(`Pemain ${currentPlayer} menang!`);
    isGameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    showWinnerMessage("Permainan berakhir seri!");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return board[index] === currentPlayer;
    });
  });
}

function getWinningCombo() {
  return winningConditions.find((condition) => {
    return condition.every((index) => {
      return board[index] === currentPlayer;
    });
  });
}

function highlightWinningCells(combo) {
  combo.forEach((index) => {
    cells[index].style.backgroundColor = "#ffd700";
    cells[index].style.color = "#1a1a1a";
  });
}

function showWinnerMessage(message) {
  winnerMessage.textContent = message;
  winnerMessage.classList.add("animate__animated", "animate__fadeInUp");
  setTimeout(() => {
    winnerMessage.classList.add("animate__pulse");
    winnerMessage.style.animation = "pulse 2s infinite";
  }, 1000);
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
    cell.style.color = "";
  });
  winnerMessage.textContent = "";
  winnerMessage.classList.remove("animate__animated", "animate__fadeInUp", "animate__pulse");
  winnerMessage.style.animation = "";
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
