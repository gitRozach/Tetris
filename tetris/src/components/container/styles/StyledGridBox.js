import styled from "styled-components";

export const StyledGridBox = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-auto-rows: 3rem;
    grid-column-gap: 50px;

    align-items: start;
    justify-items: start;
    
    margin: 3rem 3rem;
    
    width: 100%;
    height: 100%;
`