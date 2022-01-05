import { StyledAltButton } from "./styles/StyledAltButton";

const AltButton = ({iconUrl, 
                    text, 
                    color, 
                    background,
                    width,
                    height,
                    borderRadius, 
                    callback
                    }) => {
    return (<StyledAltButton onClick={callback}>
        <img alt="" src={iconUrl}></img>
        <span>{text}</span>
    </StyledAltButton>);
}

export default AltButton;