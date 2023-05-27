import { StyledAltButton } from "./styles/StyledAltButton";

const AltButton = ({iconUrl,
                    iconWidth,
                    iconHeight,
                    text, 
                    color, 
                    background,
                    fontFamily, 
                    fontSize,
                    width,
                    height,
                    borderRadius,
                    margin,
                    padding, 
                    callback
                    }) => {
    return (<StyledAltButton 
                iconWidth={iconWidth}
                iconHeight={iconHeight}
                color={color} 
                background={background}
                fontFamily={fontFamily}
                fontSize={fontSize} 
                width={width} 
                height={height} 
                borderRadius={borderRadius} 
                margin={margin} 
                padding={padding} 
                onClick={callback}>
        {iconUrl && <img alt={iconUrl} src={iconUrl} />}
        <span>{text}</span>
    </StyledAltButton>);
}

export default AltButton;