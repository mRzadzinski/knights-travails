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
    connectSquare(1, 2, square, board);
    connectSquare(1, -2, square, board);
    connectSquare(-1, 2, square, board);
    connectSquare(-1, -2, square, board);
    connectSquare(2, 1, square, board);
    connectSquare(2, -1, square, board);
    connectSquare(2, 1, square, board);
    connectSquare(-2, -1, square, board);
  });
}

function connectSquare(xMod, yMod, square, board) {
  const xPos = square.x + xMod;
  const yPos = square.y + yMod;
  // If it's a legal move
  if (xPos < 9 && yPos < 9 && xPos > 0 && yPos > 0) {
    // Find element and connect
    board.forEach((el) => {
      if (el.x === xPos && el.y === yPos) {
        if (square[`${xPos}, ${yPos}`]) return;

        square[`${xPos}, ${yPos}`] = el;
        el[`${square.x}, ${square.y}`] = square;
      }
    });
  }
}

function knightMoves(from, to, board) {
  let start;
  let end;

  // Get square objects from coords
  board.forEach((square) => {
    if (square.x === +from.slice(0, 1) && square.y === +from.slice(1)) {
      start = square;
      start.prevMove = null;
    }
    if (square.x === +to.slice(0, 1) && square.y === +to.slice(1)) {
      end = square;
    }
  });

  const path = [];
  const queue = [start];

  while (queue.length !== 0) {
    const tempNode = queue.shift();

    // Get neighbors
    const neighbors = [];
    Object.entries(tempNode).forEach((neighbor) => {
      if (neighbor[0] !== 'x' && neighbor[0] !== 'y') {
        neighbors.push(neighbor[1]);
      }
    });

    // Scan neighbors
    for (let i = 0; i < 8; i++) {
      if (!neighbors[i]) break;
      if (typeof neighbors[i] !== 'object') continue;
      if (neighbors[i].prevMove || neighbors[i].prevMove === null) continue;

      // Save path to previous node
      neighbors[i].prevMove = tempNode;
      queue.push(neighbors[i]);

      // Success
      if (neighbors[i] === end) {
        let node = neighbors[i];

        // Get the path from end to start
        while (node.prevMove !== null) {
          path.push(node);
          node = node.prevMove;
        }
        path.push(start);
        path.reverse();

        console.log(
          `You made it in ${path.length - 1} moves! \nHere is your path: `
        );
        // eslint-disable-next-line no-loop-func
        path.forEach((el) => {
          if (el === start) {
            console.log(`${el.x}, ${el.y} <- start`);
          } else if (el === end) {
            console.log(`${el.x}, ${el.y} <- finish`);
          } else {
            console.log(`${el.x}, ${el.y}`);
          }
        });
        return;
      }
    }
  }
}

const board = createBoard();
connectBoard(board);
knightMoves([1, 1], [8, 8], board);
