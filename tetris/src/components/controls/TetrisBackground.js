import { memo } from 'react';
import Cell from "./Cell";
import { StyledTetrisBackground } from "./styles/StyledTetrisBackground";
import { StyledStage } from "./styles/StyledStage";
import { randomTetrominoName } from '../../tetrominos';

const BACKGROUND_WIDTH = 50;
const BACKGROUND_HEIGHT = 50;
const TetrisBackgroundCells = [];

for (let y = 0; y < BACKGROUND_HEIGHT; ++y) {
    let currentRow = [];
    for (let x = 0; x < BACKGROUND_WIDTH; ++x) {
        currentRow.push([randomTetrominoName(), 'collided']);
    }
    TetrisBackgroundCells.push(currentRow);
}

const TetrisBackground = ({animated}) => (
    <StyledTetrisBackground animated={animated}>
        <StyledStage width={TetrisBackgroundCells[0].length} height={TetrisBackgroundCells.length}>
            {TetrisBackgroundCells.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} sideLength="70px" />))}
        </StyledStage>
    </StyledTetrisBackground>
);

export default memo(TetrisBackground);