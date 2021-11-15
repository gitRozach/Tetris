import { useState } from "react";

export const useSound = (audioIterable) => {    
    const [soundtrack, setSoundtrack] = useState(null);

    const playSoundtrack = (index, loop=true) => {
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

    return [playSoundtrack, pauseSoundtrack];
}