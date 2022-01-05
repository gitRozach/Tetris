import { createStage, checkCollision } from "../tetrisTools";
import sounds from "../soundtracks/Tetris_Soundtrack_1.mp3";

// Base Components
import Display from "./Display";
import Input from "./Input";
import Stage from "./Stage";
import Button from "./Button";
import AltButton from "./AltButton";
import Menu from "./Menu";
import SwiperMenu from "./SwiperMenu";

// Animations
import { motion } from 'framer-motion'

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Hooks
import { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";
import { useSound } from "../hooks/useSound";
import { useHighscoreStorage } from "../hooks/useStorage";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [overlayContent, setOverlayContent] = useState(null);

    const [player, updatePlayerPos, spawnPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, spawnPlayer);
    const [username, setUsername, score, setScore, rows, setRows, level, setLevel, gameStarted, setGameStarted, gameOver, setGameOver, paused, setPaused] = useGameStatus(rowsCleared);
    const [playSoundtrack] = useSound([sounds]);
    const [storage, firestore, storedHighscores] = useHighscoreStorage('users');
    const [inputValue, inputComponent] = Input();

    const startGame = (playerUsername) => {
        setUsername(playerUsername ? playerUsername : "Unknown Username");
        setDropTime(1000);
        setStage(createStage());
        spawnPlayer();
        
        setGameOver(false);
        setGameStarted(true);
        setPaused(false);
        setScore(0);
        setRows(0);
        setLevel(0);
        playSoundtrack(0);
        
        focusMainComponent();

    }

    const resumeGame = () => {
        setPaused(false);
        focusMainComponent();
    }

    const restartGame = () => {
        startGame(username); 
        setPaused(false);
        focusMainComponent();
    }

    const exitGame = () => {
        setGameOver(false);
        setGameStarted(false);
        setPaused(false);
    }

    const focusMainComponent = (componentId = 'tetris-wrapper') => {
        document.getElementById(componentId).focus(); 
    }

    useEffect(() => {
        focusMainComponent();
    }, []);

    useInterval(() => {
        if (paused || gameOver || !gameStarted) return; 
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
                return;
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const keyUp = ({ keyCode }) => {
        if (gameOver || !gameStarted || paused) return;

        if (keyCode === 40) {
            setDropTime(1000 / (level + 1) + 200);
        }
    }

    const keyDown = ({ keyCode }) => {
        /* Escape-Key-Handling */
        if (keyCode === 27) /*Escape*/ {
            // If there is an overlay, close the overlay first
            if(overlayContent) {
                setOverlayContent(null);
            } else {
                // Focus the tetris wrapper to for key events
                if(paused) focusMainComponent();
                // Close the pause menu if there is no overlay showing
                setPaused(prev => !prev);
            }
        }
        /* Start-Game-Menu Key-Handling */
        if (!gameStarted) {
            if (keyCode === 13) /*Enter*/ {
                startGame(username);
            }
        }
        if (!gameOver && !paused && gameStarted) { 
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
            id="tetris-wrapper"
            role="button" 
            tabIndex="0" 
            onKeyDown={e => keyDown(e)} 
            onKeyUp={e => keyUp(e)}>
            
            <StyledTetris>
                {!gameStarted && <Menu items={[
                    inputComponent,
                    <AltButton text="Start Game" iconUrl="https://img.icons8.com/glyph-neue/64/000000/play.png" callback={() => startGame(username)}/>,
                    <AltButton text="Settings" iconUrl="https://img.icons8.com/material/50/000000/settings--v5.png" callback={() => setOverlayContent(<SwiperMenu />)} />,
                    <AltButton text="About" iconUrl="https://img.icons8.com/material/50/000000/info--v1.png" callback={() => setOverlayContent(<SwiperMenu />)} />,
                ]} />}

                {gameOver && <Menu items={[
                    <Display text="Game Over"/>,
                    <Display text={'Username: ' + username}/>,
                    <Display text={'Score: ' + score}/>,
                    <AltButton text="Restart" iconUrl="https://img.icons8.com/glyph-neue/50/000000/replay.png" callback={restartGame}/>,
                    <AltButton text="Settings" iconUrl="https://img.icons8.com/material/50/000000/settings--v5.png" callback={() => setOverlayContent(<SwiperMenu />)}/>,
                    <AltButton text="About" iconUrl="https://img.icons8.com/material/50/000000/info--v1.png" callback={() => setOverlayContent(<SwiperMenu />)} />,
                    <AltButton text="Exit" iconUrl="https://img.icons8.com/material-outlined/50/000000/cancel--v1.png" callback={exitGame}/>,
                ]}/>}

                {paused && !gameOver && gameStarted && <aside><Menu items={[
                    <AltButton text="Resume" iconUrl="https://img.icons8.com/glyph-neue/64/000000/play.png" callback={resumeGame}/>,
                    <AltButton text="Settings" iconUrl="https://img.icons8.com/material/50/000000/settings--v5.png" callback={() => setOverlayContent(<SwiperMenu />)} />,
                    <AltButton text="Restart" iconUrl="https://img.icons8.com/glyph-neue/50/000000/replay.png" callback={restartGame} />,
                    <AltButton text="About" iconUrl="https://img.icons8.com/material/50/000000/info--v1.png" callback={() => setOverlayContent(<SwiperMenu />)} />,
                    <AltButton text="Exit" iconUrl="https://img.icons8.com/material-outlined/50/000000/cancel--v1.png" callback={exitGame} />,
                ]}/></aside>}

                {overlayContent && overlayContent}
                
                <Display text={`Level: ${level}`} />
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Stage stage={stage} />
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;