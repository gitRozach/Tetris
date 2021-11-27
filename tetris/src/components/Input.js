import { StyledInput } from "./styles/StyledInput";
import { useState } from "react";

const Input = ({ value }) => {
    const [inputValue, setInputValue] = useState("");
    return [inputValue, <StyledInput onChange={e => setInputValue(e.target.value)} defaultValue={value} />];
};

export default Input;