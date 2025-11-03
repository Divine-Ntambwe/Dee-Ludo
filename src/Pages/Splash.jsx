import React from "react";
import bgImg from "../assets/Splash.png";
import styles from "./Splash.module.css";
import blueToken from "../assets/bLue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import SplitText from "../Components/SplitText";
import GradientText from "../Components/GradientText";
import Silk from "../Components/Background";
import { useNavigate } from "react-router-dom";
function Splash() {
  const nav = useNavigate()
  return (
    <>
      <div className={styles.splashBg}>
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className={styles.splashScreen}>
        <div className={styles.tokenContainer}>
          <img src={redToken} />
          <img src={greenToken} />
        </div>

        <div className={styles.middleSec}>
          <h1>Dee Ludo</h1>

          <img className={styles.bgImg} src={bgImg} />
          <button onClick={()=>{
            nav("/Ludo")
          }}>Start</button>
        </div>

        <div className={styles.tokenContainer}>
          <img src={blueToken} />
          <img src={yellowToken} />
        </div>
      </div>
    </>
  );
}

export default Splash;
