import { memo } from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../../tetrominos";

export const CellStatus = {
  CLEAR: "clear",
  MERGED: "merged",
};

export const CellType = {
  EMPTY_CELL: 0,
};

const Cell = ({ type, sideLength }) => (
  <StyledCell
    type={type}
    sideLength={sideLength}
    color={TETROMINOS[type].color}
  />
);

export default memo(Cell);
