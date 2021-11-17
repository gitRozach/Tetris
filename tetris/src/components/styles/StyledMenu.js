import styled from 'styled-components';

export const StyledMenu = styled.div`
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.8);

    overflow: hidden;
    z-index: 9999;
`