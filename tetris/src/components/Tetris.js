import { createStage, checkCollision } from "../tetrisTools";
import sounds from "../soundtracks/Tetris_Soundtrack_1.mp3";

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
import { useGameStatus } from "../hooks/useGameStatus";
import { useSound } from "../hooks/useSound";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, spawnPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, spawnPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
    const [playSoundtrack] = useSound([sounds])

    const startGame = () => {
        setDropTime(1000);
        setStage(createStage());
        spawnPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
        playSoundtrack(0);
    }

    useInterval(() => {
        drop();
    }, dropTime);

    const drop = () => {
        // Increase level and reduce drop time after each 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

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
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) { 
            if (keyCode === 37) /*Arrow Left*/ {
                movePlayer(-1);
            } else if (keyCode === 39) /*Arrow Right*/ {
                movePlayer(1);
            } else if (keyCode === 40) /*Arrow Down*/ {
                dropPlayer();
            } else if (keyCode === 38) /*Arrow Up*/ {
                rotatePlayer(stage, 1);
            }
        }
    }

    const movePlayer = (direction) => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0 });
        }
    }

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={e => move(e)} 
            onKeyUp={e => keyUp(e)}>
            
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver && <Display gameOver text="Game Over"/>}
                        
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;