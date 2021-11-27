import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
    const [username, setUsername] = useState("");
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false);

    const linePoints = [40, 100, 300, 1200];

    const calculateScore = useCallback(() => {
        // Check if we have a score value bigger than zero
        if (rowsCleared > 0) {
            // Original Tetris score formula
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);
            
        }
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calculateScore();
    }, [calculateScore, rowsCleared, score]);

    return [username, setUsername, score, setScore, rows, setRows, level, setLevel, gameStarted, setGameStarted, gameOver, setGameOver, paused, setPaused];
}