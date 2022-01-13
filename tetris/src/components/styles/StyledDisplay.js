import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${props => props.margin ? props.margin : '0 0 20px 0'};
    padding: ${props => props.padding ? props.padding : '0px'};
    
    border: 0px solid #333;
    border-radius: 0px;
    background: transparent;
    
    min-height: 20px;
    width: 100%;

    cursor: default;
    color: ${props => props.color ? props.color : 'transparent'};
    font-family: Tahoma;
    font-weight: bold;
    font-size: ${props => props.fontSize ? props.fontSize : '1.5em'};
    text-rendering: geometricPrecision;
    letter-spacing: 0.1em;

    ::selection {
        background: transparent;
    }

    background-image: linear-gradient(90deg, #845EC2, #D65DB1, #FF6F91, #FFC75F, #F9F871);
    background-size: 400%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: color-pos-animation 5s infinite alternate;


    @keyframes color-pos-animation {
        0%{
            background-position: left;
        }
        100%{
            background-position: right;
        }
    }
`

/*text-shadow: 0 0 10px ${props => props.color ? props.color : '#00b3ff'},
                0 0 20px ${props => props.color ? props.color : '#00b3ff'},
                0 0 40px ${props => props.color ? props.color : '#00b3ff'},
                0 0 80px ${props => props.color ? props.color : '#00b3ff'},
                0 0 120px ${props => props.color ? props.color : '#00b3ff'}; */