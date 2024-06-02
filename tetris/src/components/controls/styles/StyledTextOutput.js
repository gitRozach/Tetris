import styled from 'styled-components';

export const StyledTextOutput = styled.div`
    box-sizing: border-box;
    margin: ${props => props.margin ? props.margin : '0'};
    padding: ${props => props.padding ? props.padding : '0'};
    
    border: 0px solid #333;
    border-radius: ${props => props.borderRadius ? props.borderRadius : '0'};
    background: ${props => props.background ? props.background : 'transparent'};
    
    min-height: 20px;
    width: ${props => props.width ? props.width : '100%'};

    cursor: default;

    ${props => props.animationColor === 'White' ? 'color: white;' : props.animationColor === 'Fade' ? 'color: transparent;' : 'color: Blue;'}

    font-family: '${props => props.fontFamily ? props.fontFamily : 'Tahoma'}';
    font-weight: bold;
    font-size: ${props => props.fontSize ? props.fontSize : '1.5em'};
    text-rendering: optimizeSpeed;
    letter-spacing: 0.1em;
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
    white-space: ${props => props.whiteSpace ? props.whiteSpace : 'nowrap'};

    ::selection {
        background: transparent;
    }

    @keyframes color-pos-animation {
        0%{
            background-position: left;
        }
        100%{
            background-position: right;
        }
    }

    ${props => props.animationColor === 'Fade' ? 'background-image: linear-gradient(90deg, #845EC2, #D65DB1, #FF6F91, #FFC75F, #F9F871);' : ''}
    ${props => props.animationColor === 'Fade' ? 'background-size: 400%;' : ''}
    ${props => props.animationColor === 'Fade' ? '-webkit-background-clip: text;' : ''}
    ${props => props.animationColor === 'Fade' ? 'background-clip: text;' : ''}
    ${props => props.animationColor === 'Fade' ? 'animation: color-pos-animation 10s infinite alternate;' : ''}
    
`