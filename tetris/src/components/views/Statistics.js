import { formatMillisecondsToHHMMSS } from "../../tools";
import GridBox from "../container/GridBox";
import TextOutput from "../controls/TextOutput";

const Statistics = (username, score, rows, blocks, timePlayed) => {

    return (<GridBox>
        {username && <TextOutput animationColor="White" text="USERNAME:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />}
        {username && <TextOutput animationColor="White" text={username} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />}
        <TextOutput animationColor="White" text="SCORE:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={score} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="CLEARED ROWS:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={rows} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="TIME PLAYED:" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={formatMillisecondsToHHMMSS(timePlayed)} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />

        <TextOutput animationColor="White" text="BLOCKS PLACED" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={Object.keys(blocks).reduce((ack, key) => (ack + blocks[key]), 0)} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="I" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.I} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="J" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.J} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="L" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.L} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="O" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.O} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="S" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.S} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="T" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.T} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
        <TextOutput animationColor="White" text="Z" color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" padding="0 3rem" />
        <TextOutput animationColor="White" text={blocks.Z} color="#FFF" textAlign="left" fontFamily="Exo 2" fontSize="1.8rem" />
    </GridBox>)
}

export default Statistics;