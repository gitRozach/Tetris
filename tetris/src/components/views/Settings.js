import { useCallback } from "react";
import { useSettings } from "../../hooks/useSettings";
import GridBox from "../container/GridBox";
import InputRange from "../controls/InputSlider";


const Settings = () => {
    const [soundtrackVolume, setSoundtrackVolume, tetrisCellSideLength, setTetrisCellSideLength] = useSettings();

    const changeSoundtrackVolume = useCallback((value) => {
        document.querySelector('#audioElement').volume = value;
        setSoundtrackVolume(value);  
    }, [soundtrackVolume]);

    const changeTetrisCellSideLength = useCallback((value) => {
        setTetrisCellSideLength(value);
    }, [tetrisCellSideLength]);

    const [soundtrackVolumeValue, setSoundtrackVolumeValue, soundtrackVolumeComponent] = InputRange(0.0, 1.0, 0.01, soundtrackVolume, changeSoundtrackVolume);
    const [tetrisCellSideLengthValue, setTetrisCellSideLengthValue, tetrisCellSideLengthComponent] = InputRange(10, 100, 5, tetrisCellSideLength, changeTetrisCellSideLength);

    return [soundtrackVolume, tetrisCellSideLength, (<GridBox>
        <h3 style={{color: 'white', padding: '0 0 0 50px', margin: '0', justifySelf: 'start'}}>Soundtrack Volume</h3>
        {soundtrackVolumeComponent}
        <h3 style={{color: 'white', padding: '0 0 0 50px', margin: '0', justifySelf: 'start'}}>Tetris Size</h3>
        {tetrisCellSideLengthComponent}
    </GridBox>)];
};

export default Settings;