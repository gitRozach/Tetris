import { createStage, checkCollision } from "../tetrisTools";

// Base Components
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Hooks
import { useState } from "react";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    const moveTetromino = (direction) => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0 });
        }
    }

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        }
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) { 
            if (keyCode === 37) {
                moveTetromino(-1);
            } else if (keyCode === 39) {
                moveTetromino(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver && <Display gameOver text="Game Over"/>}
                        
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;