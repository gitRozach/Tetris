import { formatMillisecondsToHHMMSS } from "../../tetrisTools";
import GridBox from "../container/GridBox";
import TextOutput from "../controls/TextOutput";

const Statistics = (username, score, rows, blocks, timePlayed) => {

    return  (<GridBox>
                {username && <TextOutput text="USERNAME:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>}
                {username && <TextOutput text={username} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>}
                <TextOutput text="SCORE:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={score} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="CLEARED ROWS:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={rows} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                {/*<TextOutput text="PLACED BLOCKS:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>*/}
                <TextOutput text="TIME PLAYED:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={formatMillisecondsToHHMMSS(timePlayed)} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />

                <TextOutput text="BLOCKS PLACED" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={Object.keys(blocks).reduce((ack, key) => (ack + blocks[key]), 0)} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="I" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.I} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="J" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.J} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="L" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.L} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="O" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.O} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="S" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.S} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="T" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.T} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
                <TextOutput text="Z" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem"/>
                <TextOutput text={blocks.Z} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem"/>
            </GridBox>)
}

export default Statistics;