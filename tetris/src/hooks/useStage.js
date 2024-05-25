import { useState, useEffect } from "react";
import { createStage } from "../tetrisTools";
import { CellStatus, CellType } from "../components/controls/Cell";

export const useStage = (player, resetPlayer, setGameOver) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) => {
      return newStage.reduce((ack, row) => {
        // If a row does not contain any empty cells, clear the row
        if (row.findIndex((cell) => cell[0] === CellType.EMPTY_CELL) === -1) {
          setRowsCleared((prev) => prev + 1);
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
        resetPlayer();
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
