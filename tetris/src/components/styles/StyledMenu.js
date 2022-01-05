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

    background: transparent;

    overflow: hidden;
    z-index: 3;

    @keyframes styled-menu-animation {
        0% {
            background: transparent;
        }
        100% {
            background: ${props => props.background ? props.background : 'rgba(255, 255, 255, 0.2)'};
        }
    }

    animation: styled-menu-animation 1s ease forwards;
`