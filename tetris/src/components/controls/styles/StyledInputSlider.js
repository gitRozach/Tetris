import styled from "styled-components";

//TODO

export const StyledInputSlider = styled.input`
.slider {
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    width: 25rem;
    /* Full-width */
    height: 25px;
    /* Specified height */
    background: #d3d3d3;
    /* Grey background */
    outline: none;
    /* Remove outline */
    opacity: 0.7;
    /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s;
    /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    border-radius: 5px;
}

.slider:hover {
    opacity: 1;
    /* Fully shown on mouse-over */
}

::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    width: 23px;
    /* Set a specific slider handle width */
    height: 23px;
    /* Slider handle height */
    background: #04AA6D;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
    border-radius: 5px;
}

.slider::-moz-range-thumb {
    width: 23px;
    /* Set a specific slider handle width */
    height: 23px;
    /* Slider handle height */
    background: #04AA6D;
    /* Green background */
    cursor: pointer;
    /* Cursor on hover */
    border-radius: 5px;
}
`