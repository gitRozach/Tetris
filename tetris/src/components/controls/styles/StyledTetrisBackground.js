import styled from "styled-components";

export const StyledTetrisBackground = styled.div`
    position: absolute;
    z-index: 2;
    transform: translateY(${props => props.animated ? '-100px' : '0'}) rotate(45deg);
    overflow: hidden;

    ${props => props.animated ? 'animation: fade-in-animation 0.3s ease-in forwards;' : ''}

    @keyframes fade-in-animation {
        0% {
            opacity: 0;
            transform: translateY(-100px) rotate(45deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0px) rotate(45deg);
        }
    }
`