import styled from "styled-components";
import { CellType } from "../Cell";

export const StyledCell = styled.div`
  width: ${(props) => (props.sideLength ? props.sideLength : "30px")};
  height: ${(props) => (props.sideLength ? props.sideLength : "30px")};
  box-sizing: border-box;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) =>
    props.type === CellType.EMPTY_CELL
      ? "0px solid"
      : props.sideLength
      ? "calc(" + props.sideLength + " / 7.5) solid"
      : "4px solid"};
  border-bottom-color: rgba(${(props) => props.color}, 0.1);
  border-right-color: rgba(${(props) => props.color}, 1);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-left-color: rgba(${(props) => props.color}, 0.3);
`;
