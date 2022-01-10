import styled from 'styled-components';

export const StyledInput = styled.input`
    position: relative;
    border-radius: 2rem;
    border: none;
    background-color: #121821;

    padding: ${props => props.padding ? props.padding : '1rem 0rem'};
    margin: ${props => props.padding ? props.padding : '1rem 0rem'};

    width: 100%;

    font-size: ${props => props.fontSize ? props.fontSize : '1.6rem'};
    color: white;
    text-align: center;
    z-index: 1;
`;