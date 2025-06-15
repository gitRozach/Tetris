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
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import Stage from "./Stage";
import Button from "./Button";
import AltButton from "./AltButton";
import { Menu, AnimatedMenu } from "./Menu";
import SwiperMenu from "./SwiperMenu";
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
  MAIN_COMPONENT_ID,
} from "../../tetrisTools";
import {
  TETROMINOS,
  randomTetromino,
  randomTetrominoName,
  tetrominoByName,
} from "../../tetrominos";
import Statistics from "../views/Statistics";
import { CellStatus, CellType } from "./Cell";

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

  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    name: TETROMINOS[0].name,
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const [currentRowsCleared, setCurrentRowsCleared] = useState(0);
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

  const usernameInput = TextInput({
    id: "usernameInput",
    text: username,
    fontFamily: "Exo 2",
    fontSize: "1.6rem",
    onChange: (value) => setUsername(value),
  });

  const [soundtrackVolume, tetrisCellSideLength, settingsMenu] = Settings();
  const infoMenu = Info();
  const statsView = Statistics(username, score, rows, blocks, timePlayed);

  const settingsSwiperMenu = SwiperMenu({
    swiperSlides: [
      <Menu keyUp={() => console.log("hehe")} items={[settingsMenu]} />,
    ],
  });
  const infoSwiperMenu = SwiperMenu({
    swiperSlides: [<Menu items={[infoMenu]} />],
  });
  const statsSwiperMenu = SwiperMenu({
    swiperSlides: [<Menu items={[statsView]} />],
  });

  const [audioElement, soundtrack, playSoundtrack] = useSound(
    [sounds],
    soundtrackVolume
  );

  const startGame = (playerUsername) => {
    setUsername(playerUsername ? playerUsername : "");
    setDropTime(1000);
    setTimePlayed(0);
    setStage(createStage());
    spawnPlayer();

    setGameOver(false);
    setGameStarted(true);
    setPaused(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    playSoundtrack(0);

    focusComponent(MAIN_COMPONENT_ID);
  };

  const resumeGame = () => {
    setPaused(false);
    focusComponent(MAIN_COMPONENT_ID);
  };

  const restartGame = () => {
    setTimePlayed(0);
    setBlocks({ I: 0, J: 0, L: 0, O: 0, S: 0, T: 0, Z: 0 });
    startGame(username);
    setPaused(false);
    focusComponent(MAIN_COMPONENT_ID);
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
      console.log("keyUp Callback called");

      if (keyCode === 40) {
        /*Arrow Down*/ if (gameOver || !gameStarted || paused) return;
        setDropTime(1000 / (level + 1) + 200);
      }

      /* Escape-Key-Handling */
      if (keyCode === 27) {
        /*Escape*/ console.log("ESC pressed");

        // If there is an overlay, close the overlay first
        if (overlayContent !== null) {
          setOverlayContent(null);
        } else {
          // Focus the tetris wrapper to for key events
          if (paused) {
            // Close the pause menu if there is no overlay showing
            setPaused(false);
            if (gameStarted) {
              focusComponent(MAIN_COMPONENT_ID);
            }
          } else {
            setPaused(true);
          }
        }
      }
      /* Start-Game-Menu Key-Handling */
      if (!gameStarted) {
        if (keyCode === 13) {
          /*Enter*/ 
          // startGame(username); -> Does not work if the input is focused (The fetching process for the media resource was aborted by the user agent at the user's request)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (player.pos.y < 1) {
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
    setDropTime(50);
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
    const randomTetrominoBlockName = randomTetrominoName();
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
        if (row.findIndex((cell) => cell[0] === CellType.EMPTY_CELL) === -1) {
          setCurrentRowsCleared((prev) => prev + 1);
          ack.unshift(
            Array(newStage[0].length).fill([
              CellType.EMPTY_CELL,
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
            ? [CellType.EMPTY_CELL, CellStatus.CLEAR]
            : cell
        )
      );

      // Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== CellType.EMPTY_CELL) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <TetrisBackground animated />
            <BlurryBackground
              blurColor={"rgba(0, 0, 0, 0.4)"}
              blurRadius="15px"
            />
            <AnimatedMenu
              keyPressedHandler={keyUpEventListener}
              background="rgba(0, 0, 0, 1)"
              items={[
                <TextOutput
                  animatedColor
                  text="TETRIS"
                  fontFamily="Exo 2"
                  fontSize="7rem"
                />,
                <div
                  style={{
                    width: "max(400px, calc(50% - 2 * 1rem))",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                    padding: "0 1rem",
                  }}
                >
                  <TextOutput
                    animatedColor
                    text="PLEASE ENTER YOUR USERNAME"
                    fontSize="1.6rem"
                    fontFamily="Exo 2"
                  />
                  {usernameInput}
                </div>,
                <div
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
            {/*<TetrisBackground />*/}
            <BlurryBackground />
            <AnimatedMenu
              keyPressedHandler={keyUpEventListener}
              background="rgba(0, 0, 0, 1)"
              items={[
                <div className="game-over-container">
                  <TextOutput
                    animatedColor
                    text="GAME OVER"
                    fontFamily="Exo 2"
                    fontSize="7rem"
                    whiteSpace="wrap"
                  />
                </div>,
                <div
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
                    callback={restartGame}
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
            <TetrisBackground animated />
            <BlurryBackground />
            <AnimatedMenu
              keyPressedHandler={keyUpEventListener}
              background="rgba(0, 0, 0, 1)"
              items={[
                <TextOutput
                  animatedColor
                  text="TETRIS"
                  fontFamily="Exo 2"
                  fontSize="7rem"
                />,
                <div
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
                    callback={restartGame}
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
                animatedColor
                text={`SCORE: ${score}`}
                fontFamily="Exo 2"
                fontSize="1.8rem"
              />
              <TextOutput
                animatedColor
                text={`LEVEL: ${level + 1}`}
                fontFamily="Exo 2"
                fontSize="1.8rem"
              />
              <TextOutput
                animatedColor
                text={`${formatMillisecondsToHHMMSS(timePlayed)}`}
                fontFamily="Exo 2"
                fontSize="1.8rem"
              />
            </div>
            <Stage
              animatedColor
              stage={stage}
              cellSize={tetrisCellSideLength}
            />
            <div className="game-controller-container">
              <Button
                children={<StatsIconComponent width="2.5rem" height="auto" />}
                borderRadius="50%"
              />
              <div className="game-controller">
                <Button
                  width="3rem"
                  children={
                    <ArrowIconComponent
                      width="2rem"
                      height="auto"
                      style={{ transform: "rotate(0deg)" }}
                    />
                  }
                  borderRadius="50%"
                  callback={() => movePlayer(-1)}
                />
                <Button
                  width="3rem"
                  children={
                    <ArrowIconComponent
                      width="2.5rem"
                      height="auto"
                      style={{ transform: "rotate(270deg)" }}
                    />
                  }
                  borderRadius="50%"
                  callback={() => {
                    dropPlayer();
                    keyUpEventListener({ keyCode: 40 });
                  }}
                />
                <Button
                  width="3rem"
                  children={
                    <RotateIconComponent width="2.5rem" height="auto" />
                  }
                  borderRadius="50%"
                  callback={() => rotatePlayerIfNotColliding(stage, 1)}
                />
                <Button
                  width="3rem"
                  children={
                    <DropIconComponent
                      width="2.5rem"
                      height="auto"
                      style={{ transform: "rotate(180deg)" }}
                    />
                  }
                  borderRadius="50%"
                  callback={dropPlayerUntilCollided}
                />
                <Button
                  width="3rem"
                  children={
                    <ArrowIconComponent
                      width="2.5rem"
                      height="auto"
                      style={{ transform: "rotate(180deg)" }}
                    />
                  }
                  borderRadius="50%"
                  callback={() => movePlayer(1)}
                />
              </div>
              <Button
                children={<MenuIconComponent width="2.5rem" height="auto" />}
                borderRadius="50%"
                callback={() => setPaused(true)}
              />
            </div>
          </>
        )}
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
