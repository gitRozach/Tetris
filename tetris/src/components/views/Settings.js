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
  ] = TextSelect(['BLUE', 'FADE', 'NONE'], 'FADE', changeTetrisGridColorAnimation);

  const [
    tetrisTextAnimationColorValue, 
    setTetrisTextAnimationColorValue, 
    tetrisTextAnimationColorComponent
  ] = TextSelect(['WHITE', 'BLUE', 'FADE'], 'FADE', changeTetrisTextColorAnimation);

  const settingsTextH3Properties = {
    color: "white",
    padding: "0 0 0 50px",
    margin: "0",
    justifySelf: "start",
  }

  return [
    soundtrackVolume,
    tetrisCellSideLength,
    tetrisGridAnimationColor,
    tetrisTextAnimationColor,
    <GridBox key="settings-component-container">
      <h3 style={settingsTextH3Properties}>Soundtrack Volume</h3>
      {soundtrackVolumeComponent}

      <h3 style={settingsTextH3Properties}>Grid Size</h3>
      {tetrisCellSideLengthComponent}

      <h3 style={settingsTextH3Properties}>Grid Color</h3>
      {tetrisGridAnimationColorComponent}

      <h3 style={settingsTextH3Properties}>Text Color</h3>
      {tetrisTextAnimationColorComponent}
    </GridBox>
  ];
};

export default Settings;