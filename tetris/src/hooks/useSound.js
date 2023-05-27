import { useState } from "react";

export const useSound = (audioIterable, audioVolume) => {    
    const [soundtrack, setSoundtrack] = useState(null);
    const audioElement = <audio id="audioElement" defaultValue={audioVolume}/>

    const playSoundtrack = (index, loop=true) => {
        // Stop current playing audio before starting the new audio
        if (soundtrack) {
            document.querySelector('#audioElement').pause();
            document.querySelector('#audioElement').src = '';
        }

        //var track = new Audio(audioIterable[index]);
        // setSoundtrack(track);
        document.querySelector('#audioElement').src = audioIterable[index];
        document.querySelector('#audioElement').volume = audioVolume;

        if (loop) {
            if (typeof audioElement.loop == 'boolean') {
                document.querySelector('#audioElement').loop = true;
            } else {
                document.querySelector('#audioElement').addEventListener('ended', () => {
                    document.querySelector('#audioElement').currentTime = 0;
                    document.querySelector('#audioElement').play();
                }, false);
            }
        }
        document.querySelector('#audioElement').play();
    }

    const pauseSoundtrack = () => {
        document.querySelector('#audioElement').pause();
    }

    const stopSoundtrack = () => {
        document.querySelector('#audioElement').stop();
    }

    return [audioElement, soundtrack, playSoundtrack, pauseSoundtrack, stopSoundtrack];
}