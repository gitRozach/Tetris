import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    margin: 0;
    padding: 10px;
    width: ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : 'auto'};
    border-radius: ${props => props.borderRadius ? props.borderRadius : '0'};
    border: none;
    color: ${props => props.color ? props.color : 'white'};
    background: ${props => props.background ? props.background : '#333'};
    font-family: ${props => props.fontFamily ? props.fontFamily : 'Pixel, Arial, Helvetica, sans-serif'};
    font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
    outline: none;
    cursor: pointer;

    @keyframes hoverAnimation {
        0% {
            ${props => props.background ? props.background : '#333'};
        }
        100% {
            background: transparent;
        }
    }

    /*::before {
        content: '';
        position: absolute;
        left: -2px;
        top: -2px;
        background: linear-gradient(90deg, #e6fb04, #ff6600, #00ff66, #00ffff, #ff00ff, #ff0099, #6e0dd0, #ff3300, #099fff);
        width: calc(${props => props.width ? props.width : 'auto'} + 4px);
        height: calc(100% + 4px);
        z-index: -1;
    }*/

    :hover {
        animation: 1s hoverAnimation ease forwards;
    }
`