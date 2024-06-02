import { useState } from "react"

const DEFAULT_SOUNDTRACK_VOLUME = 0.1;
const DEFAULT_TETRIS_CELL_SIDE_LENGTH = 25;
const DEFAULT_TETRIS_GRID_ANIMATION_COLOR = 'Blue'; //NONE, BLUE, FADE
const DEFAULT_TETRIS_TEXT_ANIMATION_COLOR = 'White'; // NONE, WHITE, FADE

export const useSettings = () => {
    const [soundtrackVolume, setSoundtrackVolume] = useState(DEFAULT_SOUNDTRACK_VOLUME);
    const [tetrisCellSideLength, setTetrisCellSideLength] = useState(DEFAULT_TETRIS_CELL_SIDE_LENGTH);
    const [tetrisGridAnimationColor, setTetrisGridAnimationColor] = useState(DEFAULT_TETRIS_GRID_ANIMATION_COLOR);
    const [tetrisTextAnimationColor, setTetrisTextAnimationColor] = useState(DEFAULT_TETRIS_TEXT_ANIMATION_COLOR);

    return [soundtrackVolume, setSoundtrackVolume, tetrisCellSideLength, setTetrisCellSideLength, tetrisGridAnimationColor, setTetrisGridAnimationColor, tetrisTextAnimationColor, setTetrisTextAnimationColor];
}