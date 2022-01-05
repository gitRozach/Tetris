import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({ text, fontSize }) => (
    <StyledDisplay fontSize={fontSize}>{text}</StyledDisplay>
)

export default Display;