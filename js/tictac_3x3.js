// This file contains the JavaScript logic for the Tic Tac Toe 3x3 game, handling game mechanics, player interactions, and win conditions.

let board = [["", "", ""], ["", "", ""], ["", "", ""]];
let currentPlayer = "X";
let gameOver = false;

function checkWin(board, player) {
    // Check rows
    for (let row of board) {
        if (row.every(cell => cell === player)) return true;
    }
    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board.every(row => row[col] === player)) return true;
    }
    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false;
}

function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== ""));
}

function evaluate(board) {
    if (checkWin(board, "O")) return 1;
    if (checkWin(board, "X")) return -1;
    return 0;
}

function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) {
    const score = evaluate(board);
    if (score === 1 || score === -1) return score;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === "") {
                    board[row][col] = "O";
                    bestScore = Math.max(bestScore, minimax(board, depth + 1, false, alpha, beta));
                    board[row][col] = "";
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === "") {
                    board[row][col] = "X";
                    bestScore = Math.min(bestScore, minimax(board, depth + 1, true, alpha, beta));
                    board[row][col] = "";
                    beta = Math.min(beta, bestScore);
                    if (beta <= alpha) break;
                }
            }
        }
        return bestScore;
    }
}

function computerMove() {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "") {
                board[row][col] = "O";
                const score = minimax(board, 0, false);
                board[row][col] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { row, col };
                }
            }
        }
    }

    if (bestMove) {
        const { row, col } = bestMove;
        buttonClick(row, col);
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll(".cell");
    buttons.forEach(button => button.disabled = true);
}

function resetGame() {
    board = [["", "", ""], ["", "", ""], ["", "", ""]];
    currentPlayer = "X";
    gameOver = false;
    const buttons = document.querySelectorAll(".cell");
    buttons.forEach(button => {
        button.textContent = "";
        button.disabled = false;
    });
}

function buttonClick(row, col) {
    if (board[row][col] === "" && !gameOver) {
        board[row][col] = currentPlayer;
        const button = document.getElementById(`button-${row}-${col}`);
        button.textContent = currentPlayer;
        button.classList.add('marked'); // Add animation class
        button.classList.add(currentPlayer.toLowerCase()); // Add player-specific color

        if (checkWin(board, currentPlayer)) {
            gameOver = true;
            disableAllButtons();
            alert(`Player ${currentPlayer} wins!`);
            return;
        }

        if (isBoardFull(board)) {
            gameOver = true;
            disableAllButtons();
            alert("It's a tie!");
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        
        if (currentPlayer === "O" && !gameOver) {
            setTimeout(computerMove, 500); // Add delay for better UX
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.createElement("div");
    gameBoard.className = "game-board";
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const button = document.createElement("button");
            button.id = `button-${row}-${col}`;
            button.className = "cell";
            button.addEventListener("click", () => buttonClick(row, col));
            gameBoard.appendChild(button);
        }
    }

    const resetButton = document.createElement("button");
    resetButton.id = "reset-button";
    resetButton.textContent = "Reset";
    resetButton.addEventListener("click", resetGame);

    document.body.appendChild(gameBoard);
    document.body.appendChild(resetButton);
});