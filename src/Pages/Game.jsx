import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./Game.module.css";
import blueToken from "../assets/bLue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import carGif from "../assets/sedan-car-animation-gif-download-8853235.gif";
import { TokensContext } from "../App";
import drawMap from "../Classes/Map";
import { dim } from "../Classes/Map";
import { blueTokenObj } from "../Classes/blueTokenMovement";
import { redTokenObj } from "../Classes/redTokenMovement";
import { greenTokenObj } from "../Classes/greenTokenMovement";
import { yellowTokenObj } from "../Classes/yellowTokenMovement";
import map from "../assets/Map.png";

function Game() {
  const [currentPositions, setCurrentPositions] = useState();
  const initialPositions = [
    {
      token1: { x: 32, y: 75, block: 0 },
      token2: { x: 32, y: 65, block: 0 },
      token3: { x: 37, y: 75, block: 0 },
      token4: { x: 37, y: 65, block: 0 },
    },
    {
      token1: { x: 32, y: 10, block: 13 },
      token2: { x: 32, y: 20, block: 13 },
      token3: { x: 37, y: 10, block: 13 },
      token4: { x: 37, y: 20, block: 13 },
    },
    {
      token1: { x: 58, y: 10, block: 26 },
      token2: { x: 58, y: 20, block: 26 },
      token3: { x: 63, y: 10, block: 26 },
      token4: { x: 63, y: 20, block: 26 },
    },
    {
      token1: { x: 58, y: 75, block: 39 },
      token2: { x: 58, y: 65, block: 39 },
      token3: { x: 63, y: 75, block: 39 },
      token4: { x: 63, y: 65, block: 39 },
    },
  ];

  const {
    bluePositions,
    setBluePositions,
    redPositions,
    setRedPositions,
    greenPositions,
    setGreenPositions,
    yellowPositions,
    setYellowPositions,
  } = useContext(TokensContext);
  const [allBlueTokens, setAllBlueTokens] = useState();
  const [allRedTokens, setAllRedTokens] = useState();
  const [allGreenTokens, setAllGreenTokens] = useState();
  const [allYellowTokens, setAllYellowTokens] = useState();

  const [diceName, setDiceName] = useState("six");
  const [diceNum, setDiceNum] = useState(6);
  const dice = useRef();
  const [turn, setTurn] = useState(0);
  const mapContainer = useRef();
  const diceContainer = useRef();
  const [tokensOut, setTokensOut] = useState([]);
  const playerColors = ["blue", "red", "green", "yellow"];
  const colors = ["#07b1ea", "#b51616", "#057f05", "#f1f116"];

  //ON START
  useEffect(() => {
    const blueTokens = new blueTokenObj(styles, setBluePositions);
    setAllBlueTokens(blueTokens);
    setBluePositions(blueTokens.getPositions());

    const redTokens = new redTokenObj(styles, setRedPositions);
    setAllRedTokens(redTokens);
    setRedPositions(redTokens.getPositions());

    const greenTokens = new greenTokenObj(styles, setGreenPositions);
    setAllGreenTokens(greenTokens);
    setGreenPositions(greenTokens.getPositions());

    const yellowTokens = new yellowTokenObj(styles, setYellowPositions);
    setAllYellowTokens(yellowTokens);
    setYellowPositions(yellowTokens.getPositions());

    // setCurrentPositions([...initialPositions])

    dice.current.classList.add(styles.dice);
  }, []);

  function diceOn() {
    diceContainer.current.style.pointerEvents = "all";
    dice.current.classList.add(styles.dice);
    mapContainer.current.style.pointerEvents = "none";
  }
  function diceOff() {
    mapContainer.current.style.pointerEvents = "none";
    diceContainer.current.style.pointerEvents = "none";
    dice.current.classList.remove(styles.dice);
    dice.current.classList.add(styles.diceRoll);
  }
  function mapOn() {
    mapContainer.current.style.pointerEvents = "all";
  }
  function mapOff() {
    mapContainer.current.style.pointerEvents = "none";
  }
  function handleDiceRoll(e) {
    diceOff();
    const diceNums = ["one", "two", "three", "four", "five", "six"];
    const randomNum = Math.floor(Math.random() * 6); //give 0 - 5 to pick from above array
    setDiceNum(randomNum + 1);
    setTimeout(() => {
      //dice Finished rolling
      setDiceName(diceNums[randomNum]);
      e.target.classList.remove(styles.diceRoll);
      mapOn();
    }, 1000);
    if (randomNum + 1 === 6) {
      mapOn();
      return;
    }

    const hasTokensOut = tokensOut.find((i) => {
      return i.startsWith(e.target.id);
    });

    if (hasTokensOut) return;
    setTimeout(() => {
      mapOff();
      diceOn();
      if (turn === 3) {
        setTurn(0);
      } else {
        setTurn(turn + 1);
      }
    }, 2000);
  }

  function handleCollisionDetection(token, currentBlock, playerBlocks) {
    let newPositions = null;
    Object.entries(playerBlocks).map(([player, block]) => {
      if (
        block === currentBlock &&
        player !== token &&
        player.slice(0, player.length - 1) !== token.slice(0, token.length - 1)
      ) {
        let color = player.slice(0, player.indexOf("token"));
        let setColorPositions;
        let colorPositions;
        let tokensObj;
        let num;
        switch (color) {
          case "blue":
            colorPositions = bluePositions;
            setColorPositions = setBluePositions;
            tokensObj = allBlueTokens;
            num = 0;
            break;

          case "red":
            colorPositions = redPositions;
            setColorPositions = setRedPositions;
            tokensObj = allRedTokens;
            num = 1;
            break;

          case "green":
            colorPositions = greenPositions;
            setColorPositions = setGreenPositions;
            tokensObj = allGreenTokens;
            num = 2;
            break;

          case "yellow":
            colorPositions = yellowPositions;
            setColorPositions = setYellowPositions;
            tokensObj = allYellowTokens;
            num = 3;
            break;
        }
        let tokenName = player.slice(player.indexOf("token"), player.length);
        newPositions = {
          ...colorPositions,
          [tokenName]: initialPositions[num][tokenName],
        };
        setColorPositions(newPositions);
        tokensObj.setPositions([tokenName, initialPositions[num][tokenName]]);
      }
    });
    return newPositions;
  }

  function handleMoveBlue(e) {
    if (turn !== 0) return;

    const token = e.target.id;
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1
    if (!allBlueTokens.getPlayingTokens().includes(num) ) {
      //takes one blue token out
      mapOff();
      setBluePositions(allBlueTokens.takeOut(num));
      dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, token]);

      setTimeout(() => {
        diceOn();
      }, 600);
      return;
    } else if (allBlueTokens.getPlayingTokens().includes(num)) {
      mapOff();
      allBlueTokens.moveToken(e.target, num, diceNum)[0]();
      setBluePositions(allBlueTokens.getPositions());
      setTimeout(() => {
        let block = allBlueTokens.moveToken(e.target, num, diceNum)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setBluePositions
        );
        console.log(block)
        if (turn === 3) {
          setTurn(0);
        } else {
          setTurn(turn + 1);
        }
        diceOn();
      }, 700 * diceNum);
    }
  }
  //  console.log(currentPositions)

  function handleMoveRed(e) {
    if (turn !== 1) return;

    const token = e.target.id;
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1 and add === 6
    if (!allRedTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one green token out
      mapOff();
      setRedPositions(allRedTokens.takeOut(num));
      dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, token]);
      setTimeout(() => {
        diceOn();
      }, 600);
      return;
    } else if (allRedTokens.getPlayingTokens().includes(num)) {
      mapOff();
      allRedTokens.moveToken(e.target, num, diceNum)[0]();
      setRedPositions(allRedTokens.getPositions());
      setTimeout(() => {
        let block = allRedTokens.moveToken(e.target, num, diceNum)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setRedPositions
        );
        console.log(block)
        if (turn === 3) {
          setTurn(0);
        } else {
          setTurn(turn + 1);
        }
        diceOn();
      }, 700 * diceNum);
    }
  }

  function handleMoveGreen(e) {
    if (turn !== 2) return;

    const token = e.target.id;
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    console.log(token);
    //REMOVE +1 and diceNum === 6
    if (!allGreenTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one green token out
      mapOff();
      setGreenPositions(allGreenTokens.takeOut(num));
      dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, token]);
      setTimeout(() => {
        diceOn();
      }, 600);
      return;
    } else if (allGreenTokens.getPlayingTokens().includes(num)) {
      mapOff();
      allGreenTokens.moveToken(e.target, num, diceNum)[0]();
      setGreenPositions(allGreenTokens.getPositions());
      setTimeout(() => {
        let block = allGreenTokens.moveToken(e.target, num, diceNum)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setGreenPositions
        );
        if (turn === 3) {
          setTurn(0);
        } else {
          setTurn(turn + 1);
        }
        diceOn();
      }, 700 * diceNum);
    }
  }

  function handleMoveYellow(e) {
    if (turn !== 3) return;

    const token = e.target.id;
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1 and diceNum === 6
    if (!allYellowTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one red token out
      mapOff();
      setYellowPositions(allYellowTokens.takeOut(num));
      dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, token]);
      setTimeout(() => {
        diceOn();
      }, 600);
      return;
    } else if (allYellowTokens.getPlayingTokens().includes(num)) {
      mapOff();
      allYellowTokens.moveToken(e.target, num, diceNum)[0]();
      setYellowPositions(allYellowTokens.getPositions());
      setTimeout(() => {
        let block = allYellowTokens.moveToken(e.target, num, diceNum)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
          handleCollisionDetection(
            token,
            block,
            { ...currentPositions, [token]: block },
            setYellowPositions
          );
        if (turn === 3) {
          setTurn(0);
        } else {
          setTurn(turn + 1);
        }
        diceOn();
      }, 1000 * diceNum);
    }
  }

  return (
    <div className={styles.splashContainer}>
      <div
        style={{ color: `${colors[turn]}` }}
        onClick={handleDiceRoll}
        className={styles.diceContainer}
        ref={diceContainer}
        id={playerColors[turn]}
      >
        <i
          id={playerColors[turn]}
          ref={dice}
          className={`fa-solid fa-dice-${diceName}`}
        ></i>
      </div>
      <div className={styles.mapContainer} ref={mapContainer}>
        <img src={map} className={styles.map} />
        {bluePositions &&
          Object.entries(bluePositions).map(([token, pos]) => (
            <>
              <img
                id={`blue${token}`}
                onClick={handleMoveBlue}
                className={`${styles.tokens}`}
                src={blueToken}
                style={{ left: `${pos.x}vw`, top: `${pos.y}vh` }}
              />
            </>
          ))}
        {redPositions &&
          Object.entries(redPositions).map(([token, pos]) => (
            <img
              id={`red${token}`}
              onClick={handleMoveRed}
              className={styles.tokens}
              src={redToken}
              style={{
                left: `${pos.x}vw`,
                top: `${pos.y}vh`,
              }}
            />
          ))}

        {greenPositions &&
          Object.entries(greenPositions).map(([token, pos]) => (
            <img
              id={`green${token}`}
              onClick={handleMoveGreen}
              className={styles.tokens}
              src={greenToken}
              style={{
                left: `${pos.x}vw`,
                top: `${pos.y}vh`,
              }}
            />
          ))}

        {yellowPositions &&
          Object.entries(yellowPositions).map(([token, pos]) => (
            <img
              id={`yellow${token}`}
              onClick={handleMoveYellow}
              className={styles.tokens}
              src={yellowToken}
              style={{
                left: `${pos.x}vw`,
                top: `${pos.y}vh`,
              }}
            />
          ))}
      </div>
      <div>
        {/* <input onChange={(e)=>{setDiceNum(Number(e.target.value))}}/> */}
      </div>
    </div>
  );
}

export default Game;
