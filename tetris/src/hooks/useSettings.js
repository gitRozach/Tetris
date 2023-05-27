import { useState } from "react"

const DEFAULT_SOUNDTRACK_VOLUME = 0.1;
const DEFAULT_TETRIS_CELL_SIDE_LENGTH = 30;

export const useSettings = () => {
    const [soundtrackVolume, setSoundtrackVolume] = useState(DEFAULT_SOUNDTRACK_VOLUME);
    const [tetrisCellSideLength, setTetrisCellSideLength] = useState(DEFAULT_TETRIS_CELL_SIDE_LENGTH);

    return [soundtrackVolume, setSoundtrackVolume, tetrisCellSideLength, setTetrisCellSideLength];
}