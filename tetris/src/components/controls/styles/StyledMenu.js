import styled from 'styled-components';

export const StyledMenu = styled.div`
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    ${props => props.padding ? `padding: ${props.padding};` : 'padding: 0;'}
    ${props => props.margin ? `margin: ${props.margin};` : 'margin: 0;'}

    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 3;

    @keyframes styled-menu-animation {
        0% {
            background: rgba(0, 0, 0, 0.0);
        }
        100% {
            background: ${props => props.background ? props.background : 'rgba(0, 0, 0, 1.0);'};
        }
    }

    ${props => props.animated ? 'animation: styled-menu-animation 1s ease forwards;' : ''};
    ${props => !props.animated && props.background ? `background: ${props.background}` : 'background: rgba(0, 0, 0, 0)'};

    .menu-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        row-gap: 1rem;

        width: 100%;
        height: 100%;

        padding: 0;
        margin: 0;
    }
`