import { StyledAltButton } from "./styles/StyledAltButton";

const AltButton = ({iconUrl, 
                    text, 
                    color, 
                    background,
                    width,
                    height,
                    borderRadius,
                    margin,
                    padding, 
                    callback
                    }) => {
    return (<StyledAltButton 
                color={color} 
                background={background} 
                width={width} 
                height={height} 
                borderRadius={borderRadius} 
                margin={margin} 
                padding={padding} 
                onClick={callback}>
        <img alt="" src={iconUrl}></img>
        <span>{text}</span>
    </StyledAltButton>);
}

export default AltButton;