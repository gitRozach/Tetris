import { memo } from 'react';
import { StyledCell, StyledCellToDelete } from './styles/StyledCell';
import { TETROMINOS } from '../../tetrominos';

const Cell = ({ type, sideLength }) => (
    type === 'X' ? <StyledCellToDelete 
                        type={type} 
                        sideLength={sideLength} 
                        color={TETROMINOS[type].color} 
                    /> : 
                    <StyledCell 
                        type={type} 
                        sideLength={sideLength} 
                        color={TETROMINOS[type].color} 
                    />
)

export default memo(Cell);