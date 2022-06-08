const player = {
	turn: true,
	winner: -1,
};

const board = [
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

			if (!target) return;
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
	previous = -1;
	count = 0;
	for (row in board) {
		for (col in row) {
			if (count == 4) player.winner = previous;
			if (board[row][col] == previous && previous != -1) count++;
			else {
				count = 0;
				previous = board[row][col];
			}
		}
		count = 0;
		previous = board[row][col];
	}

	for (row in board) {
		for (col in row) {
			if (count == 4) player.winner = previous;
			if (board[col][row] == previous && previous != -1) count++;
			else {
				count = 0;
				previous = board[col][row];
			}
		}
		count = 0;
		previous = board[col][row];
	}

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3 - row; col++) {
			if (
				board[row][col] != -1 &&
				board[row][col] == board[row + 1][col + 1] &&
				board[row][col] == board[row + 1][col + 1] &&
				board[row][col] == board[row + 2][col + 2] &&
				board[row][col] == board[row + 3][col + 3]
			) {
				player.winner = board[row][col];
			}
		}
	}

	for (let row = 0; row < 3; row++) {
		for (let col = 6; col > row + 3; col++) {
			if (
				board[row][col] != -1 &&
				board[row][col] == board[row + 1][col - 1] &&
				board[row][col] == board[row + 1][col - 1] &&
				board[row][col] == board[row + 2][col - 2] &&
				board[row][col] == board[row + 3][col - 3]
			) {
				player.winner = board[row][col];
			}
		}
	}
};

const start = () => {
	drawGrid();
	refreshCSS();
};
