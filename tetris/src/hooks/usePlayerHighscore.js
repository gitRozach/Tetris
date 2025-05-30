import { formatDateDDMMYYYY } from "../tools";

export const usePlayerHighscore = () => {
    // const defaultHighscoreCookie = { username: '', highscore: 0, date: new Date() };
    // const [highscore, setHighscore] = useState(defaultHighscoreCookie);

    // const isNewHighscore = (score) => {
    //     console.log('score > highscore.highscore ->', score, highscore.highscore);
    //     if (score > highscore.highscore) {
    //         console.log('NEW HIGHSCORE:', score);
    //         return true;
    //     }
    //     console.log('NO HIGHSCORE:', score);
    //     return false;
    // }

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