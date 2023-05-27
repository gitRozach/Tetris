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

    padding: ${props => props.padding ? props.padding: '0'};
    margin: ${props => props.margin ? props.margin: '0'};

    background: transparent;

    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 3;

    @keyframes styled-menu-animation {
        0% {
            background: transparent;
        }
        100% {
            background: ${props => props.background ? props.background : 'rgba(0, 0, 0, 1)'};
        }
    }

    /*animation: styled-menu-animation 1s ease forwards;*/

    .motion-container {
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