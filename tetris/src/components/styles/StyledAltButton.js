import styled from 'styled-components';

export const StyledAltButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: ${props => props.borderRadius ? props.borderRadius : '2rem'};
    background-color: ${props => props.background ? props.background : '#121821'};

    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : '3.9rem'};
    margin: ${props => props.margin ? props.margin : '1rem 0rem'};
    padding: ${props => props.padding ? props.padding : '1rem 3rem 1rem 7rem'};
    position: relative;
    
    font-size: 1.6rem;
    color: ${props => props.color ? props.color : 'white'};
    z-index: 1;

    :hover {
        ::after {
            width: 100%;
            right: 0;
        }

        img {
            left: 50%;
            transform: rotate(360deg);
        }
    }

    :active {
        ::after {
            width: 3.9rem;
            left: 0;
        }

        img {
            left: 1.1rem;
        }
    }
    
    span {
        z-index: 1;
        position: relative;
    }

    img {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        z-index: 2;
        top: 1.2rem;
        left: 1.2rem;
        
        
        transition: 200ms all;
        transition-delay: 35ms;
    }

    ::after {
        content: "";
        display: block;
        width: 3.9rem;
        height: ${props => props.height ? props.height : '3.9rem'};
        background-color: ${props => props.color ? props.color : 'white'};
        border-radius: ${props => props.borderRadius ? props.borderRadius : '2rem'};
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        transition: 200ms all;
        transition-delay: 35ms;
    }
`