import { StyledAltButton } from "./styles/StyledAltButton";

const AltButton = ({iconUrl, text, callback}) => {
    return (<StyledAltButton onClick={callback}>
        <img alt="" src={iconUrl}></img>
        <span>{text}</span>
    </StyledAltButton>);
}

export default AltButton;