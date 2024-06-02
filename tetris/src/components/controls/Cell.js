import { memo } from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../../tools";

const Cell = ({ type, sideLength }) => (
  <StyledCell
    type={type}
    sideLength={sideLength}
    color={TETROMINOS[type].color}
  />
);

export default memo(Cell);
