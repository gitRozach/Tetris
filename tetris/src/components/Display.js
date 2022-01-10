import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({ text, fontSize, padding, margin }) => (
    <StyledDisplay fontSize={fontSize} padding={padding} margin={margin}>{text}</StyledDisplay>
)

export default Display;