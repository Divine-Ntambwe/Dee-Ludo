import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./Splash.module.css";
import blueToken from "../assets/bLue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import carGif from "../assets/sedan-car-animation-gif-download-8853235.gif";
import { TokensContext } from "../App";
import drawMap from "../Classes/Map";
import { dim } from "../Classes/Map";
import { blueTokenObj } from "../Classes/blueTokenMovement";

function Splash() {
  const canvasComp = useRef();
  const [move, setMove] = useState(true);
  const blueTokenMove = useRef(null);
  const [allHop, setAllHop] = useState(false);
  const allHopAnimation = useRef();
  const [start, setStart] = useState(false);
  // const [positionNums,setPositionNums] = useState({tokenB1:455,tokenB2})
  const initialPositions = {
    blueTokens: [
      { x: 655, y: 580 },
      { x: 555, y: 580 },
      { x: 555, y: 480 },
      { x: 455, y: 480 },
    ],
    redTokens: [
      { x: 455, y: 128 },
      { x: 555, y: 128 },
      { x: 555, y: 28 },
      { x: 455, y: 28 },
    ],
    greenTokens: [
      { x: 905, y: 128 },
      { x: 1005, y: 128 },
      { x: 905, y: 28 },
      { x: 1005, y: 28 },
    ],
    yellowTokens: [
      { x: 905, y: 580 },
      { x: 1005, y: 580 },
      { x: 1005, y: 480 },
      { x: 905, y: 480 },
    ],
  };

  const [currentPositions, setCurrentPositions] = useState({
    ...initialPositions,
  });

  const { bluePositions, setBluePositions } = useContext(TokensContext);
  const [allBlueTokens, setAllBlueTokens] = useState();
  useEffect(() => {
    drawMap(canvasComp.current);
    const blueTokens = new blueTokenObj(styles, setBluePositions);
    setAllBlueTokens(blueTokens);
    setBluePositions(blueTokens.getPositions());
  }, []);


  function handleMoveBlue(e) {
    const token = e.target.id;
    let num = token.slice(token.indexOf("d"), token.length);
    e.target.style.height = "70px";
    if (!allBlueTokens.getPlayingTokens().includes(num)) {
      setBluePositions(allBlueTokens.takeOut(num));
    } else {
      allBlueTokens.moveToken(e.target, num, 0)();
      setBluePositions(allBlueTokens.getPositions());
    }
  }

  return (
    <div className={styles.splashContainer}>
      {/* <h1>Dee <br/>
        H<br/>
        i<br/>
        g<br/>
        h<br/>
        way</h1>
        <button onClick={handleMove}className=''>Press To Play</button> */}
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasComp}
          style={{
            width: "500px",
            height: "100vh",
            border: "1px solid black",
          }}
        />
      </div>

      {bluePositions &&
        Object.entries(bluePositions).map(([token, pos]) => (
          <>
            <img
              id={`blue${token}`}
              onClick={handleMoveBlue}
              className={`${styles.tokens}`}
              src={blueToken}
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            />
          </>
        ))}
      {currentPositions.redTokens.map((tokenPosition, i) => (
        <img
          id={`redToken${i}`}
          className={styles.tokens}
          src={redToken}
          style={{ left: `${tokenPosition.x}px`, top: `${tokenPosition.y}px` }}
        />
      ))}

      {currentPositions.greenTokens.map((tokenPosition, i) => (
        <img
          id={`greenToken${i}`}
          className={styles.tokens}
          src={greenToken}
          style={{ left: `${tokenPosition.x}px`, top: `${tokenPosition.y}px` }}
        />
      ))}

      {currentPositions.yellowTokens.map((tokenPosition, i) => (
        <img
          id={`yellowToken${i}`}
          className={styles.tokens}
          src={yellowToken}
          style={{ left: `${tokenPosition.x}px`, top: `${tokenPosition.y}px` }}
        />
      ))}
    </div>
  );
}

export default Splash;
