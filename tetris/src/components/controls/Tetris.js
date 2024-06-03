// Audios
import sounds from "../../soundtracks/Tetris_Soundtrack_1.mp3";

// Views
import Settings from "../views/Settings";
import Info from "../views/Info";

// Images
import { ReactComponent as ArrowIconComponent } from "../../svg/arrow-light.svg";
import { ReactComponent as StatsIconComponent } from "../../svg/stats-light.svg";
import { ReactComponent as MenuIconComponent } from "../../svg/menu-light.svg";
import { ReactComponent as RotateIconComponent } from "../../svg/rotate-light.svg";
import { ReactComponent as DropIconComponent } from "../../svg/arrow-alt.svg";
import CloseIcon from "../../svg/close-circle.svg";
import InfoIcon from "../../svg/info-circle.svg";
import PlayIcon from "../../svg/play.svg";
import RestartIcon from "../../svg/restart-dark.svg";
import StatsIcon from "../../svg/stats-dark.svg";
import SettingsIcon from "../../svg/settings.svg";

// Base Components
import React from "react";
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import Stage from "./Stage";
import Button from "./Button";
import AltButton from "./AltButton";
import { Menu } from "./Menu";
import ConfirmationDialog from "../views/ConfirmationDialog";
import TetrisBackground from "./TetrisBackground";
import BlurryBackground from "./BlurryBackground";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

// Hooks
import { useState, useEffect, useCallback } from "react";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus as usePlayerProgress } from "../../hooks/usePlayerProgress";
import { useSound } from "../../hooks/useSound";

// Utils
import {
  createStage,
  checkCollision,
  formatMillisecondsToHHMMSS,
  STAGE_WIDTH,
  focusComponent,
  ROOT_COMPONENT_ID,
} from "../../tools";
import {
  TETROMINOS,
  randomTetromino,
  randomTetrominoType,
  tetrominoByName,
} from "../../tools";
import Statistics from "../views/Statistics";
import { CellStatus, CellType } from "../../tools";

// import {
//   KeyboardNavigatorBoard,
//   KeyboardNavigatorElement,
//   useKeyboardNavigator,
// } from "react-keyboard-navigator";

const Tetris = () => {
  // const { keyboardNavigator } = useKeyboardNavigator({
  //   // prevent the default page scrolling behavior when we are using the keyboard to switch the active state between components
  //   eventCallback: (evt) => evt.preventDefault(),
  // });

  const [overlayContent, setOverlayContent] = useState(null);
  const closeOverlay = () => setOverlayContent(null);

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    name: TETROMINOS[0].name,
    tetromino: TETROMINOS[0].shape,
    collided: false,
    droppingTillCollision: false
  });

  const [currentRowsCleared, setCurrentRowsCleared] = useState(0);
  const [username, setUsername, score, setScore, rows, setRows, blocks, setBlocks, level, setLevel] = usePlayerProgress(currentRowsCleared);
  const [dropTime, setDropTime] = useState(null);
  const [timePlayed, setTimePlayed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(createStage());

  const usernameInput = TextInput({
    id: "usernameInput",
    text: username,
    fontFamily: "Exo 2",
    fontSize: "1.6rem",
    onChange: (value) => setUsername(value),
  });

  const [soundtrackVolume, tetrisCellSideLength, tetrisGridAnimationColor, tetrisTextAnimationColor, settingsMenu] = Settings();
  const infoMenu = Info();
  const statsView = Statistics(username, score, rows, blocks, timePlayed);
  const restartGameDialog = ConfirmationDialog("Test", () => { closeOverlay(); startGame(username); }, closeOverlay);

  const settingsSwiperMenu = <Menu animated={false} background="rgb(0,0,0)" items={[settingsMenu]} />
  const infoSwiperMenu = <Menu animated={false} background="rgb(0,0,0)" items={[infoMenu]} />
  const statsSwiperMenu = <Menu animated={false} background="rgb(0,0,0)" items={[statsView]} />
  const restartGameConfirmationMenu = <Menu animated={false} background="rgb(0,0,0)" items={[restartGameDialog]} />

  const [audioElement, soundtrack, playSoundtrack] = useSound(
    [sounds],
    soundtrackVolume
  );

  const resetGameStats = () => {
    setTimePlayed(0);
    setScore(0);
    setRows(0);
    setLevel(0);
    setBlocks({ I: 0, J: 0, L: 0, O: 0, S: 0, T: 0, Z: 0 });
  }

  const startGame = async (playerUsername) => {
    resetGameStats();
    setUsername(playerUsername ? playerUsername : "");
    setDropTime(1000);
    setStage(createStage());
    setGameOver(false);
    setGameStarted(true);
    setPaused(false);

    await playSoundtrack(0);
    spawnPlayer();

    focusComponent(ROOT_COMPONENT_ID);
  };

  const resumeGame = () => {
    setPaused(false);
    focusComponent(ROOT_COMPONENT_ID);
  };

  const exitGame = () => {
    setTimePlayed(0);
    setBlocks({ I: 0, J: 0, L: 0, O: 0, S: 0, T: 0, Z: 0 });
    setGameOver(false);
    setGameStarted(false);
    setPaused(false);
  };

  const keyUpEventListener = useCallback(
    ({ keyCode }) => {
      if (keyCode === 40) {
        /*Arrow Down*/ if (gameOver || !gameStarted || paused) return;
        setDropTime(1000 / (level + 1) + 200);
      }

      /* Escape-Key-Handling */
      if (keyCode === 27) {
        // If there is an Overlay, close the Overlay first
        if (overlayContent !== null) {
          closeOverlay();
        } else {
          // Focus the tetris wrapper to for key events
          if (paused) {
            // Close the pause menu if there is no overlay showing
            setPaused(false);
            if (gameStarted) {
              focusComponent(ROOT_COMPONENT_ID);
            }
          } else {
            setPaused(true);
          }
        }
      }
      /* Start-Game-Menu Key-Handling */
      if (!gameStarted) {
        if (keyCode === 13) {
          /*Enter*/ startGame(username);
        }
      }
    },
    [gameOver, gameStarted, level, overlayContent, paused, username]
  );

  const keyDown = ({ keyCode }) => {
    if (!gameOver && !paused && gameStarted) {
      if (keyCode === 37) {
        /*Arrow Left*/ movePlayer(-1);
      } else if (keyCode === 39) {
        /*Arrow Right*/ movePlayer(1);
      } else if (keyCode === 40) {
        /*Arrow Down*/ dropPlayer();
      } else if (keyCode === 38) {
        /*Arrow Up*/ rotatePlayerIfNotColliding(stage, 1);
      }
    }
  };

  useEffect(() => {
    const keyupEventListenerName = "keyup";
    window.addEventListener(keyupEventListenerName, keyUpEventListener);
    return () =>
      window.removeEventListener(keyupEventListenerName, keyUpEventListener);
  }, [keyUpEventListener]);

  useInterval(() => {
    if (paused || gameOver || !gameStarted) return;
    drop();
  }, dropTime);

  useInterval(() => {
    if (paused || gameOver || !gameStarted) return;
    setTimePlayed((prev) => prev + 1000);
  }, 1000);

  const movePlayer = (directionX) => {
    if (!checkCollision(player, stage, { x: directionX, y: 0 })) {
      updatePlayerPos({ x: directionX, y: 0 });
    }
  };

  const drop = () => {
    // Increase level and reduce drop time after each 10 rows
    if (rows >= (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1 && !player.droppingTillCollision) {
        setGameOver(true);
        setDropTime(null);
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true, droppingTillCollision: false });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const dropPlayerUntilCollided = () => {
    setPlayer({ ...player, droppingTillCollision: true });
    setDropTime(25);
  };

  const rotatePlayer = (playerMatrix, direction) => {
    // Rotate the rows so the rows are columns (transponse)
    const rotatedTetro = playerMatrix.map((_, index) =>
      playerMatrix.map((col) => col[index])
    );
    // Reverse each row to get a rotated matrix
    if (direction > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const rotatePlayerIfNotColliding = (stage, direction) => {
    const playerClone = JSON.parse(JSON.stringify(player));
    playerClone.tetromino = rotatePlayer(playerClone.tetromino, direction);

    const position = playerClone.pos.x;
    let offset = 1;

    // Neccessary for not overriding existing tetrominos by rotating
    while (checkCollision(playerClone, stage, { x: 0, y: 0 })) {
      playerClone.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      // If rotating is not allowed at this point (collision with other tetromino), rotate it back
      if (offset > playerClone.tetromino[0].length) {
        rotatePlayer(playerClone.tetromino, -direction);
        playerClone.pos.x = position;
        return;
      }
    }

    setPlayer(playerClone);
  };

  const updatePlayerPos = ({ x, y, collided, droppingTillCollision }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided: collided,
    }));
  };

  const spawnPlayer = useCallback(() => {
    const randomTetrominoBlockName = randomTetrominoType();
    const newPlayer = {
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      name: randomTetrominoBlockName,
      tetromino: tetrominoByName(randomTetrominoBlockName).shape,
      collided: false,
    };
    setPlayer(newPlayer);
  }, []);

  useEffect(() => {
    setCurrentRowsCleared(0);

    const sweepRows = (newStage) => {
      return newStage.reduce((ack, row) => {
        // If a row does not contain any empty cells, clear the row
        if (row.findIndex((cell) => cell[0] === CellType.EMPTY) === -1) {
          setCurrentRowsCleared((prev) => prev + 1);
          ack.unshift(
            Array(newStage[0].length).fill([
              CellType.EMPTY,
              CellStatus.CLEAR,
            ])
          );
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);
    };

    const updateStage = (prevStage) => {
      // Flush the stage before
      const newStage = prevStage.map((row) =>
        row.map((cell) =>
          cell[1] === CellStatus.CLEAR
            ? [CellType.EMPTY, CellStatus.CLEAR]
            : cell
        )
      );

      // Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== CellType.EMPTY) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? CellStatus.MERGED : CellStatus.CLEAR}`,
            ];
          }
        });
      });

      // Check tetromino collision
      if (player.collided) {
        const newBlocks = { ...blocks };
        newBlocks[player.name] = newBlocks[player.name] + 1;
        setBlocks(newBlocks);

        // Reset fast drop if collided
        setDropTime(rows >= 10 ? 1000 / (level + 1) + 200 : 1000);
        spawnPlayer();
        return sweepRows(newStage);
      }
      if (checkCollision(player, stage, { x: 0, y: 0 })) {
        setGameOver(true);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, spawnPlayer]);

  const openSettingsOverlay = () => {
    setOverlayContent(settingsSwiperMenu);
  };

  return (
    <StyledTetrisWrapper
      id="tetris-wrapper"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => keyDown(e)}
    >
      <StyledTetris>
        {audioElement}

        {!gameStarted && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <TetrisBackground animated={false} />
            <BlurryBackground
              blurColor={"rgba(0, 0, 0, 0.4)"}
              blurRadius="15px"
            />
            <Menu
              animated={false}
              keyPressedHandler={keyUpEventListener}
              items={[
                <TextOutput
                  key="start-game-menu"
                  animationColor="Fade"
                  text="REKTRIS"
                  fontFamily="Exo 2"
                  fontSize="7rem"
                />,
                <div
                  key="start-game-menu-username-input"
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "0 1rem",
                  }}
                >
                  <TextOutput
                    animationColor="White"
                    text="PLEASE ENTER YOUR USERNAME"
                    fontSize="1.6rem"
                    fontFamily="Exo 2"
                  />
                  {usernameInput}
                </div>,
                <div key="start-game-menu-controls"
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "0 1rem",
                  }}
                >
                  <AltButton
                    text="START"
                    iconUrl={PlayIcon}
                    iconWidth="2.2rem"
                    iconHeight="2.2rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => startGame(username)}
                  />
                  <AltButton
                    text="SETTINGS"
                    iconUrl={SettingsIcon}
                    iconWidth="1.9rem"
                    iconHeight="1.9rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => openSettingsOverlay()}
                  />
                  <AltButton
                    text="ABOUT"
                    iconUrl={InfoIcon}
                    iconWidth="2.2rem"
                    iconHeight="2.2rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => setOverlayContent(infoSwiperMenu)}
                  />
                </div>,
              ]}
            />
          </div>
        )}

        {gameOver && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <TetrisBackground animated={false}/>
            <BlurryBackground />
            <Menu
              animated
              keyPressedHandler={keyUpEventListener}
              background="rgba(0, 0, 0, 0.8)"
              items={[
                <div key="game-over-menu-outputs" className="game-over-container">
                  <TextOutput
                    animationColor="Fade"
                    text="GAME OVER"
                    fontFamily="Exo 2"
                    fontSize="7rem"
                    whiteSpace="wrap"
                  />
                  <TextOutput
                    animationColor="Fade"
                    text={`SCORE: ${score}`}
                    fontFamily="Exo 2"
                    fontSize="1.8rem"
                    whiteSpace="wrap"
                  />
                </div>,
                <div
                  key="game-over-menu-controls"
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "0 1rem",
                  }}
                >
                  <AltButton
                    text="RESTART"
                    iconUrl={RestartIcon}
                    iconWidth="1.7rem"
                    iconHeight="1.7rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => startGame(username)}
                  />
                  <AltButton
                    text="STATISTICS"
                    iconUrl={StatsIcon}
                    iconWidth="2.4rem"
                    iconHeight="2.4rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => setOverlayContent(statsSwiperMenu)}
                  />
                  <AltButton
                    text="SETTINGS"
                    iconUrl={SettingsIcon}
                    iconWidth="1.9rem"
                    iconHeight="1.9rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={openSettingsOverlay}
                  />
                  <AltButton
                    text="ABOUT"
                    iconUrl={InfoIcon}
                    iconWidth="2.2rem"
                    iconHeight="2.2rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => setOverlayContent(infoSwiperMenu)}
                  />
                  <AltButton
                    text="EXIT"
                    iconUrl={CloseIcon}
                    iconWidth="3rem"
                    iconHeight="3rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={exitGame}
                  />
                </div>,
              ]}
            />
          </div>
        )}

        {paused && !gameOver && gameStarted && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <TetrisBackground animated={false} />
            <BlurryBackground />
            <Menu
              animated={false}
              keyPressedHandler={keyUpEventListener}
              items={[
                <TextOutput
                  key="pause-menu-outputs"
                  animationColor="Fade"
                  text="REKTRIS"
                  fontFamily="Exo 2"
                  fontSize="7rem"
                />,
                <div
                  key="pause-menu-controls"
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "0 1rem",
                  }}
                >
                  <AltButton
                    text="RESUME"
                    iconUrl={PlayIcon}
                    iconWidth="2.2rem"
                    iconHeight="2.2rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={resumeGame}
                  />
                  <AltButton
                    text="STATISTICS"
                    iconUrl={StatsIcon}
                    iconWidth="2.4rem"
                    iconHeight="2.4rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => setOverlayContent(statsSwiperMenu)}
                  />
                  <AltButton
                    text="SETTINGS"
                    iconUrl={SettingsIcon}
                    iconWidth="1.9rem"
                    iconHeight="1.9rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={openSettingsOverlay}
                  />
                  <AltButton
                    text="RESTART"
                    iconUrl={RestartIcon}
                    iconWidth="1.7rem"
                    iconHeight="1.7rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => setOverlayContent(restartGameConfirmationMenu)}
                  />
                  <AltButton
                    text="ABOUT"
                    iconUrl={InfoIcon}
                    iconWidth="2.2rem"
                    iconHeight="2.2rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={() => setOverlayContent(infoSwiperMenu)}
                  />
                  <AltButton
                    text="EXIT"
                    iconUrl={CloseIcon}
                    iconWidth="2.2rem"
                    iconHeight="2.2rem"
                    fontFamily="Exo 2"
                    padding="0 0 0.2rem 0"
                    callback={exitGame}
                  />
                </div>,
              ]}
            />
          </div>
        )}

        {overlayContent}

        {gameStarted && (
          <>
            <div className="game-stats-container">
              <TextOutput
                animationColor={tetrisTextAnimationColor}
                text={`SCORE: ${score}`}
                fontFamily="Exo 2"
                fontSize="1.8rem"
              />
              <TextOutput
                animationColor={tetrisTextAnimationColor}
                text={`LEVEL: ${level + 1}`}
                fontFamily="Exo 2"
                fontSize="1.8rem"
              />
              <TextOutput
                animationColor={tetrisTextAnimationColor}
                text={`${formatMillisecondsToHHMMSS(timePlayed)}`}
                fontFamily="Exo 2"
                fontSize="1.8rem"
              />
            </div>
            <Stage
              animatedColor
              stage={stage}
              cellSize={tetrisCellSideLength}
              gridAnimationColor={tetrisGridAnimationColor}
            />
            <div className="game-controller-container">
              <Button borderRadius="50%"><StatsIconComponent width="2.5rem" height="auto" /></Button>
              <div className="game-controller">
                <Button
                  width="3rem"
                  borderRadius="50%"
                  callback={() => movePlayer(-1)}
                ><ArrowIconComponent
                    width="2rem"
                    height="auto"
                    style={{ transform: "rotate(0deg)" }}
                  /></Button>
                <Button
                  width="3rem"
                  borderRadius="50%"
                  callback={() => {
                    dropPlayer();
                    keyUpEventListener({ keyCode: 40 });
                  }}
                ><ArrowIconComponent
                    width="2.5rem"
                    height="auto"
                    style={{ transform: "rotate(270deg)" }}
                  /></Button>
                <Button
                  width="3rem"
                  borderRadius="50%"
                  callback={() => rotatePlayerIfNotColliding(stage, 1)}
                ><RotateIconComponent width="2.5rem" height="auto" /></Button>
                <Button
                  width="3rem"
                  borderRadius="50%"
                  callback={dropPlayerUntilCollided}
                ></Button>
                <Button
                  width="3rem"
                  borderRadius="50%"
                  callback={() => movePlayer(1)}
                ><ArrowIconComponent
                    width="2.5rem"
                    height="auto"
                    style={{ transform: "rotate(180deg)" }}
                  /></Button>
              </div>
              <Button
                borderRadius="50%"
                callback={() => setPaused(true)}
              ><MenuIconComponent width="2.5rem" height="auto" /></Button>
            </div>
          </>
        )}
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
