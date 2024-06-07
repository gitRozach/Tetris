import { COLOR_WHITE } from "../../constants/settingsConstants";
import { formatMillisecondsToHHMMSS } from "../../tools";
import GridBox from "../container/GridBox";
import TextOutput from "../controls/TextOutput";

const Statistics = (username, score, rows, blocks, timePlayed) => {

    return (<GridBox key="statistics-component-container">
        {username && <TextOutput animationColor={COLOR_WHITE} text="USERNAME:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />}
        {username && <TextOutput animationColor={COLOR_WHITE} text={username} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />}
        <TextOutput animationColor={COLOR_WHITE} text="SCORE:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={score} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="CLEARED ROWS:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={rows} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="TIME PLAYED:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={formatMillisecondsToHHMMSS(timePlayed)} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />

        <TextOutput animationColor={COLOR_WHITE} text="BLOCKS PLACED" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={Object.keys(blocks).reduce((ack, key) => (ack + blocks[key]), 0)} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="I" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.I} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="J" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.J} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="L" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.L} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="O" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.O} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="S" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.S} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="T" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.T} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor={COLOR_WHITE} text="Z" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor={COLOR_WHITE} text={blocks.Z} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
    </GridBox>)
}

export default Statistics;