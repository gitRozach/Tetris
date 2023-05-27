import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
    const [username, setUsername] = useState("");
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [blocks, setBlocks] = useState({I: 0, J: 0, L: 0, O: 0, S: 0, T: 0, Z: 0});
    const [level, setLevel] = useState(0);

    const calculateScore = useCallback(() => {
        const linePoints = [40, 100, 300, 1200];
        // Check if we have a score value greater than zero
        if (rowsCleared > 0) {
            // Original Tetris score formula
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);
            
        }
    }, [level, rowsCleared]);

    useEffect(() => {
        calculateScore();
    }, [calculateScore, rowsCleared, score]);

    return [username, setUsername, score, setScore, rows, setRows, blocks, setBlocks, level, setLevel];
}