import styled from 'styled-components';

export const StyledAltButton = styled.button`
    cursor: pointer;
    border-radius: 2rem;
    width: 100%;
    margin: 1rem 0rem;

    border: none;
    padding: 1rem 3rem 1rem 7rem;
    position: relative;
    font-size: 1.6rem;
    color: white;
    background-color: #121821;
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
        width: 1.5rem;
        height: 1.5rem;
        z-index: 2;
        top: 1.3rem;
        left: 1.1rem;
        position: absolute;
        transition: 200ms all;
        transition-delay: 35ms;
    }

    ::after {
        content: "";
        display: block;
        width: 3.9rem;
        height: 3.9rem;
        background-color: rgba(235, 165, 52, 1);
        border-radius: 2rem;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        transition: 200ms all;
        transition-delay: 35ms;
    }
`