const player = {
	turn: true,
	winner: -1,
};

let board = [
	[-1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1],
	[-1, -1, -1, -1, -1, -1, -1],
];

const column = [7, 1, 2, 3, 4, 5, 6];

const drawGrid = () => {
	const grid = document.getElementById("grid");

	for (i = 0; i < 42; i++) {
		const cell = document.createElement("div");
		cell.id = "cell";
		cell.className = i + 1;
		cell.addEventListener("click", (e) => {
			const col = column[parseInt(e.target.className) % 7];
			let target = undefined;

			for (j = 5; j > -1; j--) {
				if (
					document.getElementsByClassName(col + j * 7)[1].style
						.backgroundColor == ""
				) {
					target = document.getElementsByClassName(col + j * 7)[1];
					break;
				}
			}

			if (!target || player.winner != -1) return;
			board[j][col - 1] = +player.turn;
			if (player.turn) {
				target.style.backgroundColor = "#d13143";
				document.getElementById("heading").innerHTML = "Player 2 Go";
			} else {
				target.style.backgroundColor = "#e9dc5e";
				document.getElementById("heading").innerHTML = "Player 1 Go";
			}
			player.turn = !player.turn;

			checkWinner();
			if (player.winner == 0) {
				document.getElementById("heading").innerHTML =
					"Player 2 Wins, click reset";
			} else if (player.winner == 1) {
				document.getElementById("heading").innerHTML =
					"Player 1 Wins, click reset";
			}
		});

		const circle = document.createElement("div");
		circle.id = "circle";
		circle.className = i + 1;
		cell.appendChild(circle);
		grid.appendChild(cell);
	}
};

const refreshCSS = () => {
	document.getElementById("style").href = "./index.css";
};

const reset = () => {
	player.turn = true;
	player.winner = -1;
	for (i = 1; i < 43; i++) {
		document.getElementsByClassName(i)[1].style.backgroundColor = "";
	}
	board = [
		[-1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1],
	];
	document.getElementById("heading").innerHTML = "Player 1 Go";
};

const toggle = () => {
	text = document.getElementById("mode");
	if (text.innerHTML == "PvP") {
		text.innerHTML = "PvE";
	} else {
		text.innerHTML = "PvP";
	}
};

const checkWinner = () => {
	// check rows and columns
	for (i = 0; i < 6; i++) {
		for (j = 0; j < 4; j++) {
			if (
				board[i][j] == board[i][j + 1] &&
				board[i][j] == board[i][j + 2] &&
				board[i][j] == board[i][j + 3]
			) {
				if (board[i][j] != -1) {
					player.winner = board[i][j];
				}
			}
		}
	}
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 7; j++) {
			if (
				board[i][j] == board[i + 1][j] &&
				board[i][j] == board[i + 2][j] &&
				board[i][j] == board[i + 3][j]
			) {
				if (board[i][j] != -1) {
					player.winner = board[i][j];
				}
			}
		}
	}

	// check ascending diagonals
	for (i = 3; i < 6; i++) {
		for (j = 0; j < 4; j++) {
			if (
				board[i][j] == board[i - 1][j + 1] &&
				board[i][j] == board[i - 2][j + 2] &&
				board[i][j] == board[i - 3][j + 3]
			) {
				if (board[i][j] != -1) {
					player.winner = board[i][j];
				}
			}
		}
	}
	// check descending diagonals
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 4; j++) {
			if (
				board[i][j] == board[i + 1][j + 1] &&
				board[i][j] == board[i + 2][j + 2] &&
				board[i][j] == board[i + 3][j + 3]
			) {
				if (board[i][j] != -1) {
					player.winner = board[i][j];
				}
			}
		}
	}
};

const start = () => {
	drawGrid();
	refreshCSS();
};
