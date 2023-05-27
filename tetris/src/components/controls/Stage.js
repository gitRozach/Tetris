import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';

const Stage = ({ stage, cellSize, animatedColor }) => (
    <StyledStage width={stage[0].length} height={stage.length} animatedColor={animatedColor}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} sideLength={`${cellSize}px`}/>))}
    </StyledStage>
)

export default Stage;