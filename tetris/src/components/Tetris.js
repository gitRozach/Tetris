import { createStage, checkCollision } from "../tetrisTools";

// Base Components
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Hooks
import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, spawnPlayer, rotatePlayer] = usePlayer(setGameOver);
    const [stage, setStage, rowsCleared] = useStage(player, spawnPlayer);

    const startGame = () => {
        setDropTime(1000);
        setStage(createStage());
        spawnPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game Over
            if(player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) { 
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                rotatePlayer(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    const movePlayer = (direction) => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0 });
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={e => keyUp(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver && <Display gameOver text="Game Over"/>}
                        
                    <div>
                        <Display text="Score" />
                        <Display text={rowsCleared} />
                        <Display text="Level" />
                    </div>
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;