import { StyledButton } from "./styles/StyledButton"; 

const Button = ({ text, callback }) => (
    <StyledButton onClick={callback}>{text}</StyledButton>
)

export default Button;
