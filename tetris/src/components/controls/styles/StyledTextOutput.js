import styled from 'styled-components';

export const StyledTextOutput = styled.div`
    box-sizing: border-box;
    /*display: flex;
    align-items: center;
    justify-content: center;*/
    margin: ${props => props.margin ? props.margin : '0'};
    padding: ${props => props.padding ? props.padding : '0'};
    
    border: 0px solid #333;
    border-radius: ${props => props.borderRadius ? props.borderRadius : '0'};
    background: ${props => props.background ? props.background : 'transparent'};
    
    min-height: 20px;
    width: ${props => props.width ? props.width : '100%'};

    cursor: default;
    color: ${props => (props.color && !props.animatedColor) ? props.color : props.animatedColor ? 'transparent' : !props.color ? '#000' : props.color};
    font-family: '${props => props.fontFamily ? props.fontFamily : 'Tahoma'}';
    font-weight: bold;
    font-size: ${props => props.fontSize ? props.fontSize : '1.5em'};
    text-rendering: geometricPrecision;
    letter-spacing: 0.1em;
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
    white-space: ${props => props.whiteSpace ? props.whiteSpace : 'nowrap'};

    ::selection {
        background: transparent;
    }

    ${props => props.animatedColor ? 'background-image: linear-gradient(90deg, #845EC2, #D65DB1, #FF6F91, #FFC75F, #F9F871);' : ''}
    ${props => props.animatedColor ? 'background-size: 400%;' : ''}
    ${props => props.animatedColor ? '-webkit-background-clip: text;' : ''}
    ${props => props.animatedColor ? 'background-clip: text;' : ''}
    ${props => props.animatedColor ? 'animation: color-pos-animation 10s infinite alternate;' : ''}


    @keyframes color-pos-animation {
        0%{
            background-position: left;
        }
        100%{
            background-position: right;
        }
    }
`