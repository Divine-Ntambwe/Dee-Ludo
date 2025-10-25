import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./Splash.module.css";
import blueToken from "../assets/bLue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import carGif from "../assets/sedan-car-animation-gif-download-8853235.gif";
import { CanvasContext } from "../App";
import drawMap from "../Classes/Map";

function Splash() {
  const canvasComp = useRef();
  const [move, setMove] = useState(true);
  const blueTokenMove = useRef(null);
  const [allHop,setAllHop] = useState(false)
  const allHopAnimation = useRef()
  const [start,setStart] = useState(false)
  // const [positionNums,setPositionNums] = useState({tokenB1:455,tokenB2})
  const initialPositions = {
    blueTokens: [{x:655,y:580},{x:555,y:580},{x:555,y:480},{x:455,y:480}],
    redTokens:  [{x:455,y:128},{x:555,y:128},{x:555,y:28},{x:455,y:28}],
    greenTokens: [{x:905,y:128},{x:1005,y:128},{x:905,y:28},{x:1005,y:28}],
    yellowTokens: [{x:905,y:580},{x:1005,y:580},{x:1005,y:480},{x:905,y:480}],
  }
  const [currentPositions,setCurrentPositions] = useState({...initialPositions})
  function handleMove(e) {
    const token = e.target;
    token.classList.add(styles.bounce)
    
  let x = 0;
  let y = 0;
  let count = 0;
  function step() {
    count++
    if (x >= 160 ){
      y+= 45;
      if (x === 160) x+= 40
    }else{
      
      x += 40;
    }
    if (count > 6) return;
    setCurrentPositions(prev => ({
      ...prev,
      blueTokens: [
        { x: 655-y, y: 580-x},
        { x: 555,     y: 580 },
        { x: 555,     y: 480 },
        { x: 455,     y: 480 }
      ]
    }));
    setTimeout(step, 500);
  }
  step();
  setTimeout(()=>{
    token.classList.remove(styles.bounce)
    console.log(token.style.top)
  },2000)
}

  function handleMove2(){
    setCurrentPositions({...currentPositions,blueTokens:[{x:655,y:480},{x:555,y:580},{x:555,y:480},{x:455,y:480}]})
  }
  useEffect(() => {
    drawMap(canvasComp.current)
  }, []);


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

      {currentPositions.blueTokens.map((tokenPosition)=>(

      <img onClick={handleMove} className={`${styles.tokens}`} src={blueToken} style={{left:`${tokenPosition.x}px`,top:`${tokenPosition.y}px`}}/>
      ))}
      {currentPositions.redTokens.map((tokenPosition)=>(
      <img  className={styles.tokens} src={redToken} style={{left:`${tokenPosition.x}px`,top:`${tokenPosition.y}px`}}/>
      ))}

      {currentPositions.greenTokens.map((tokenPosition)=>(
      <img className={styles.tokens} src={greenToken} style={{left:`${tokenPosition.x}px`,top:`${tokenPosition.y}px`}}/>
      ))}

      {currentPositions.yellowTokens.map((tokenPosition)=>(
      <img className={styles.tokens} src={yellowToken} style={{left:`${tokenPosition.x}px`,top:`${tokenPosition.y}px`}}/>
      ))}
      


    </div>
  );
}

export default Splash;
