// Audios
import sounds from "../../soundtracks/Tetris_Soundtrack_1.mp3";

// Views
import Statistics from "../views/Statistics";
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
import React, { useMemo } from "react";
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
import { usePlayerHighscore } from "../../hooks/usePlayerHighscore";
import { useSound } from "../../hooks/useSound";

// Utils
import {
  createStage,
  checkCollision,
  formatMillisecondsToHHMMSS,
  STAGE_WIDTH,
  focusComponent,
  TETROMINOS,
  randomTetrominoType,
  tetrominoByName,
  calculatePlayerDropTime,
  ROOT_COMPONENT_ID,
  CellStatus,
  CellType,
} from "../../tools";

// Constants
import { COLOR_FADE, COLOR_WHITE } from "../../constants/settingsConstants";
import {
  KEY_ENTER,
  KEY_ARROW_DOWN,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
  KEY_ARROW_UP,
  KEY_ESCAPE,
} from "../../constants/keycodeConstants";

const Tetris = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    name: TETROMINOS[0].name,
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const [overlayContent, setOverlayContent] = useState(null);
  const closeOverlay = () => setOverlayContent(null);

  const [currentRowsCleared, setCurrentRowsCleared] = useState(0);
  const [readHighscoreCookie, saveHighscoreCookie] = usePlayerHighscore();
  const [
    username,
    setUsername,
    score,
    setScore,
    rows,
    setRows,
    blocks,
    setBlocks,
    level,
    setLevel,
  ] = usePlayerProgress(currentRowsCleared);
  const [dropTime, setDropTime] = useState(null);
  const [timePlayed, setTimePlayed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stage, setStage] = useState(createStage());

  const [
    soundtrackVolume,
    gridCellSideLength,
    gridColor,
    textColor,
    settingsComponent,
  ] = Settings();
  const aboutComponent = Info();
  const statsComponent = Statistics(username, score, rows, blocks, timePlayed);
  const restartGameConfirmationComponent = ConfirmationDialog(
    "RESTART GAME ?",
    () => {
      closeOverlay();
      startGame(username);
    },
    closeOverlay
  );
  const exitGameConfirmationComponent = ConfirmationDialog(
    "EXIT GAME ?",
    () => {
      closeOverlay();
      exitGame();
    },
    closeOverlay
  );

  const settingsMenu = (
    <Menu
      animated={false}
      background="rgb(0,0,0)"
      items={[settingsComponent]}
    />
  );
  const infoMenu = (
    <Menu animated={false} background="rgb(0,0,0)" items={[aboutComponent]} />
  );
  const statsMenu = (
    <Menu animated={false} background="rgb(0,0,0)" items={[statsComponent]} />
  );
  const restartGameConfirmationMenu = (
    <Menu
      animated={false}
      background="rgb(0,0,0)"
      items={[restartGameConfirmationComponent]}
    />
  );
  const exitGameConfirmationMenu = (
    <Menu
      animated={false}
      background={"rgba(22, 22, 22, 0.7)"}
      items={[exitGameConfirmationComponent]}
    />
  );

  const [audioElement, soundtrack, playSoundtrack] = useSound(
    [sounds],
    soundtrackVolume
  );

  const usernameInput = TextInput({
    id: "usernameInput",
    text: username,
    fontFamily: "Exo 2",
    fontSize: "1.6rem",
    padding: "1rem 0",
    margin: "0",
    onChange: (value) => setUsername(value),
  });

  const gameControllerButtonProps = {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  };

  const createAltButtonProps = (
    text,
    icon,
    iconWidth,
    iconHeight,
    callback
  ) => {
    return {
      text: text,
      iconUrl: icon,
      iconWidth: iconWidth,
      iconHeight: iconHeight,
      fontFamily: "Exo 2",
      padding: "0 0 0.2rem 0",
      callback: callback,
    };
  };

  const createTextOutputProps = (text, color, fontSize) => {
    return {
      animationColor: color,
      text: text,
      fontFamily: "Exo 2",
      fontSize: fontSize,
    };
  };

  const resetGameStats = () => {
    setTimePlayed(0);
    setScore(0);
    setRows(0);
    setLevel(0);
    setBlocks({ I: 0, J: 0, L: 0, O: 0, S: 0, T: 0, Z: 0 });
  };

  function startGame(playerUsername) {
    resetGameStats();
    setUsername(playerUsername ? playerUsername : "");
    setDropTime(1000);
    setStage(createStage());
    setGameOver(false);
    setGameStarted(true);
    setPaused(false);
    // TODO !!!! playSoundtrack(0);
    spawnPlayer();
    focusComponent(ROOT_COMPONENT_ID);
  }

  function resumeGame() {
    setPaused(false);
    focusComponent(ROOT_COMPONENT_ID);
  }

  function exitGame() {
    setTimePlayed(0);
    setBlocks({ I: 0, J: 0, L: 0, O: 0, S: 0, T: 0, Z: 0 });
    setGameOver(false);
    setGameStarted(false);
    setPaused(false);
  }

  const currentHighscore = useMemo(
    () => readHighscoreCookie(),
    [gameStarted, gameOver]
  );

  const keyUpEventListener = useCallback(
    ({ keyCode }) => {
      if (keyCode === KEY_ARROW_DOWN) {
        if (gameOver || !gameStarted || paused) return;
        setDropTime(calculatePlayerDropTime(level));
      }

      if (keyCode === KEY_ESCAPE) {
        // If there is an Overlay, close the Overlay first
        if (overlayContent !== null) {
          closeOverlay();
        } else {
          // Focus the tetris wrapper to for key events
          if (paused) {
            // Close the pause menu if there is no overlay showing
            setPaused(false);
            if (gameStarted) focusComponent(ROOT_COMPONENT_ID);
          } else {
            setPaused(true);
          }
        }
      }
      if (!gameStarted && keyCode === KEY_ENTER) startGame(username);
    },
    [gameOver, gameStarted, level, overlayContent, paused, username]
  );

  const handleKeyDownEvent = ({ keyCode }) => {
    if (!gameOver && !paused && gameStarted) {
      if (keyCode === KEY_ARROW_LEFT) {
        movePlayer(-1);
      } else if (keyCode === KEY_ARROW_RIGHT) {
        movePlayer(1);
      } else if (keyCode === KEY_ARROW_DOWN) {
        dropPlayer();
      } else if (keyCode === KEY_ARROW_UP) {
        rotatePlayerIfNotColliding(stage, 1);
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
    if (!checkCollision(player, stage, { x: directionX, y: 0 }))
      updatePlayerPos({ x: directionX, y: 0 });
  };

  const drop = () => {
    // Increase level and reduce drop time after each 10 rows
    if (rows >= (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(calculatePlayerDropTime(level));
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        if (score > currentHighscore.highscore)
          saveHighscoreCookie(username, score, new Date());
        setGameOver(true);
        setDropTime(null);
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const dropPlayerUntilCollided = () => {
    setDropTime(10);
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

  const updatePlayerPos = ({ x, y, collided }) => {
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
            Array(newStage[0].length).fill([CellType.EMPTY, CellStatus.CLEAR])
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
        setDropTime(rows >= 10 ? calculatePlayerDropTime(level) : 1000);
        spawnPlayer();
        return sweepRows(newStage);
      }
      if (checkCollision(player, stage, { x: 0, y: 0 })) {
        if (score > currentHighscore.highscore)
          saveHighscoreCookie(username, score, new Date());
        setGameOver(true);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, spawnPlayer]);

  const openSettingsOverlay = () => {
    setOverlayContent(settingsMenu);
  };

  return (
    <StyledTetrisWrapper
      id="tetris-wrapper"
      role="button"
      tabIndex="0"
      onKeyDown={(e) => handleKeyDownEvent(e)}
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
              width: "100%",
            }}
          >
            <TetrisBackground animated={false} />
            <BlurryBackground
              blurColor="rgba(0, 0, 0, 0.4)"
              blurRadius="15px"
            />
            <Menu
              animated={false}
              keyPressedHandler={keyUpEventListener}
              items={[
                <TextOutput
                  key="start-game-menu"
                  {...createTextOutputProps("REKTRIS", COLOR_FADE, "7rem")}
                />,
                <div
                  key="start-game-menu-username-input"
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "1rem",
                  }}
                >
                  <TextOutput
                    {...createTextOutputProps(
                      "PLEASE ENTER YOUR USERNAME",
                      COLOR_WHITE,
                      "1.6rem"
                    )}
                  />
                  {usernameInput}
                </div>,
                <div
                  key="start-game-menu-controls"
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "0",
                  }}
                >
                  <AltButton
                    {...createAltButtonProps(
                      "START",
                      PlayIcon,
                      "2.2rem",
                      "2.2rem",
                      () => startGame(username)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "SETTINGS",
                      SettingsIcon,
                      "1.9rem",
                      "1.9rem",
                      () => openSettingsOverlay()
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "ABOUT",
                      InfoIcon,
                      "2.2rem",
                      "2.2rem",
                      () => setOverlayContent(infoMenu)
                    )}
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
            <TetrisBackground animated={false} />
            <BlurryBackground />
            <Menu
              animated
              keyPressedHandler={keyUpEventListener}
              background="rgba(0, 0, 0, 0.8)"
              items={[
                <div
                  key="game-over-menu-outputs"
                  className="game-over-container"
                >
                  <TextOutput
                    {...createTextOutputProps("GAME OVER", COLOR_FADE, "7rem")}
                    whiteSpace="wrap"
                  />

                  {score >= currentHighscore.highscore && score > 0 && (
                    <TextOutput
                      {...createTextOutputProps(
                        `NEW HIGHSCORE: ${score}`,
                        COLOR_FADE,
                        "1.8rem"
                      )}
                      whiteSpace="wrap"
                    />
                  )}

                  {score < currentHighscore.highscore && (
                    <>
                      <TextOutput
                        {...createTextOutputProps(
                          `SCORE: ${score}`,
                          COLOR_FADE,
                          "1.8rem"
                        )}
                        whiteSpace="wrap"
                      />
                      <TextOutput
                        {...createTextOutputProps(
                          `HIGHSCORE: ${currentHighscore.highscore}`,
                          COLOR_FADE,
                          "1.8rem"
                        )}
                        whiteSpace="wrap"
                      />
                    </>
                  )}
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
                    {...createAltButtonProps(
                      "RESTART",
                      RestartIcon,
                      "1.7rem",
                      "1.7rem",
                      () => startGame(username)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "STATISTICS",
                      StatsIcon,
                      "2.4rem",
                      "2.4rem",
                      () => setOverlayContent(statsMenu)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "SETTINGS",
                      SettingsIcon,
                      "1.9rem",
                      "1.9rem",
                      openSettingsOverlay
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "ABOUT",
                      InfoIcon,
                      "2.2rem",
                      "2.2rem",
                      () => setOverlayContent(infoMenu)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "EXIT",
                      CloseIcon,
                      "3rem",
                      "3rem",
                      () => setOverlayContent(exitGameConfirmationMenu)
                    )}
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
                  {...createTextOutputProps("REKTRIS", COLOR_FADE, "7rem")}
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
                    {...createAltButtonProps(
                      "RESUME",
                      PlayIcon,
                      "2.2rem",
                      "2.2rem",
                      resumeGame
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "STATISTICS",
                      StatsIcon,
                      "2.4rem",
                      "2.4rem",
                      () => setOverlayContent(statsMenu)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "SETTINGS",
                      SettingsIcon,
                      "1.9rem",
                      "1.9rem",
                      openSettingsOverlay
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "RESTART",
                      RestartIcon,
                      "1.7rem",
                      "1.7rem",
                      () => setOverlayContent(restartGameConfirmationMenu)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "ABOUT",
                      InfoIcon,
                      "2.2rem",
                      "2.2rem",
                      () => setOverlayContent(infoMenu)
                    )}
                  />
                  <AltButton
                    {...createAltButtonProps(
                      "EXIT",
                      CloseIcon,
                      "2.2rem",
                      "2.2rem",
                      () => setOverlayContent(exitGameConfirmationMenu)
                    )}
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
                {...createTextOutputProps(
                  `SCORE: ${score}`,
                  textColor,
                  "1.8rem"
                )}
              />
              <TextOutput
                {...createTextOutputProps(
                  `LEVEL: ${level + 1}`,
                  textColor,
                  "1.8rem"
                )}
              />
              <TextOutput
                {...createTextOutputProps(
                  `${formatMillisecondsToHHMMSS(timePlayed)}`,
                  textColor,
                  "1.8rem"
                )}
              />
            </div>
            <Stage
              animatedColor
              stage={stage}
              cellSize={gridCellSideLength}
              gridAnimationColor={gridColor}
            />
            <div className="game-controller-container">
              <div className="game-controller">
                <Button
                  id="game-controller-button-left"
                  {...gameControllerButtonProps}
                  callback={() => movePlayer(-1)}
                >
                  <ArrowIconComponent
                    width="2.5rem"
                    height="auto"
                    style={{ transform: "rotate(0deg)" }}
                  />
                </Button>
                <Button
                  id="game-controller-button-down"
                  {...gameControllerButtonProps}
                  callback={() => {
                    dropPlayer();
                    keyUpEventListener({ keyCode: KEY_ARROW_DOWN });
                  }}
                >
                  <ArrowIconComponent
                    width="2.5rem"
                    height="auto"
                    style={{ transform: "rotate(270deg)" }}
                  />
                </Button>
                <Button
                  id="game-controller-button-rotate"
                  {...gameControllerButtonProps}
                  callback={() => rotatePlayerIfNotColliding(stage, 1)}
                >
                  <RotateIconComponent width="2rem" height="auto" />
                </Button>
                <Button
                  id="game-controller-button-right"
                  {...gameControllerButtonProps}
                  callback={() => movePlayer(1)}
                >
                  <ArrowIconComponent
                    width="2.5rem"
                    height="auto"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </Button>
              </div>
            </div>
          </>
        )}
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
