class Square {
  constructor(x, y) {
    // Coordinates
    this.x = x;
    this.y = y;
  }
}

function createBoard() {
  const board = [];

  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      board.push(new Square(i, j));
    }
  }
  return board;
}

function connectBoard(board) {
  board.forEach((square) => {
    connectField(1, 2, square, board);
    connectField(1, -2, square, board);
    connectField(-1, 2, square, board);
    connectField(-1, -2, square, board);
    connectField(2, 1, square, board);
    connectField(2, -1, square, board);
    connectField(2, 1, square, board);
    connectField(-2, -1, square, board);
  });
}

function connectField(xMod, yMod, square, board) {
  const xPos = square.x + xMod;
  const yPos = square.y + yMod;
  if (xPos < 9 && yPos < 9 && xPos > 0 && yPos > 0) {
    board.forEach((el) => {
      if (el.x === xPos && el.y === yPos) {
        if (square[`${xPos}, ${yPos}`]) return;

        square[`${xPos}, ${yPos}`] = el;
        el[`${square.x}, ${square.y}`] = square;
      }
    });
  }
}

const board = createBoard();
connectBoard(board);
console.log(board);
