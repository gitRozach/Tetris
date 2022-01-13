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
    
    const [usernameInputValue, usernameInputComponent] = Input({fontSize: "2.5rem"});
    const settingsSwiperMenu = SwiperMenu({swiperSlides: [<Menu items={[<Display text="Audio Settings" />]} />, <Menu items={[<Display text="Video Settings" />]} />], });
    const infoSwiperMenu = SwiperMenu({swiperSlides: [<Menu items={[<Display text="Info 1" />]} />, <Menu items={[<Display text="Info 2" />]} />], });

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
        startGame(usernameInputValue); 
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

        if (keyCode === 40) /*Arrow Down*/ {
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
                startGame(usernameInputValue);
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
                {!gameStarted && <Menu background="rgba(0, 0, 0, 1)" items={[
                    <Display text="REACTETRIS" fontSize="5rem" margin="0 0 10rem 0"/>,
                    <Display text="PLEASE ENTER YOUR USERNAME" />,
                    usernameInputComponent,
                    <AltButton text="Start Game" margin="10rem 0rem 20px 0rem" iconUrl="https://img.icons8.com/glyph-neue/64/000000/play.png" callback={() => startGame(usernameInputValue)}/>,
                    <AltButton text="Settings" iconUrl="https://img.icons8.com/material/50/000000/settings--v5.png" callback={() => setOverlayContent(settingsSwiperMenu)} />,
                    <AltButton text="About" iconUrl="https://img.icons8.com/material/50/000000/info--v1.png" callback={() => setOverlayContent(infoSwiperMenu)} />,
                ]} />}

                {gameOver && <Menu background="rgba(0, 0, 0, 1)" items={[
                    <Display text="GAME OVER"/>,
                    <Display text={usernameInputValue}/>,
                    <Display text={'SCORE: ' + score} />,
                    <AltButton text="Restart" margin="10rem 0rem 20px 0rem" iconUrl="https://img.icons8.com/glyph-neue/50/000000/replay.png" callback={restartGame}/>,
                    <AltButton text="Settings" iconUrl="https://img.icons8.com/material/50/000000/settings--v5.png" callback={() => setOverlayContent(settingsSwiperMenu)}/>,
                    <AltButton text="About" iconUrl="https://img.icons8.com/material/50/000000/info--v1.png" callback={() => setOverlayContent(infoSwiperMenu)} />,
                    <AltButton text="Exit" iconUrl="https://img.icons8.com/material-outlined/50/000000/cancel--v1.png" callback={exitGame}/>,
                ]}/>}

                {paused && !gameOver && gameStarted && <aside><Menu background="rgba(0, 0, 0, 1)" items={[
                    <Display text="REACTETRIS" fontSize="5rem" margin="0 0 10rem 0"/>,
                    <AltButton text="Resume" iconUrl="https://img.icons8.com/glyph-neue/64/000000/play.png" callback={resumeGame}/>,
                    <AltButton text="Settings" iconUrl="https://img.icons8.com/material/50/000000/settings--v5.png" callback={() => setOverlayContent(settingsSwiperMenu)} />,
                    <AltButton text="Restart" iconUrl="https://img.icons8.com/glyph-neue/50/000000/replay.png" callback={restartGame} />,
                    <AltButton text="About" iconUrl="https://img.icons8.com/material/50/000000/info--v1.png" callback={() => setOverlayContent(infoSwiperMenu)} />,
                    <AltButton text="Exit" iconUrl="https://img.icons8.com/material-outlined/50/000000/cancel--v1.png" callback={exitGame} />,
                ]}/></aside>}

                {overlayContent}
                
                {gameStarted && <><Display text={`SCORE: ${score}`} fontSize='1.8rem' />
                <Display text={`ROWS: ${rows}`} fontSize='1.8rem' />
                <Display text={`LEVEL: ${level}`} fontSize='1.8rem' />
                <Stage stage={stage} /></>}
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;