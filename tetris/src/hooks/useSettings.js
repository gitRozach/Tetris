import { useState } from 'react'
import { DEFAULT_SOUNDTRACK_VOLUME, DEFAULT_CELL_SIDE_LENGTH, DEFAULT_GRID_COLOR, DEFAULT_TEXT_COLOR } from '../constants/settingsConstants';

export const useSettings = () => {
    const [soundtrackVolume, setSoundtrackVolume] = useState(DEFAULT_SOUNDTRACK_VOLUME);
    const [tetrisCellSideLength, setTetrisCellSideLength] = useState(DEFAULT_CELL_SIDE_LENGTH);
    const [tetrisGridAnimationColor, setTetrisGridAnimationColor] = useState(DEFAULT_GRID_COLOR);
    const [tetrisTextAnimationColor, setTetrisTextAnimationColor] = useState(DEFAULT_TEXT_COLOR);

    return [soundtrackVolume, setSoundtrackVolume, tetrisCellSideLength, setTetrisCellSideLength, tetrisGridAnimationColor, setTetrisGridAnimationColor, tetrisTextAnimationColor, setTetrisTextAnimationColor];
}