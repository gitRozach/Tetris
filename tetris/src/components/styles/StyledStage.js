import styled from 'styled-components';

export const StyledStage = styled.div`
    position: relative;
    display: grid;
    z-index: 1;

    @media screen and (orientation : portrait) {
        grid-template-rows: repeat(
            ${props => props.height},
            calc(40vw / ${props => props.width})
        );
    
        grid-template-columns: repeat(${props => props.width}, 1fr);
        grid-gap: 1px;
        max-width: 40vw;
    }

    @media screen and (orientation : landscape) {
        grid-template-rows: repeat(
            ${props => props.height},
            calc(40vh / ${props => props.width})
        );
    
        grid-template-columns: repeat(${props => props.width}, 1fr);
        grid-gap: 1px;
        max-width: 40vh;
    }
    

    border: 0px solid #333;
    margin: 40px 0px;
    width: 100%;
    background: #111;

    @keyframes color-pos-animation {
        0%{
            background-position: 0 0;
        }
        50%{
            background-position: 400% 0;
        }
        100%{
            background-position: 0 0;
        }
    }

    @keyframes opacity-animation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    ::before, ::after {
        content: '';
        position: absolute;
        left: -2px;
        top: -2px;
        background: linear-gradient(90deg, #e6fb04, #ff6600, #00ff66, #00ffff, #ff00ff, #ff0099, #6e0dd0, #ff3300, #099fff);
        background-size: 400%;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        z-index: -1;
        animation: 
            color-pos-animation 180s infinite, 
            opacity-animation 1s forwards;
    }

    ::after {
        filter: blur(40px);
    }
`