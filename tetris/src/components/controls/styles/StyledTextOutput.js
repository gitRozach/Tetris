import styled from 'styled-components';
import { COLOR_WHITE, COLOR_BLUE, COLOR_FADE } from '../../../constants/settingsConstants';

export const StyledTextOutput = styled.div`
    @keyframes color-pos-animation {
        0%{
            background-position: left;
        }
        100%{
            background-position: right;
        }
    }

    ::selection {
        background: transparent;
    }

    box-sizing: border-box;
    margin: ${props => props.margin ? props.margin : '0'};
    padding: ${props => props.padding ? props.padding : '0'};
    
    border: 0px solid #333;
    border-radius: ${props => props.borderRadius ? props.borderRadius : '0'};
    background: ${props => props.background ? props.background : 'transparent'};
    
    min-height: 20px;
    width: ${props => props.width ? props.width : '100%'};

    cursor: default;

    color: ${props => props.animationColor === COLOR_WHITE ? 'white' : props.animationColor === COLOR_FADE ? 'rgba(0,0,0,0)' : props.animationColor === COLOR_BLUE ? 'Blue' : 'transparent'};

    font-family: '${props => props.fontFamily ? props.fontFamily : 'Tahoma'}';
    font-weight: bold;
    font-size: ${props => props.fontSize ? props.fontSize : '1.5em'};
    text-rendering: optimizeSpeed;
    letter-spacing: 0.1em;
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
    white-space: ${props => props.whiteSpace ? props.whiteSpace : 'nowrap'};

    ${props => props.color ? `color: ${props.color};` : ''}
    ${props => !props.color && props.animationColor === COLOR_FADE ? 'background-image: linear-gradient(90deg, #845EC2, #D65DB1, #FF6F91, #FFC75F, #F9F871);' : ''}
    ${props => !props.color && props.animationColor === COLOR_FADE ? 'background-size: 400%;' : ''}
    ${props => !props.color && props.animationColor === COLOR_FADE ? '-webkit-background-clip: text;' : ''}
    ${props => !props.color && props.animationColor === COLOR_FADE ? 'background-clip: text;' : ''}
    ${props => !props.color && props.animationColor === COLOR_FADE ? 'animation: color-pos-animation 10s infinite alternate;' : ''}
`