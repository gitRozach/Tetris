import styled from "styled-components";

export const StyledTextSelect = styled.select`

@media only screen and (min-width: 768px) {
    width: 25rem;
    background: black;
    border: 1px solid white;
    border-radius: 5px;
    font-family: 'Exo 2';
    font-size: 1.2rem;
    color: white;

    * {
        border-radius 0;
    }

    > option {
        // background-color: rgb(255, 255, 255);
        // color: rgb(0, 0, 0);
        margin: 0;
        border-radius: 0;
        font-family: 'Exo 2';
    }

    > option:nth-last-child(1) {
        background-color: green;
    }

    > option:not(:checked){
       background-color: rgba(0, 0, 0, 0.0);
    }

    > option::hover {
        background-color: white;
        color: black;
    }
    

    > option:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    > option:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}
`;
