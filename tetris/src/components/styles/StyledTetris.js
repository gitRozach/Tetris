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

    padding: 20px;
    margin: 0 auto;
    max-width: 70%;

    aside {
        width: 70%;
        max-height: 100px;
        display: flex;
        flex-direction: column;
        padding: 0 20px;
    }
`