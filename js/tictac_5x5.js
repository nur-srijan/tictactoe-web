let board = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];
let currentPlayer = "X";
let gameOver = false;

function checkWin(board, player) {
    // Check rows for 4 consecutive squares
    for (let row of board) {
        for (let i = 0; i <= 1; i++) {
            if (row.slice(i, i + 4).every(cell => cell === player)) return true;
        }
    }

    // Check columns for 4 consecutive squares
    for (let col = 0; col < 5; col++) {
        for (let i = 0; i <= 1; i++) {
            const column = Array.from({length: 4}, (_, row) => board[row + i][col]);
            if (column.every(cell => cell === player)) return true;
        }
    }

    // Check main diagonals for 4 consecutive squares
    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
            if ([0, 1, 2, 3].every(k => board[i + k][j + k] === player)) return true;
        }
    }

    // Check anti-diagonals for 4 consecutive squares
    for (let i = 0; i <= 1; i++) {
        for (let j = 4; j >= 1; j--) {
            if ([0, 1, 2, 3].every(k => board[i + k][j - k] === player)) return true;
        }
    }

    return false;
}

function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== ""));
}

function evaluate(board) {
    // Check immediate wins/losses
    if (checkWin(board, "O")) return 1000;  // Increased weight for winning
    if (checkWin(board, "X")) return -1000; // Increased weight for losing

    // Check threats
    let score = 0;
    score += evaluateThreats(board, "O", 20);   // Computer threats
    score -= evaluateThreats(board, "X", 100);  // Player threats (much higher priority for blocking)
    
    return score;
}

function evaluateThreats(board, player, weight) {
    let threats = 0;

    // Helper function to count threats in a segment
    function checkSegment(segment) {
        const playerCount = segment.filter(cell => cell === player).length;
        const emptyCount = segment.filter(cell => cell === "").length;
        // Increase threat level based on number of player's marks
        if (emptyCount > 0) {
            if (playerCount === 3) threats += 3;  // Critical threat
            if (playerCount === 2) threats += 1;  // Potential threat
        }
    }

    // Check rows
    for (let row of board) {
        for (let i = 0; i <= 1; i++) {
            checkSegment(row.slice(i, i + 4));
        }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
        for (let i = 0; i <= 1; i++) {
            const column = Array.from({length: 4}, (_, row) => board[row + i][col]);
            checkSegment(column);
        }
    }

    // Check main diagonals
    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 1; j++) {
            const diagonal = [0, 1, 2, 3].map(k => board[i + k][j + k]);
            checkSegment(diagonal);
        }
    }

    // Check anti-diagonals
    for (let i = 0; i <= 1; i++) {
        for (let j = 4; j >= 1; j--) {
            const diagonal = [0, 1, 2, 3].map(k => board[i + k][j - k]);
            checkSegment(diagonal);
        }
    }

    return threats * weight;
}

function minimax(board, depth, isMaximizing, alpha = -Infinity, beta = Infinity, maxDepth = 5) {
    const score = evaluate(board);
    if (Math.abs(score) >= 1000) return score;  // Terminal state
    if (isBoardFull(board)) return 0;
    if (depth >= maxDepth) return score;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
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
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
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

    // First check for immediate winning moves or blocking moves
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (board[row][col] === "") {
                // Check if this move blocks opponent's win
                board[row][col] = "X";
                if (checkWin(board, "X")) {
                    board[row][col] = "O";
                    return buttonClick(row, col);
                }
                board[row][col] = "";

                // Check if this move wins
                board[row][col] = "O";
                if (checkWin(board, "O")) {
                    return buttonClick(row, col);
                }
                board[row][col] = "";
            }
        }
    }

    // If no immediate threats, use minimax
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
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
        button.classList.remove('x');      // Remove X color class
        button.classList.remove('o');      // Remove O color class
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
