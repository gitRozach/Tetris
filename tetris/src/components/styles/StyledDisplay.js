import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px 0;
    padding: 0px;
    
    border: 0px solid #333;
    border-radius: 0px;
    background: transparent;
    
    min-height: 20px;
    width: 100%;

    color: ${props => props.color ? props.color : '#00b3ff'};
    font-family: sans-serif;
    font-weight: 600;
    font-size: ${props => props.fontSize ? props.fontSize : '1.5em'};
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px ${props => props.color ? props.color : '#00b3ff'},
                0 0 20px ${props => props.color ? props.color : '#00b3ff'},
                0 0 40px ${props => props.color ? props.color : '#00b3ff'},
                0 0 80px ${props => props.color ? props.color : '#00b3ff'},
                0 0 120px ${props => props.color ? props.color : '#00b3ff'};
`