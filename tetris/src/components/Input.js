import { StyledInput } from "./styles/StyledInput";
import { useState } from "react";

const Input = ({ text, font, fontSize, margin, padding }) => {
    const [inputValue, setInputValue] = useState(text ? text : "");
    return [inputValue, <StyledInput defaultValue={inputValue}
                                    value={inputValue}
                                    spellCheck={false}
                                    onChange={e => {console.log(e.target.value); setInputValue(e.target.value);}}
                                    font={font}
                                    fontSize={fontSize} 
                                    margin={margin}
                                    padding={padding} />];
};

export default Input;