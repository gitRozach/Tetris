import styled from 'styled-components';

export const StyledTextInput = styled.input`
    position: relative;
    border-radius: 2rem;
    border: none;
    background-color: #121821;

    padding: ${props => props.padding ? props.padding : '1rem 0'};
    margin: ${props => props.margin ? props.margin : '0'};

    width: 100%;
    height: auto;

    font-family: '${props => props.fontFamily ? props.fontFamily : 'Tahoma'}';
    font-size: ${props => props.fontSize ? props.fontSize : '1.6rem'};
    color: white;
    text-align: center;
    vertical-align: center;
    z-index: 1;

    :focus {
        outline: none !important;
        border: 0px inset white;
        box-shadow: inset 0 0 5px white;
    }
`;