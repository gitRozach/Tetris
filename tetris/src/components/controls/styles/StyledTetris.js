import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(0deg, #000, #000);
    background-size: cover;
    overflow: hidden;
`

export const StyledTetris = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    height: 100%;
    padding: 0;
    margin: 0;

    .game-over-container {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;

        overflow: hidden;

        padding: 1rem 0;

        background: #121821;
        width: max(400px, calc(50% - 2 * 1rem));
        border-radius: ${props => props.borderRadius ? props.borderRadius : '2rem'};
    }

    .game-stats-container {
        position: absolute;
        z-index: 1;

        display: flex;
        align-items: center;
        justify-content: space-around;

        width: 100%;
        height: 10%;
        top: 0;

        border-bottom: 1px solid white;

        background: transparent;
    }

    .game-controller-container {
        position: absolute;
        z-index: 1;

        display: flex;
        align-items: center;
        justify-content: space-around;

        width: 100%;
        height: 10%;
        bottom: 0;

        border-top: 1px solid white;

        background: transparent;
    }

    .game-controller {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 1rem;
    }
`