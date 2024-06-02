import { useCallback } from "react";
import { useSettings } from "../../hooks/useSettings";
import GridBox from "../container/GridBox";
import InputRange from "../controls/InputSlider";
import TextSelect from "../controls/TextSelect";

const Settings = () => {
  const [
    soundtrackVolume,
    setSoundtrackVolume,
    tetrisCellSideLength,
    setTetrisCellSideLength,
    tetrisGridAnimationColor,
    setTetrisGridAnimationColor,
    tetrisTextAnimationColor,
    setTetrisTextAnimationColor
  ] = useSettings();

  const changeSoundtrackVolume = useCallback(
    (value) => {
      document.querySelector("#audioElement").volume = value;
      setSoundtrackVolume(value);
    },
    [soundtrackVolume]
  );

  const changeTetrisCellSideLength = useCallback(
    (value) => {
      setTetrisCellSideLength(value);
    },
    [tetrisCellSideLength]
  );

  const changeTetrisGridColorAnimation = useCallback((value) => {
    setTetrisGridAnimationColor(value);
  }, [tetrisGridAnimationColor]);

  const changeTetrisTextColorAnimation = useCallback((value) => {
    setTetrisTextAnimationColor(value);
  }, [tetrisTextAnimationColor]);

  const [
    soundtrackVolumeValue,
    setSoundtrackVolumeValue,
    soundtrackVolumeComponent,
  ] = InputRange(
    "soundtrack-volume",
    0.0,
    1.0,
    0.01,
    soundtrackVolume,
    changeSoundtrackVolume
  );
  const [
    tetrisCellSideLengthValue,
    setTetrisCellSideLengthValue,
    tetrisCellSideLengthComponent,
  ] = InputRange(
    "tetris-cell-side-length",
    10,
    100,
    5,
    tetrisCellSideLength,
    changeTetrisCellSideLength
  );

  const [
    tetrisGridAnimationColorValue, 
    setTetrisGridAnimationColorValue, 
    tetrisGridAnimationColorComponent
  ] = TextSelect(['Blue', 'Fade', 'None'], 'Blue', changeTetrisGridColorAnimation);

  const [
    tetrisTextAnimationColorValue, 
    setTetrisTextAnimationColorValue, 
    tetrisTextAnimationColorComponent
  ] = TextSelect(['White', 'Blue', 'Fade'], 'White', changeTetrisTextColorAnimation);


  return [
    soundtrackVolume,
    tetrisCellSideLength,
    tetrisGridAnimationColor,
    tetrisTextAnimationColor,
    <GridBox key="settings-grid">
      <h3
        style={{
          color: "white",
          padding: "0 0 0 50px",
          margin: "0",
          justifySelf: "start",
        }}
      >
        Soundtrack Volume
      </h3>
      {soundtrackVolumeComponent}

      <h3
        style={{
          color: "white",
          padding: "0 0 0 50px",
          margin: "0",
          justifySelf: "start",
        }}
      >
        Grid Size
      </h3>
      {tetrisCellSideLengthComponent}

      <h3
        style={{
          color: "white",
          padding: "0 0 0 50px",
          margin: "0",
          justifySelf: "start",
        }}
      >
        Grid Color
      </h3>
      {tetrisGridAnimationColorComponent}

      <h3
        style={{
          color: "white",
          padding: "0 0 0 50px",
          margin: "0",
          justifySelf: "start",
        }}
      >
        Text Color
      </h3>
      {tetrisTextAnimationColorComponent}
    </GridBox>
  ];
};

export default Settings;
