import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px 0;
    padding: 0px;
    border: 0px solid #333;
    min-height: 20px;
    width: 100%;
    border-radius: 0px;
    color: ${props => (props.gameOver ? 'red' : '#999')};
    background: transparent;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 1rem;
`