import { useState, useEffect } from "react";
import { storage, firestore } from "../firebase/config";

export const useHighscoreStorage = (username) => {
    const [storedHighscores, setStoredHighscores] = useState([]);

    const downloadHighscores = () => {
        let storedItems = [];
        firestore.collection('highscores').onSnapshot((snap) => {
            snap.forEach((doc) => {
                storedItems.push(doc.data());
            });
        });
        setStoredHighscores(storedItems);
        console.log('Highscores: ', storedHighscores);
    }

    const uploadHighscore = async (scoreMap) => {
        await firestore.collection('highscores').doc(username).set(scoreMap);
    }

    useEffect(() => {downloadHighscores();}, []);

    return [storage, firestore, storedHighscores];
};