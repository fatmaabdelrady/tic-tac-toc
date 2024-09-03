const wrapper = document.getElementById("wrapper");

// classList - object
// className - string

wrapper.classList.add("wrapper");



const container = document.createElement("div");
const restartBtn = document.createElement
("button");

container.className = "container";
restartBtn.id = "restart";
restartBtn.textContent = "Restart";

let myTurn = true; // X starts the game
let board = ["", "", "", "", "", "", "", "", ""]; // Keeps track of the board
let gameOver = false; // Keeps track if the game is over

document.getElementById("new-game").addEventListener("click", newGame);

restartBtn.addEventListener("click", resetGame);

for (let i = 0; i < 9; i++) {
	const btn = document.createElement("button");
	btn.classList.add("button-option");
	btn.addEventListener("click", function (e) {
		if (!gameOver && btn.textContent === "") {
			btn.textContent = myTurn ? "X" : "O";
			board[i] = myTurn ? "X" : "O";
			checkWinner();
			myTurn = !myTurn;
		}
	});
	container.append(btn);
}

wrapper.append(container);
wrapper.append(restartBtn);

function checkWinner() {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (const combination of winningCombinations) {
		const [a, b, c] = combination;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			document.getElementById("message").textContent = `Player ${board[a]} Wins!`;
			gameOver = true;
			return;
		}
	}

	// Check for draw
	if (!board.includes("")) {
		document.getElementById("message").textContent = "It's a Draw!";
		gameOver = true;
	}
}

function resetGame() {
	// Reset board state and UI
	board = ["", "", "", "", "", "", "", "", ""];
	const buttons = container.querySelectorAll(".button-option");
	buttons.forEach(btn => btn.textContent = "");
	document.getElementById("message").textContent = "Sample Message";
	gameOver = false;
	myTurn = true; // X always starts first
}

function newGame() {
	resetGame();
	document.getElementById("message").textContent = "New Game Started!";
}
