import { StyledButton } from "./styles/StyledButton";

const Button = ({ id, children, width, height, borderRadius, background, color, fontFamily, fontWeight, fontSize, callback }) => (
    <StyledButton
        id={id}
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
