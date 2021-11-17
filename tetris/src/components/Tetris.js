import { createStage, checkCollision } from "../tetrisTools";
import sounds from "../soundtracks/Tetris_Soundtrack_1.mp3";

// Base Components
import Display from "./Display";
import Stage from "./Stage";
import Button from "./Button";
import Menu from "./Menu";

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
    const [paused, setPaused] = useState(false);

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
        if (paused || gameOver) return; 
        drop();
    }, dropTime);

    const movePlayer = (directionX) => {
        if (!checkCollision(player, stage, { x: directionX, y: 0 })) {
            updatePlayerPos({ x: directionX, y: 0 });
        }
    }

    const drop = () => {
        // Increase level and reduce drop time after each 10 rows
        if (rows >= (level + 1) * 10) {
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

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const keyDown = ({ keyCode }) => {
        if (keyCode === 27) /*Escape*/ {
            setPaused(prev => !prev);
        }
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

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={e => keyDown(e)} 
            onKeyUp={e => keyUp(e)}
            autoFocus>
            
            <StyledTetris>
                <aside>
                    {gameOver && <Menu />}
                    {paused && !gameOver && <Menu items={[
                        <Button text="Resume" callback={() => setPaused(false)}/>,
                        <Button text="Settings"/>,
                        <Button text="About"/>,
                        <Button text="Restart" callback={() => {startGame(); setPaused(false);}}/>,
                    ]}/>}
                        
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                </aside>
                <Stage stage={stage}/>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;