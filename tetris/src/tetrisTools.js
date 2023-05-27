export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const MAIN_COMPONENT_ID = 'tetris-wrapper'

export const createStage = () => (
    Array.from(
        Array(STAGE_HEIGHT), 
        () => Array(STAGE_WIDTH).fill([0, 'clear'])
    )
);

export const focusComponent = (componentId) => {
    document.getElementById(componentId).focus(); 
}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; ++y) {
        for (let x = 0; x < player.tetromino[y].length; ++x) {
            // 1. Check we're on an actual tetromino cell
            if (player.tetromino[y][x] !== 0) {
                // 2. Check our move is inside the game areas height (y)
                if (!stage[y + player.pos.y + moveY]  ||
                    // 3. Check our move is inside the game areas width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] || 
                    // 4. Check the cell we're moving is not set to 'clear'
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {

                    return true;
                }  
            }
        }
    }
    return false;
}

export const formatMillisecondsToHHMMSS = (milliseconds) => {
    let totalSeconds = milliseconds / 1000;
    
    let hours = parseInt(totalSeconds / 3600);
    let minutes = parseInt(totalSeconds % 3600 / 60);
    let seconds = parseInt(totalSeconds % 3600 % 60);

    // Insert leading zeros if needed
    let hoursStr = ("00" + hours).slice(-2);
    let minutesStr = ("00" + minutes).slice(-2);
    let secondsStr = ("00" + seconds).slice(-2);

    return hours > 0 ? `${hoursStr}:${minutesStr}:${secondsStr}` : `${minutesStr}:${secondsStr}`;
}