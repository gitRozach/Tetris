import { useState } from "react";

export const useSound = (audioIterable) => {    
    const [soundtrack, setSoundtrack] = useState(null);

    const playSoundtrack = (index, loop=true) => {
        // Stop current playing audio before starting the new audio
        if (soundtrack) {
            soundtrack.pause();
            soundtrack.src = '';
        }

        let track = new Audio(audioIterable[index]);
        setSoundtrack(track);

        if (loop) {
            if (typeof track.loop == 'boolean') {
                track.loop = true;
            } else {
                track.addEventListener('ended', () => {
                    this.currentTime = 0; //this.
                    this.play(); //this.
                }, false);
            }
        }
        track.play();
    }

    const pauseSoundtrack = () => {
        soundtrack.pause();
    }

    const stopSoundtrack = () => {
        soundtrack.stop();
    }

    return [playSoundtrack, pauseSoundtrack, stopSoundtrack];
}