import { useMemo, useState } from "react";
import "./styles/css/InputSlider.css";

const InputRange = (
  id,
  minValue,
  maxValue,
  stepsValue,
  initialValue,
  onChangeCallback
) => {
  const [sliderValue, setSliderValue] = useState(initialValue);

  const sliderComponent = useMemo(
    () => (
      <input
        id={id}
        className="slider"
        key={"input-slider-" + id}
        type="range"
        defaultValue={sliderValue}
        step={stepsValue}
        min={minValue}
        max={maxValue}
        onChange={(e) => {
          onChangeCallback(e.target.value);
          setSliderValue(e.target.value);
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChangeCallback]
  );

  return [sliderValue, setSliderValue, sliderComponent];
};

export default InputRange;
