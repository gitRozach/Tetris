import { StyledTextOutput } from "./styles/StyledTextOutput";

const TextOutput = ({text, fontFamily, fontSize, textAlign, whiteSpace, background, borderRadius, color, padding, margin, animationColor, animatedColor}) => (
    <StyledTextOutput
        fontFamily={fontFamily}
        fontSize={fontSize}
        textAlign={textAlign}
        whiteSpace={whiteSpace}
        background={background}
        borderRadius={borderRadius}
        color={color}
        padding={padding}
        margin={margin}
        animationColor={animationColor}
        animatedColor={animatedColor}
    >{text}</StyledTextOutput>
)

export default TextOutput;