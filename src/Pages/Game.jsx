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
import Galaxy from "../Components/Galaxy";
import Particles from "../Components/Particles";
import Dice from "../Components/Dice";

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
    numOfPlayers,
  } = useContext(TokensContext);
  let random = null;
  const [allBlueTokens, setAllBlueTokens] = useState();
  const [allRedTokens, setAllRedTokens] = useState();
  const [allGreenTokens, setAllGreenTokens] = useState();
  const [allYellowTokens, setAllYellowTokens] = useState();
  const [diceName, setDiceName] = useState("one");
  const [diceNum, setDiceNum] = useState(null);
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

    // setCurrentPositions([...initialPositions]);
    blueDice.current.classList.add(styles.dice);

    // dice.current.classList.add(styles.dice);
  }, []);

  function diceOn(nextDice,currentDice) {
    nextDice.style.pointerEvents = "all";
    nextDice.classList.add(styles.dice);
    currentDice && currentDice.classList.remove(styles.dice)
    mapContainer.current.style.pointerEvents = "none";

  }
  function diceOff(currentDice) {
    mapContainer.current.style.pointerEvents = "none";
    currentDice.current.style.pointerEvents = "none";
  }
  function mapOn(mapSection) {
    mapContainer.current.style.pointerEvents = "all";
    mapSection.classList.add(styles.homeIndicator)
  }
  function mapOff(mapSection,time = 0) {
    mapContainer.current.style.pointerEvents = "none";
    setTimeout(()=>{
      mapSection.classList.remove(styles.homeIndicator)
    },time)
  }
  const blueDice = useRef(),
    redDice = useRef(),
    greenDice = useRef(),
    yellowDice = useRef();
  const allDice = [
    blueDice.current,
    redDice.current,
    greenDice.current,
    yellowDice.current,
  ];

  const blueOverlay = useRef(),
  redOverlay = useRef(),
  greenOverlay = useRef(),
  yellowOverlay = useRef();

  const allMapOverlay =[
    blueOverlay.current,
    redOverlay.current,
    greenOverlay.current,
    yellowOverlay.current,

  ]

  function handleDiceRoll() {
    const diceNum = Number(localStorage.getItem("diceNum")) - 1;
    const dice = allDice[turn];
    const diceNums = ["one", "two", "three", "four", "five", "six"];
      
  

    if (diceNum + 1 === 6) {
      mapOn(allMapOverlay[turn]);
      return; 
    }

    const hasTokensOut = tokensOut.find((i) => {
      return i.id.startsWith(dice.id);
    });

    if (hasTokensOut){
      setDiceName(diceNums[diceNum]);
      mapOn(allMapOverlay[turn]);
      return
    } 
    setTimeout(() => {
      mapOff(allMapOverlay[turn]);
      let inc = numOfPlayers === 2 ? 2 : 1;
      let minus = numOfPlayers >= 3 ? 1 : 0;
      if (turn >= numOfPlayers - minus) {
        setTurn(0);
        diceOn(allDice[0]);
      } else {
        setTurn(turn + inc);
        diceOn(allDice[turn + inc]);
      }
    }, 0);
  }

  function handleCollisionDetection(token, currentBlock, playerBlocks) {
    let newPositions = null;
    let safeBlocks = [1, 9,14, 22,27, 35,40, 48];
    let startBlocks = [0,13,26,39]
    let n = []
    Object.entries(playerBlocks).map(([player, block]) => {
      // console.log(block,currentBlock)
      // console.log(player,token)
      if (
        block === currentBlock &&
        player !== token &&
        player.slice(0, player.length - 1) !==
          token.slice(0, token.length - 1) &&
        !safeBlocks.includes(block)
      ) {
        alert("he")
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
      } else if (block === currentBlock && player !== token) {
        n.push(document.getElementById(`${token}`));
        n.push(document.getElementById(`${player}`));
        
      }else if ([0,13,26,39].includes(block) || [0,13,26,39].includes(currentBlock)){

      }
      if (n.length > 0){
       const tokensOnBlock = [...new Set(n)];
       tokensOnBlock.map((token,i)=>{
        token.style.transform = `scale(0.8) translateX(${-5*n.length + i*10}px)`
       })
      }
    });
    return newPositions;
  }
  

  function handleMoveBlue(e) {
    if (turn !== 0) return;

    const token = e.target.id;
    e.target.style.margin = "0";
    e.target.style.transform = "scale(1)";
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1
    if (!allBlueTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one blue token out
      setBluePositions(allBlueTokens.takeOut(num));
      // dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, e.target]);
      setCurrentPositions({ ...currentPositions, [token]: 1 })
      handleCollisionDetection(
          token,
          1,
          { ...currentPositions, [token]: 1 },
      )
      
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[0]);
      }, 600);
      
      return;
    } else if (allBlueTokens.getPlayingTokens().includes(num) ) {
      
      const canMove = allBlueTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === false) return
      setBluePositions(allBlueTokens.getPositions());
      mapOff(allMapOverlay[turn],diceNum*600);
      setTimeout(() => {
        let block = allBlueTokens.moveToken(e.target, num, diceNum)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setBluePositions
        );

        if (diceNum === 6){
          diceOn(allDice[0])
          return
        } 
        let inc = numOfPlayers === 2 ? 2 : 1;
        let minus = numOfPlayers >= 3 ? 1 : 0;
        if (turn >= numOfPlayers - minus) {
          setTurn(0);
          diceOn(allDice[0],allDice[turn]);
        } else {
          setTurn(turn + inc);
          diceOn(allDice[turn + inc],allDice[turn]);
        }
      }, 700 * diceNum);
    }
  }
  //  console.log(currentPositions)

  function handleMoveRed(e) {
    if (turn !== 1) return;
    e.target.style.margin = "0";
    e.target.style.transform = "scale(1)";
    const token = e.target.id;
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1 and add === 6
    if (!allRedTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one green token out
      setRedPositions(allRedTokens.takeOut(num));
      // dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, e.target]);
      setCurrentPositions({ ...currentPositions, [token]: 0 })
      handleCollisionDetection(
          token,
          13,
          { ...currentPositions, [token]: 13 },
      )
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[1]);
      }, 600);
      return;
    } else if (allRedTokens.getPlayingTokens().includes(num)) {
      const canMove = allRedTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === false) return
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

        mapOff(allMapOverlay[turn]);
          if (diceNum === 6){
          diceOn(allDice[1])
          return
        } 
        let inc = numOfPlayers === 2 ? 2 : 1;
        let minus = numOfPlayers >= 3 ? 1 : 0;
        if (turn >= numOfPlayers - minus) {
          setTurn(0);
          diceOn(allDice[0]);
        } else {
          setTurn(turn + inc);
          diceOn(allDice[turn + inc]);
        }
      }, 700 * diceNum);
    }
  }

  function handleMoveGreen(e) {
    if (turn !== 2) return;

    const token = e.target.id;
     e.target.style.margin = "0";
    e.target.style.transform = "scale(1)";
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    console.log(token);
    //REMOVE +1 and diceNum === 6
    if (!allGreenTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one green token out
      setGreenPositions(allGreenTokens.takeOut(num));
      // dice.current.classList.add(styles.dice);
     setTokensOut([...tokensOut, e.target]);
      setCurrentPositions({ ...currentPositions, [token]: 26 })
      handleCollisionDetection(
          token,
          26,
          { ...currentPositions, [token]: 26 },
      )
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[2]);
      }, 600);
      return;
    } else if (allGreenTokens.getPlayingTokens().includes(num)) {
      
      const canMove = allGreenTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === false) return
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
        mapOff(allMapOverlay[turn]);
          if (diceNum === 6){
          diceOn(allDice[2])
          return
        } 
        let inc = numOfPlayers === 2 ? 2 : 1;
        let minus = numOfPlayers >= 3 ? 1 : 0;
        if (turn >= numOfPlayers - minus) {
          setTurn(0);
          diceOn(allDice[0]);
        } else {
          setTurn(turn + inc);
          diceOn(allDice[turn + inc]);
        }
      }, 700 * diceNum);
    }
  }

  function handleMoveYellow(e) {
    if (turn !== 3) return;
    e.target.style.margin = "0";
    e.target.style.transform = "scale(1)";
    const token = e.target.id;
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1 and diceNum === 6
    if (!allYellowTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one yellow token out
      setYellowPositions(allYellowTokens.takeOut(num));
      // dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, e.target]);
      setCurrentPositions({ ...currentPositions, [token]: 0 })
      handleCollisionDetection(
          token,
          39,
          { ...currentPositions, [token]: 39 },
      )
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn();
      }, 600);
      return;
    } else if (allYellowTokens.getPlayingTokens().includes(num)) {
    
      const canMove = allYellowTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === false) return
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
        mapOff(allMapOverlay[turn]);
          if (diceNum === 6){
          diceOn(allDice[3])
          return
        } 
        let inc = numOfPlayers === 2 ? 2 : 1;
        let minus = numOfPlayers >= 3 ? 1 : 0;
        if (turn >= numOfPlayers - minus) {
          setTurn(0);
          diceOn(allDice[0]);
        } else {
          setTurn(turn + inc);
          diceOn(allDice[turn + inc]);
        }
      }, 1000 * diceNum);
    }
  }

  return (
    <>
      <div className={styles.homeIndicatorCont}>
        <div className={styles.mapOverlay}>
         <div ref={redOverlay}></div>
          <div ref={greenOverlay}></div>
          <div ref={blueOverlay}></div>
          <div ref={yellowOverlay}></div>
          
        </div>
      </div>
      <div className={styles.gameBg}>
        <Particles />
      </div>
      <div className={styles.splashContainer}>
        <div
          // onClick={handleDiceRoll}
          className={styles.diceContainer}
          ref={diceContainer}
          id={playerColors[turn]}
        >
          <div
            style={{ border: "10px solid #b51616" }}
            className={styles.diceContainers}
            ref={redDice}
            id="red"
          >
            {turn === 1 && (
              <div
                onClick={() => {
                  redDice.current.classList.remove(styles.dice);
                  diceOff(redDice);
                  setTimeout(() => {
                    handleDiceRoll();
                  }, 3000);
                }}
              >
                <Dice setDiceNum={setDiceNum} />
              </div>
            )}
          </div>

          <div
            id="blue"
            ref={blueDice}
            style={{ border: "10px solid #07b1ea" }}
            className={`${styles.diceContainers}`}
          >
            {turn === 0 && (
              <div
                onClick={() => {
                  blueDice.current.classList.remove(styles.dice);
                  diceOff(blueDice);
                  setTimeout(() => {
                    handleDiceRoll();
                  }, 3000);
                }}
              >
                <Dice setDiceNum={setDiceNum} />
              </div>
            )}
          </div>
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
            numOfPlayers !== 2 &&
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
            numOfPlayers === 4 &&
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

        <div
          // onClick={handleDiceRoll}
          className={styles.diceContainer}
          ref={diceContainer}
          id={playerColors[turn]}
        >
          <div
            id="green"
            ref={greenDice}
            style={{ border: "10px solid #057f05" }}
            className={`${styles.diceContainers}`}
          >
            {turn === 2 && (
              <div
                onClick={() => {
                  greenDice.current.classList.remove(styles.dice);
                  diceOff(greenDice);
                  setTimeout(() => {
                    handleDiceRoll();
                  }, 3000);
                }}
              >
                <Dice setDiceNum={setDiceNum} />
              </div>
            )}
          </div>

          <div
            id="yellow"
            ref={yellowDice}
            style={{ border: "10px solid #f1f116" }}
            className={`${styles.diceContainers}`}
          >
            {turn === 3 && (
              <div
                onClick={() => {
                  yellowDice.current.classList.remove(styles.dice);
                  diceOff(yellowDice);
                  setTimeout(() => {
                    handleDiceRoll();
                  }, 3000);
                }}
              >
                <Dice setDiceNum={setDiceNum} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
