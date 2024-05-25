export const TETROMINOS = {
  0: {
    name: "0",
    shape: [[0]],
    color: "0, 0, 0",
  },
  I: {
    name: "I",
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "255, 255, 255",
  },

  J: {
    name: "J",
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "36, 95, 223",
  },

  L: {
    name: "L",
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "223, 173, 36",
  },

  O: {
    name: "O",
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },

  S: {
    name: "S",
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56",
  },

  T: {
    name: "T",
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    color: "132, 61, 198",
  },

  Z: {
    name: "Z",
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227, 78, 78",
  },
};

export const randomTetrominoName = () => {
  const tetrominos = "IJLOSTZ";
  return tetrominos[Math.floor(Math.random() * tetrominos.length)];
};

export const tetrominoByName = (name) => TETROMINOS[name];

export const randomTetromino = () => TETROMINOS[randomTetrominoName()];
