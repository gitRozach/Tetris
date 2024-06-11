import styled from "styled-components";

//TODO

export const StyledInputSlider = styled.input`
.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 25rem;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 5px;
}

.slider:hover {
    opacity: 1;
}

::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 23px;
    height: 23px;
    background: #04AA6D;
    cursor: pointer;
    border-radius: 5px;
}

.slider::-moz-range-thumb {
    width: 23px;
    height: 23px;
    background: #04AA6D;
    cursor: pointer;
    border-radius: 5px;
}
`