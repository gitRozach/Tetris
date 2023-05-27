import { useState, useCallback } from 'react';
import { STAGE_WIDTH } from '../tetrisTools';
import { TETROMINOS, randomTetromino } from '../tetrominos';
import { checkCollision } from '../tetrisTools';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (matrix, direction) => {
        // Rotate the rows so the rows are columns (transponse)
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]),);
        // Reverse each row to get a rotated matrix
        if (direction > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    const rotatePlayer = (stage, direction) => {
        const playerClone = JSON.parse(JSON.stringify(player));
        playerClone.tetromino = rotate(playerClone.tetromino, direction);

        const position = playerClone.pos.x;
        let offset = 1;
        
        // Neccessary for not overriding existing tetrominos by rotating
        while (checkCollision(playerClone, stage, { x: 0, y: 0 })) {
            playerClone.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            
            // If rotating is not allowed at this point (collision with other tetromino), rotate it back
            if (offset > playerClone.tetromino[0].length) {
                rotate(playerClone.tetromino, -direction);
                playerClone.pos.x = position;
                return;
            }            
        }

        setPlayer(playerClone);
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { 
                x: (prev.pos.x += x), 
                y: (prev.pos.y += y), 
            },
            collided: collided,
        }));
    } 

    const spawnPlayer = useCallback(() => {
        const newPlayer = {
            pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        };
        setPlayer(newPlayer);
    }, []);

    return [player, updatePlayerPos, spawnPlayer, rotatePlayer];
}