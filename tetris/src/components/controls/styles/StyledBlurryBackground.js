import styled from "styled-components";

export const StyledBlurryBackground = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.blurColor ? props.blurColor : 'rgba(0, 0, 0, 0.1)'};
    backdrop-filter: blur(${props => props.blurRadius ? props.blurRadius : '15px'});
    -webkit-backdrop-filter: blur(15px);
`