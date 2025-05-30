import { useMemo, useState } from "react";
import { StyledTextSelect } from "./styles/StyledTextSelect"

const TextSelect = (options, defaultOption, onChangeCallback) => {
    const [optionValue, setOptionValue] = useState(defaultOption);

    const selectComponent = useMemo(() => {
        return <StyledTextSelect defaultValue={optionValue} onChange={(event) => {
            setOptionValue(event.target.value);
            onChangeCallback(event.target.value);
        }}>{options.map(currentOption => <option key={`${currentOption}-option`}>{currentOption}</option>)}</StyledTextSelect>
    }, [optionValue])

    return [optionValue, setOptionValue, selectComponent]
}

export default TextSelect