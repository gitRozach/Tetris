export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const ROOT_COMPONENT_ID = "tetris-wrapper";

export const CellStatus = {
  CLEAR: "clear",
  MERGED: "merged",
};

export const CellType = {
  EMPTY: 0,
  I: "I",
  J: "J",
  L: "L",
  O: "O",
  S: "S",
  T: "T",
  Z: "Z",
};

export const calculatePlayerDropTime = (level) => {
  return 1000 / (level + 1) + 200;
};

export const formatDateDDMMYYYY = (date) => {
  const currentDate = new Date(date);
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join(".");
};

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array(STAGE_WIDTH).fill([CellType.EMPTY, CellStatus.CLEAR])
  );

export const focusComponent = (componentId) => {
  document.getElementById(componentId).focus();
};

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; ++y) {
    for (let x = 0; x < player.tetromino[y].length; ++x) {
      // 1. Check we're on an actual tetromino cell
      if (player.tetromino[y][x] !== CellType.EMPTY) {
        // 2. Check our move is inside the game areas height (y)
        if (
          !stage[y + player.pos.y + moveY] ||
          // 3. Check our move is inside the game areas width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4. Check the cell we're moving is not set to 'clear'
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            CellStatus.CLEAR
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

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

export const randomTetrominoType = () => {
  //const tetrominos =
  const tetrominos =
    CellType.I +
    CellType.J +
    CellType.L +
    CellType.O +
    CellType.S +
    CellType.T +
    CellType.Z;
  return tetrominos[Math.floor(Math.random() * tetrominos.length)];
};

export const tetrominoByName = (name) => TETROMINOS[name];

export const randomTetromino = () => TETROMINOS[randomTetrominoType()];

export const formatMillisecondsToHHMMSS = (milliseconds) => {
  let totalSeconds = milliseconds / 1000;

  let hours = parseInt(totalSeconds / 3600);
  let minutes = parseInt((totalSeconds % 3600) / 60);
  let seconds = parseInt((totalSeconds % 3600) % 60);

  // Insert leading zeros if needed
  let hoursStr = ("00" + hours).slice(-2);
  let minutesStr = ("00" + minutes).slice(-2);
  let secondsStr = ("00" + seconds).slice(-2);

  return hours > 0
    ? `${hoursStr}:${minutesStr}:${secondsStr}`
    : `${minutesStr}:${secondsStr}`;
};
