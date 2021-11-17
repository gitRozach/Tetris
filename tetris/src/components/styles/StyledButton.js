import styled from 'styled-components';

export const StyledButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 20px;
    width: 100%;
    border-radius: 0px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    @keyframes hoverAnimation {
        0% {
            background: #333;
        }
        100% {
            background: #433;
        }
    }

    :hover {
        animation: 1s hoverAnimation ease forwards;
    }
`