import { formatDateDDMMYYYY } from "../tools";

export const usePlayerHighscore = () => {
    const readHighscoreCookie = () => {
        const cookieValue = document.cookie;
        let cookieUsername = '';
        let cookieHighscore = 0;
        let cookieDate = new Date();

        console.log("Cookie value:", cookieValue);
        if (cookieValue !== '') {
            const splitCookie = cookieValue.split(',');

            for (let index = 0; index < splitCookie.length; ++index) {
                const currentSplitKeyAndValue = splitCookie[index].split(':');
                const currentKey = currentSplitKeyAndValue[0];
                const currentValue = currentSplitKeyAndValue[1];

                if (currentKey === 'username') cookieUsername = currentValue;
                else if (currentKey === 'highscore') cookieHighscore = currentValue
                else if (currentKey === 'date') cookieDate = currentValue;
            }
        }
        console.log('readHighscore:', { username: cookieUsername, highscore: cookieHighscore, date: cookieDate });
        return { username: cookieUsername, highscore: cookieHighscore, date: cookieDate };
    }

    const saveHighscoreCookie = (username, highscore, date) => {
        console.log('Writing cookie value:', username, highscore, date);
        document.cookie = `username:${username},highscore:${highscore},date:${formatDateDDMMYYYY(date)};`;
    };

    return [readHighscoreCookie, saveHighscoreCookie]
}