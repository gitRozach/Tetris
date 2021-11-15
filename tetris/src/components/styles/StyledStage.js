import styled from 'styled-components';

export const StyledStage = styled.div`
    position: relative;
    display: grid;
    z-index: 1;

    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );

    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 0px solid #333;
    width: 50%;
    max-width: 25vw;
    background: #111;

    @keyframes animate {
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

    ::before, ::after {
        content: '';
        position: absolute;
        left: -2px;
        top: -2px;
        background: linear-gradient(45deg, #e6fb04, #ff6600, #00ff66, #00ffff, #ff00ff, #ff0099, #6e0dd0, #ff3300, #099fff);
        background-size: 400%;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        z-index: -1;
        animation: animate 60s linear infinite;
    }

    ::after {
        filter: blur(40px);
    }
`