import { StyledTextInput } from "./styles/StyledTextInput";

const TextInput = ({
  id,
  text,
  fontFamily,
  fontSize,
  margin,
  padding,
  onChange,
}) => {
  return (
    <StyledTextInput
      id={id}
      value={text}
      spellCheck={false}
      onChange={(e) => onChange(e.target.value)}
      fontFamily={fontFamily}
      fontSize={fontSize}
      margin={margin}
      padding={padding}
    />
  );
};

export default TextInput;
