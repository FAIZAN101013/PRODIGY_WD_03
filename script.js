const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false;
            statusText.textContent = `Player ${gameBoard[a]} wins!`;
            return;
        }
    }
    
    if (!gameBoard.includes("")) {
        isGameActive = false;
        statusText.textContent = "It's a draw!";
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] !== "" || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (isGameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = "Player X's turn";
    
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
