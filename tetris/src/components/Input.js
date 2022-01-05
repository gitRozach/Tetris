import { StyledInput } from "./styles/StyledInput";
import { useState } from "react";

const Input = () => {
    const [inputValue, setInputValue] = useState("");
    return [inputValue, <StyledInput defaultValue={''} />];
};

export default Input;