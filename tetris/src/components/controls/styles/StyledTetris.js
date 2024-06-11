import styled from "styled-components";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, #000, #000);
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  // * {
  //     padding: 0;
  //     margin: 0;
  //     box-sizing: border-box;
  // }

  display: flex;

  @media screen and (orientation: portrait) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    height: 100%;

    .game-stats-container {
      display: flex;
      flex-direction: column;
    }

    .game-controller {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  @media screen and (orientation: landscape) {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;

    .game-stats-container {
      width: 300px;
    }

    .game-controller {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 1rem;
      row-gap: 1rem;

      #game-controller-button-left {
        grid-area: 1 / 1 / 1 / 2;
      }

      #game-controller-button-right {
        grid-area: 1 / 3 / 2 / 4;
      }

      #game-controller-button-rotate {
        grid-area: 1 / 2 / 2 / 3;
      }

      #game-controller-button-down {
        grid-area: 2 / 2 / 3 / 3;
      }
    }
  }

  .game-over-container {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    overflow: hidden;
    padding: 1rem 0;
    background: #121821;
    width: max(400px, calc(50% - 2 * 1rem));
    border-radius: ${(props) =>
      props.borderRadius ? props.borderRadius : "2rem"};
  }

  .game-stats-container {
    // position: absolute;
    // z-index: 1;

    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;

    // width: 200px;
    // height: 400px;
    // top: calc(50% - 200px);
    // left: 10px;

    // border: 3px solid white;
    // background: transparent;
  }

  .game-controller-container {
    // position: absolute;
    // z-index: 1;

    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;

    // width: 200px;
    // height: 400px;
    // top: calc(50% - 200px);
    // right: 10px;

    // border: 3px solid white;
    // background: transparent;
  }

  .game-controller {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: space-between;
    // column-gap: 1rem;
  }
`;
