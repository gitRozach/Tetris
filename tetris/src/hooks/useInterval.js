import { useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function interval() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(interval, delay);
            return () => {
                clearInterval(id);
            }
        }
    }, [delay]);



}

