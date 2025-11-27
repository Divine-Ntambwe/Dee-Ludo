import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./Game.module.css";
import blueToken from "../assets/blue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import crown from "../assets/crown.png";
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

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

// If you're using Next.js or need global styles/CSS-in-JS
import { styled } from "@mui/material/styles";

function Game() {
  const [currentPositions, setCurrentPositions] = useState();
  const initialPositions = [
    {
      token1: { x: 33.2, y: 75, block: 0 },
      token2: { x: 33.2, y: 65, block: 0 },
      token3: { x: 38.2, y: 75, block: 0 },
      token4: { x: 38.2, y: 65, block: 0 },
    },
    {
      token1: { x: 33.2, y: 10, block: 13 },
      token2: { x: 33.2, y: 20, block: 13 },
      token3: { x: 38.3, y: 10, block: 13 },
      token4: { x: 38.3, y: 20, block: 13 },
    },
    {
      token1: { x: 59.2, y: 10, block: 26 },
      token2: { x: 59.2, y: 20, block: 26 },
      token3: { x: 64.2, y: 10, block: 26 },
      token4: { x: 64.2, y: 20, block: 26 },
    },
    {
      token1: { x: 59.2, y: 75, block: 39 },
      token2: { x: 59.2, y: 65, block: 39 },
      token3: { x: 64.2, y: 75, block: 39 },
      token4: { x: 64.2, y: 65, block: 39 },
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
    setNumOfPlayers,
    diceComp,
  } = useContext(TokensContext);
  let random = null;
  const [allBlueTokens, setAllBlueTokens] = useState();
  const [allRedTokens, setAllRedTokens] = useState();
  const [allGreenTokens, setAllGreenTokens] = useState();
  const [allYellowTokens, setAllYellowTokens] = useState();
  const [diceName, setDiceName] = useState("one"); //
  const [diceNum, setDiceNum] = useState(null);
  const dice = useRef();
  const [turn, setTurn] = useState(0);
  const mapContainer = useRef();
  const diceContainer = useRef();
  const [tokensOut, setTokensOut] = useState([]);
  const playerColors = ["blue", "red", "green", "yellow"];
  const colors = ["#07b1ea", "#b51616", "#057f05", "#f1f116"];
  const [colorsWon, setColorsWon] = useState([]);

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

    mapContainer.current.style.pointerEvents = "none";
    blueDice.current.classList.add(styles.dice);

    blueOverlay.current.style.opacity = "0";
    redOverlay.current.style.opacity = "0";
    yellowOverlay.current.style.opacity = "0";
    greenOverlay.current.style.opacity = "0";
  }, []);

  function diceOn(nextDice, currentDice) {
    if (colorsWon.length) {
      let isPlaying = true;
      while (isPlaying) {
        isPlaying = false;
        switch (allDice.indexOf(nextDice)) {
          case 0: //for blue dice
            if (colorsWon.includes("blue")) {
              console.log("here");
              diceOff(blueDice);
              mapOff(allMapOverlay[0]);
              let inc = numOfPlayers === 2 ? 2 : 1;
              let minus = numOfPlayers >= 3 ? 1 : 0;
              if (0 >= numOfPlayers - minus) {
                setTurn(0);
                nextDice = allDice[0];
              } else {
                setTurn(0 + inc);
                nextDice = allDice[0 + inc];
              }
            }
            console.log(nextDice);
            break;

          case 1: //for red dice
            if (colorsWon.includes("red")) {
              console.log("here2");
              diceOff(blueDice);
              mapOff(allMapOverlay[0]);
              let inc = numOfPlayers === 2 ? 2 : 1;
              let minus = numOfPlayers >= 3 ? 1 : 0;
              if (1 >= numOfPlayers - minus) {
                setTurn(0);
                nextDice = allDice[0];
              } else {
                setTurn(1 + inc);
                nextDice = allDice[1 + inc];
              }
            }
            console.log(nextDice);
            break;

          case 2: //for green dice
            if (colorsWon.includes("green")) {
              console.log("here3");
              diceOff(greenDice);
              mapOff(allMapOverlay[0]);
              let inc = numOfPlayers === 2 ? 2 : 1;
              let minus = numOfPlayers >= 3 ? 1 : 0;
              if (2 >= numOfPlayers - minus) {
                setTurn(0);
                nextDice = allDice[0];
              } else {
                setTurn(2 + inc);
                nextDice = allDice[2 + inc];
              }
            }
            console.log(nextDice);
            break;

          case 3: //for yellow dice
            if (colorsWon.includes("yellow")) {
              console.log("here4");
              diceOff(blueDice);
              mapOff(allMapOverlay[0]);
              let inc = numOfPlayers === 2 ? 2 : 1;
              let minus = numOfPlayers >= 3 ? 1 : 0;
              setTurn(0);
              nextDice = allDice[0];
            }
            console.log(nextDice);
            break;
        }
        console.log(nextDice);
        if (colorsWon.includes(nextDice.id)) {
          isPlaying = true;
        }
      }
    }

    nextDice.style.pointerEvents = "all";
    nextDice.classList.add(styles.dice);
    currentDice && currentDice.classList.remove(styles.dice);
    mapContainer.current.style.pointerEvents = "none";
  }
  function diceOff(currentDice) {
    mapContainer.current.style.pointerEvents = "none";
    currentDice.current.style.pointerEvents = "none";
  }
  function mapOn(mapSection) {
    mapContainer.current.style.pointerEvents = "all";
    mapSection.classList.add(styles.homeIndicator);
  }
  function mapOff(mapSection, time = 0) {
    mapContainer.current.style.pointerEvents = "none";
    setTimeout(() => {
      mapSection && mapSection.classList.remove(styles.homeIndicator);
    }, time);
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

  const allMapOverlay = [
    blueOverlay.current,
    redOverlay.current,
    greenOverlay.current,
    yellowOverlay.current,
  ];

  function autoPlay(tokenObj, color, moveFunction, diceNum) {
    if (tokenObj.getPlayingTokens().length === 1) {
      mapContainer.current.style.pointerEvents = "none";
      const moved = moveFunction({
        target: document.getElementById(
          `${color}token${tokenObj.getPlayingTokens()[0]}`
        ),
      });
      if (moved === "can't play") {
        return true;
      } else {
        return "moved";
      }
    }

    if (tokenObj.getTokensInStrip().length) {
      const tokensCanMove = []; //number of token
      const tokensCantMove = [];

      tokenObj.getTokensInStrip().map((i) => {
        //separating tokens in home strip that can and can't move according to dice number
        if (tokenObj.getPositions()[`token${i}`].block + diceNum <= 56) {
          tokensCanMove.push(i);
        } else if (
          tokenObj.getPositions()[`token${i}`].block !== 56 &&
          tokenObj.getPositions()[`token${i}`].block + diceNum > 56
        ) {
          tokensCantMove.push(i);
        }
      });
      console.log("all", tokenObj.getPlayingTokens());
      console.log("cant", tokensCantMove);
      console.log("can", tokensCanMove);

      tokensCantMove.map((i) => {
        //adding not allowed cursor to token player can't move
        document.getElementById(`${color}token${i}`).style.cursor =
          "not-allowed";
      });

      if (tokensCantMove.length === tokenObj.getPlayingTokens().length) {
        //skipping if there are no playing tokens
        console.log("second");
        return true;
      }

      if (
        tokenObj.getPlayingTokens().length - tokensCantMove.length === 1 &&
        tokensCanMove.length
      ) {
        //playing auto play if there's only one player than move and is in the strip
        console.log("third");
        moveFunction({
          target: document.getElementById(`${color}token${tokensCanMove[0]}`),
        });
      }

      if (
        tokenObj.getPlayingTokens().length - tokensCantMove.length === 1 &&
        !tokensCanMove.length
      ) {
        // TO-DO: playing auto play if there's only one player than move and is NOT in the strip

        tokenObj.getPlayingTokens().map((i) => {
          if (!tokensCantMove.includes(i)) {
            moveFunction({
              target: document.getElementById(`${color}token${i}`),
            });
          }
        });
      }
    }
    return false;
  }

  function handleDiceRoll(won) {
    //makes all tokens have a pointer cursor
    let color = "";
    let num = 0;
    for (let i = 1; i <= 16; i++) {
      color =
        i > 4 && i <= 8
          ? "red"
          : i > 8 && i <= 12
          ? "green"
          : i > 12 && i <= 16
          ? "yellow"
          : "blue";
      num = num < 4 ? num + 1 : 1;
      if (document.getElementById(`${color}token${num}`))
        document.getElementById(`${color}token${num}`).style.cursor = "pointer";
    }
    //checks if token already won
    const diceNum = Number(localStorage.getItem("diceNum")); //not the same as state
    const dice = allDice[turn];
    // const diceNums = ["one", "two", "three", "four", "five", "six"];

    //allows user to play if they get a six
    if (diceNum === 6) {
      mapOn(allMapOverlay[turn]);
      return;
    }

    let canSkip;
    switch (turn) {
      case 0:
        console.log(allBlueTokens);
        canSkip = autoPlay(allBlueTokens, "blue", handleMoveBlue, diceNum);
        break;

      case 1:
        canSkip = autoPlay(allRedTokens, "red", handleMoveRed, diceNum);
        break;

      case 2:
        canSkip = autoPlay(allGreenTokens, "green", handleMoveGreen, diceNum);
        break;

      case 3:
        canSkip = autoPlay(
          allYellowTokens,
          "yellow",
          handleMoveYellow,
          diceNum
        );
        break;
    }

    let hasTokensOut = tokensOut.find((i) => {
      return i.startsWith(dice.id);
    });

    //if there are no eligable tokens should skip to next player
    if (canSkip === true) {
      hasTokensOut = false;
    }

    console.log(canSkip);
    if (canSkip === "moved"){
      return
    }
    //allows user to play if they have tokens out
    if (hasTokensOut) {
      mapOn(allMapOverlay[turn]);
      return;
    }

    //skips to the next one
    setTimeout(() => {
      console.log("here")
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
    let safeBlocks = [1, 9, 14, 22, 27, 35, 40, 48];
    let startBlocks = [0, 13, 26, 39];
    let n = [];
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
        let color = player.slice(0, player.indexOf("token"));
        let setColorPositions; //changing position on captured color
        let colorPositions; //positions of captured color
        let tokensObj; //object of captured color
        let num; //position of color position in initial positions array
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
        let tokenName = player.slice(player.indexOf("token"), player.length); //e.g token1
        newPositions = {
          ...colorPositions,
          [tokenName]: initialPositions[num][tokenName],
        };
        document.getElementById(`${player}`).style.margin = "0";
        document.getElementById(player).transform = "scale(1)";

        setColorPositions(newPositions); //setting positions of tokensImgs
        tokensObj.setPositions([tokenName, initialPositions[num][tokenName]]); //setting positions of tokenClass
        console.log(tokensOut);
        tokensOut.splice(tokensOut.indexOf(`${color}${tokenName}`), 1);
        setTokensOut(tokensOut);
        console.log(tokensOut);
        return true;
      } else if (block === currentBlock && player !== token) {
        n.push(document.getElementById(`${token}`));
        n.push(document.getElementById(`${player}`));
      } else if (
        [0, 13, 26, 39].includes(block) ||
        [0, 13, 26, 39].includes(currentBlock)
      ) {
      }
      if (n.length > 0) {
        const tokensOnBlock = [...new Set(n)];
        tokensOnBlock.map((token, i) => {
          token.style.transform = `scale(${0.8 - 0.01 * n.length}) translateX(${
            -5 * n.length + i * 10
          }px)`;
        });
      }
    });
    return false;
  }

  function handlePlayerWon(overLay) {
    overLay.style.opacity = "1";
    overLay.style.border = "none";
    setTimeout(() => {
      overLay.children[0].style.visibility = "visible";
      switch (numOfPlayers) {
        case 2:
          alert("game over");
          break;

        case 3:
          if (colorsWon.length === 1) {
            alert("game over");
          }

        case 4:
          if (colorsWon.length === 2) {
            alert("game over");
          }
      }
    }, 100);
  }

  function handleMoveBlue(e) {
    const diceNum = Number(localStorage.getItem("diceNum"));
    if (turn !== 0) return;
    const token = e.target.id;
    console.log(token);
    e.target.style.margin = "0";
    e.target.style.transform = "scale(1)";
    let num = token.slice(token.indexOf(`/\d/`), token.length);
    //REMOVE +1

    if (!allBlueTokens.getPlayingTokens().includes(num) && diceNum === 6) {
      //takes one blue token out
      setBluePositions(allBlueTokens.takeOut(num));
      // dice.current.classList.add(styles.dice);
      setTokensOut([...tokensOut, token]);
      setCurrentPositions({ ...currentPositions, [token]: 1 });
      handleCollisionDetection(token, 1, { ...currentPositions, [token]: 1 });

      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[0]);
      }, 600);

      return;
    } else if (allBlueTokens.getPlayingTokens().includes(num)) {
      console.log(diceNum);
      const canMove = allBlueTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === "can't play") {
        return canMove;
      }
      setBluePositions(allBlueTokens.getPositions());

      mapOff(allMapOverlay[turn], diceNum * 600);
      setTimeout(() => {
        console.log(allBlueTokens.getMoveStatus());
        if (allBlueTokens.getMoveStatus() === "tokenIn") {
          console.log(tokensOut, token);
          console.log(tokensOut.indexOf(token));
          tokensOut.splice(tokensOut.indexOf(token), 1);
          console.log(tokensOut);
          setTokensOut(tokensOut);
        }

        if (allBlueTokens.getMoveStatus() === "won!") {
          setColorsWon([...colorsWon, "blue"]);
          handlePlayerWon(blueOverlay.current);
        }
        let block =
          allBlueTokens.moveToken(e.target, num, diceNum, false)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        const captured = handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setBluePositions
        );

        //plays again if player gets a 6
        console.log(allBlueTokens.getMoveStatus());
        if (
          captured === true ||
          (diceNum === 6 && allBlueTokens.getMoveStatus() !== "won!")
        ) {
          diceOn(allDice[0]);
          return;
        }
        let inc = numOfPlayers === 2 ? 2 : 1; //add to turn depending on num of players
        let minus = numOfPlayers >= 3 ? 1 : 0; //minus from turn depending on num of players
        if (turn >= numOfPlayers - minus) {
          setTurn(0);
          diceOn(allDice[0], allDice[turn]);
        } else {
          console.log("Relacccc")
          setTurn(turn + inc);
          diceOn(allDice[turn + inc], allDice[turn]);
          // setTurn(0);
          // diceOn(allDice[0], allDice[turn]);
        }
      },7000);
    }
  }
  //  console.log(currentPositions)

  function handleMoveRed(e) {
    const diceNum = Number(localStorage.getItem("diceNum"));
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
      setTokensOut([...tokensOut, token]);
      setCurrentPositions({ ...currentPositions, [token]: 13 });
      handleCollisionDetection(token, 13, { ...currentPositions, [token]: 13 });
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[1]);
      }, 600);
      return;
    } else if (allRedTokens.getPlayingTokens().includes(num)) {
      const canMove = allRedTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === "can't play") {
        return canMove;
      }
      setRedPositions(allRedTokens.getPositions());
      mapOff(allMapOverlay[turn], diceNum * 600);
      setTimeout(() => {
        console.log(allRedTokens.getMoveStatus());
        if (allRedTokens.getMoveStatus() === "tokenIn") {
          console.log(tokensOut, token);
          console.log(tokensOut.indexOf(token));
          tokensOut.splice(tokensOut.indexOf(token), 1);
          console.log(tokensOut);
          setTokensOut(tokensOut);
        }

        if (allRedTokens.getMoveStatus() === "won!") {
          setColorsWon([...colorsWon, "red"]);
          handlePlayerWon(redOverlay.current);
        }
        let block =
          allRedTokens.moveToken(e.target, num, diceNum, false)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        const captured = handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setRedPositions
        );

        if (
          captured === true ||
          diceNum === 6 &&
          allRedTokens.getMoveStatus() !== "won!" 
        ) {
          diceOn(allDice[1]);
          return;
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
      }, 500 * diceNum);
    }
  }

  function handleMoveGreen(e) {
    const diceNum = Number(localStorage.getItem("diceNum"));
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
      setTokensOut([...tokensOut, token]);
      setCurrentPositions({ ...currentPositions, [token]: 26 });
      handleCollisionDetection(token, 26, { ...currentPositions, [token]: 26 });
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[2]);
      }, 600);
      return;
    } else if (allGreenTokens.getPlayingTokens().includes(num)) {
      const canMove = allGreenTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === "can't play") {
        return canMove;
      }
      setGreenPositions(allGreenTokens.getPositions());
      mapOff(allMapOverlay[turn], diceNum * 600);
      setTimeout(() => {
        console.log(allGreenTokens.getMoveStatus());
        if (allGreenTokens.getMoveStatus() === "tokenIn") {
          console.log(tokensOut, token);
          console.log(tokensOut.indexOf(token));
          tokensOut.splice(tokensOut.indexOf(token), 1);
          console.log(tokensOut);
          setTokensOut(tokensOut);
        }

        if (allGreenTokens.getMoveStatus() === "won!") {
          setColorsWon([...colorsWon, "green"]);
          handlePlayerWon(greenOverlay.current);
        }
        let block =
          allGreenTokens.moveToken(e.target, num, diceNum, false)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        const captured = handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setGreenPositions
        );
        if (
          captured === true ||
          diceNum === 6 &&
          allGreenTokens.getMoveStatus() !== "won!" 
        ) {
          diceOn(allDice[2]);
          return;
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
      }, 500 * diceNum);
    }
  }

  function handleMoveYellow(e) {
    const diceNum = Number(localStorage.getItem("diceNum"));
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
      setTokensOut([...tokensOut, token]);
      setCurrentPositions({ ...currentPositions, [token]: 39 });
      handleCollisionDetection(token, 39, { ...currentPositions, [token]: 39 });
      setTimeout(() => {
        mapOff(allMapOverlay[turn]);
        diceOn(allDice[3]);
      }, 600);
      return;
    } else if (allYellowTokens.getPlayingTokens().includes(num)) {
      const canMove = allYellowTokens.moveToken(e.target, num, diceNum)[0]();
      if (canMove === "can't play") {
        return canMove;
      }
      setYellowPositions(allYellowTokens.getPositions());
      mapOff(allMapOverlay[turn], diceNum * 600);

      setTimeout(() => {
        console.log(allYellowTokens.getMoveStatus());
        if (allYellowTokens.getMoveStatus() === "tokenIn") {
          console.log(tokensOut, token);
          console.log(tokensOut.indexOf(token));
          tokensOut.splice(tokensOut.indexOf(token), 1);
          console.log(tokensOut);
          setTokensOut(tokensOut);
        }

        if (allYellowTokens.getMoveStatus() === "won!") {
          setColorsWon([...colorsWon, "yellow"]);
          handlePlayerWon(yellowOverlay.current);
        }

        let block =
          allYellowTokens.moveToken(e.target, num, diceNum, false)[1] + 1;
        setCurrentPositions({ ...currentPositions, [token]: block });
        const captured = handleCollisionDetection(
          token,
          block,
          { ...currentPositions, [token]: block },
          setYellowPositions
        );

        console.log(allYellowTokens.getMoveStatus());
        if (
          captured === true ||
          diceNum === 6 &&
          allYellowTokens.getMoveStatus() !== "won!" 
        ) {
          diceOn(allDice[3]);
          return;
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
      }, 500 * diceNum);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePlayAgain = () => {};
  const winnerToken = blueToken;
  // winningPlayer === 1
  //   ? blueToken
  //   : winningPlayer === 2
  //   ? redToken
  //   : winningPlayer === 3
  //   ? greenToken
  //   : yellowToken;

  const winnerColor = "blue";
  // winningPlayer === 1
  //   ? "#00d0ff"
  //   : winningPlayer === 2
  //   ? "#ff2e63"
  //   : winningPlayer === 3
  //   ? "#39ff14"
  //   : "#ffd700";

  //listening for space/enter click
  useEffect(() => {
    //TO-DO: fix dice roll while playing
    const handleKeyDown = (e) => {
      console.log(mapContainer.current.style.pointerEvents);
      if (
        e.code === "Space" &&
        mapContainer.current.style.pointerEvents === "none"
      ) {
        // diceComp.current.parentElement.click();
        diceComp.current.click();
        window.removeEventListener("keydown", handleKeyDown);
        setTimeout(() => {
          window.addEventListener("keydown", handleKeyDown);
        }, 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Dialog
        open={false}
        // onClose={onClose}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "hidden",
            borderRadius: "24px",
            maxWidth: 460,
          },
        }}
      >
        {/* Animated Nebula Background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 70%, #120038 0%, #000000 70%)",
            backgroundSize: "200% 200%",
            animation: "nebula 20s ease infinite",
            zIndex: -2,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><defs><radialGradient id=%22star%22><stop offset=%220%25%22 stop-color=%22%23ffffff%22/><stop offset=%22100%25%22 stop-color=%22%23a0a0ff%22 stop-opacity=%220%22/></radialGradient></defs><circle cx=%2250%22 cy=%2250%22 r=%221%22 fill=%22url(%23star)%22 opacity=%220.8%22/><circle cx=%2220%22 cy=%2280%22 r=%221.5%22 fill=%22url(%23star)%22 opacity=%220.6%22/><circle cx=%2280%22 cy=%2230%22 r=%221%22 fill=%22url(%23star)%22 opacity=%220.7%22/></svg>')",
            backgroundSize: "80px 80px",
            opacity: 0.4,
            zIndex: -1,
          }}
        />

        {/* Main Content */}
        <DialogContent
          sx={{
            background: "rgba(10, 0, 40, 0.7)",
            backdropFilter: "blur(12px)",
            border: "2px solid rgba(138, 43, 226, 0.5)",
            borderRadius: "24px",
            textAlign: "center",
            py: 6,
            px: 4,
          }}
        >
          {/* Cosmic Title */}
          <Typography
            variant="h3"
            sx={{
              background: "linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
              letterSpacing: "4px",
              mb: 2,
              animation: "rainbow 8s linear infinite",
            }}
          >
            VICTORY IN THE VOID
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#e0e0ff",
              mb: 4,
              fontFamily: "'Exo 2', sans-serif",
              textShadow: "0 0 20px #ffffff",
            }}
          >
            The stars have aligned...
          </Typography>

          {/* Winner Token with Halo & Orbit Effect */}
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              my: 3,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: -20,
                border: "3px solid",
                borderColor: winnerColor,
                borderRadius: "50%",
                opacity: 0.6,
                animation: "orbit 6s linear infinite",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: -35,
                border: "1px dashed",
                borderColor: winnerColor,
                borderRadius: "50%",
                opacity: 0.4,
                animation: "orbit 10s linear infinite reverse",
              }}
            />
            <img
              src={winnerToken}
              alt="Winner Token"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: `8px solid ${winnerColor}`,
                boxShadow: `0 0 60px ${winnerColor}, inset 0 0 30px ${winnerColor}`,
                animation: "float 4s ease-in-out infinite",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: winnerColor,
              fontWeight: "bold",
              mt: 3,
              mb: 1,
              fontFamily: "'Orbitron', sans-serif",
              textShadow: `0 0 30px ${winnerColor}`,
            }}
          >
            PLAYER {colorsWon[0]} DOMINATES THE GALAXY
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#bbbbff",
              fontStyle: "italic",
              mb: 4,
            }}
          >
            All tokens have returned to their home star system.
          </Typography>

          {/* Pulsing Victory Badge */}
          <Box
            sx={{
              display: "inline-block",
              px: 4,
              py: 2,
              background: "rgba(138, 43, 226, 0.3)",
              border: "2px solid #8a2be2",
              borderRadius: "50px",
              animation: "pulse 3s infinite",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#ffffff", fontWeight: "bold" }}
            >
              SUPREME COMMANDER
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            background: "rgba(0, 0, 50, 0.6)",
            py: 3,
            gap: 3,
            borderTop: "1px solid rgba(138, 43, 226, 0.3)",
          }}
        >
          <Button
            // onClick={onPlayAgain}
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(45deg, #00ffff, #ff00ff)",
              color: "#000",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: "50px",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.1rem",
              boxShadow: "0 0 30px rgba(0, 255, 255, 0.6)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 0 50px rgba(0, 255, 255, 0.9)",
              },
            }}
          >
            NEW MISSION
          </Button>

          <Button
            // onClick={onClose}
            variant="outlined"
            size="large"
            sx={{
              color: "#00ffff",
              borderColor: "#00ffff",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontWeight: "bold",
              "&:hover": {
                background: "rgba(0, 255, 255, 0.1)",
                borderColor: "#00ffff",
              },
            }}
          >
            RETURN TO BASE
          </Button>
        </DialogActions>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes nebula {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes rainbow {
            0% {
              background-position: 0%;
            }
            100% {
              background-position: 200%;
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          @keyframes orbit {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes pulse {
            0%,
            100% {
              box-shadow: 0 0 20px #8a2be2;
            }
            50% {
              box-shadow: 0 0 40px #ff00ff;
            }
          }
        `}</style>
      </Dialog>
      <div className={styles.homeIndicatorCont}>
        <div className={styles.mapOverlay}>
          <div ref={redOverlay}>
            {colorsWon.includes("red") && (
              <div className={styles.winnerInd}>
                <img className={styles.crown} src={crown} />
                <h2 className={styles.winnerNum}>
                  {colorsWon.findIndex((i) => {
                    return "red" === i;
                  }) + 1}
                </h2>
              </div>
            )}
          </div>
          <div ref={greenOverlay}>
            {colorsWon.includes("green") && (
              <div className={styles.winnerInd}>
                <img className={styles.crown} src={crown} />
                <h2 className={styles.winnerNum}>
                  {colorsWon.findIndex((i) => {
                    return "green" === i;
                  }) + 1}
                </h2>
                []
              </div>
            )}
          </div>
          <div ref={blueOverlay}>
            {colorsWon.includes("blue") && (
              <div className={styles.winnerInd}>
                <img className={styles.crown} src={crown} />
                <h2 className={styles.winnerNum}>
                  {colorsWon.findIndex((i) => {
                    return "blue" === i;
                  }) + 1}
                </h2>
              </div>
            )}
          </div>
          <div ref={yellowOverlay}>
            {colorsWon.includes("yellow") && (
              <div className={styles.winnerInd}>
                <img className={styles.crown} src={crown} />
                <h2 className={styles.winnerNum}>
                  {colorsWon.findIndex((i) => {
                    return "yellow" === i;
                  }) + 1}
                </h2>
              </div>
            )}
          </div>
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
                  console.log("clicked!");
                  blueDice.current.classList.remove(styles.dice);
                  diceOff(blueDice);
                  setTimeout(() => {
                    handleDiceRoll();
                  }, 3000);
                }}
              >
                <Dice id="h" setDiceNum={setDiceNum} />
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
