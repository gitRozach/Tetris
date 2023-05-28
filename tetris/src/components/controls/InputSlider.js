import { useMemo, useState } from "react";
import './styles/css/InputSlider.css';

const InputRange = (minValue, maxValue, stepsValue, initialValue, onChangeCallback) => {
    const [sliderValue, setSliderValue] = useState(initialValue);

    const sliderComponent = useMemo(() => (<input className="slider" key="input-slider" type="range" defaultValue={sliderValue} step={stepsValue} min={minValue} max={maxValue} onChange={e => {
        onChangeCallback(e.target.value);
        setSliderValue(e.target.value);
    }} />), [onChangeCallback]);

    return [sliderValue, setSliderValue, sliderComponent];
};

export default InputRange;