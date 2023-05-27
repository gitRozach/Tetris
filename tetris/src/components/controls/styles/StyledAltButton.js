import styled from 'styled-components';

export const StyledAltButton = styled.button`
    --width: ${props => props.width ? props.width : '100%'};
    --height: ${props => props.height ? props.height : '3.9rem'};
    --icon-container-width: ${props => props.height ? props.height : '3.9rem'};
    --icon-container-height: ${props => props.height ? props.height : '3.9rem'};
    --icon-width: ${props => props.iconWidth ? props.iconWidth : '1.5rem'};
    --icon-height: ${props => props.iconHeight ? props.iconHeight : '1.5rem'};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    outline: none;
    border: none;
    border-radius: ${props => props.borderRadius ? props.borderRadius : '2rem'};
    background-color: ${props => props.background ? props.background : '#121821'};

    width: var(--width);
    height: var(--height);
    margin: ${props => props.margin ? props.margin : '0'};
    padding: ${props => props.padding ? props.padding : '0rem 3.9rem 0rem 3.9rem'};
    position: relative;
    
    font-family: '${props => props.fontFamily ? props.fontFamily : 'Arial'}';
    font-size: ${props => props.fontSize ? props.fontSize : '1.6rem'};
    line-height: var(--height);
    color: ${props => props.color ? props.color : 'white'};
    z-index: 1;

    :hover {
        ::after {
            width: 100%;
            right: 0;
        }

        img {
            left: calc(50% - 0.5 * var(--icon-width));
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
        height: var(--height);
    }

    img {
        position: absolute;
        width: var(--icon-width);
        height: var(--icon-height);
        z-index: 2;
        top: calc((var(--height) - var(--icon-height)) / 2.0);
        left: calc((var(--height) - var(--icon-width)) / 2.0);
        
        transition: 200ms all;
        transition-delay: 35ms;
    }

    ::after {
        content: "";
        display: block;
        width: ${props => props.height ? props.height : '3.9rem'};
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

    ::before {
        content: "";
        display: block;
        width: var(--icon-container-width);
        height: var(--icon-container-height);
        position: absolute;
        z-index: 0;
        right: 0;
        top: 0;
        transition: 200ms all;
        transition-delay: 35ms;
    }

    @media screen and (max-width: 992px) {
        ::after {
            width: 100%;
            right: 0;
        }

        img {
            left: calc(50% - 0.5 * ${props => props.iconWidth ? props.iconWidth : '1.5rem'});
            transform: rotate(360deg);
        }
    }
`