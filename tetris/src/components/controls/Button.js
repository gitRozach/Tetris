import { StyledButton } from "./styles/StyledButton";

const Button = ({ children, width, height, borderRadius, background, color, fontFamily, fontWeight, fontSize, callback }) => (
    <StyledButton
        width={width}
        height={height}
        borderRadius={borderRadius}
        background={background}
        color={color}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        onClick={callback}
    >{children}</StyledButton>
)

export default Button;
