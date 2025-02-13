let board = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
let currentPlayer = "X";
let gameOver = false;

function checkWin(board, player) {
    // Check rows for 4 consecutive squares
    for (let row of board) {
        for (let i = 0; i < 1; i++) {
            if (row.slice(i, i + 4).every(cell => cell === player)) return true;
        }
    }

    // Check columns for 4 consecutive squares
    for (let col = 0; col < 4; col++) {
        for (let i = 0; i < 1; i++) {
            if (Array.from({length: 4}, (_, row) => board[row][col]).every(cell => cell === player)) return true;
        }
    }

    // Check diagonals for 3 consecutive squares
    for (let i = 0; i < 2; i++) {
        if ([0, 1, 2].every(j => board[i + j][i + j] === player)) return true;
        if ([0, 1, 2].every(j => board[i + j][3 - i - j] === player)) return true;
    }

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

function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity, maxDepth = 5) {
    const score = evaluate(board);
    if (score === 1 || score === -1) return score;
    if (isBoardFull(board)) return 0;
    if (depth >= maxDepth) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === "") {
                    board[row][col] = "O";
                    bestScore = Math.max(bestScore, minimax(board, depth + 1, false, alpha, beta, maxDepth));
                    board[row][col] = "";
                    alpha = Math.max(alpha, bestScore);
                    if (beta <= alpha) break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === "") {
                    board[row][col] = "X";
                    bestScore = Math.min(bestScore, minimax(board, depth + 1, true, alpha, beta, maxDepth));
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

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === "") {
                board[row][col] = "O";
                const score = minimax(board, 0, false, -Infinity, Infinity, 5);
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
        button.classList.remove('marked'); // Remove animation class
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
            setTimeout(computerMove, 500);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.createElement("div");
    gameBoard.className = "game-board";
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
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

function resetGame() {
    // Refresh the entire page
    location.reload();
}
