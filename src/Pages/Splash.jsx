import React, { useContext, useRef, useEffect, useState } from "react";
import styles from "./Splash.module.css";
import blueToken from "../assets/bLue-token.png";
import greenToken from "../assets/green-token.png";
import redToken from "../assets/red-token.png";
import yellowToken from "../assets/yellow-token.png";
import carGif from "../assets/sedan-car-animation-gif-download-8853235.gif";
import { CanvasContext } from "../App";

function Splash() {
  const canvasComp = useRef();
  const [move, setMove] = useState(true);
  const blueTokenMove = useRef(null);
  const [allHop,setAllHop] = useState(false)
  const allHopAnimation = useRef()
  const handleMove = () => {
    setAllHop(true)
  };
  let x = 0;
  let y = 0;
  function handlePlay() {
    setAllHop(false);
  }
  useEffect(() => {
    const canvas = canvasComp.current;
    const ctx = canvas.getContext("2d");
    const dim = 700;
    const startBlockLength = 200;
    let hop = 0;


   
    class startBlock {
      height = 250;
      width = 250;
      x = 0;
      y = 0;
      constructor(color) {
        this.color = color;
        switch (color) {
          case "red":
            this.x = 0;
            this.y = 0;
            break;
          case "green":
            this.x = dim - this.width;
            this.y = 0;
            break;
          case "#0091ff":
            this.x = 0;
            this.y = dim - this.height;
            break;
          case "yellow":
            this.x = dim - this.height;
            this.y = dim - this.height;
            break;
          default:
            this.x = 0;
            this.y = 0;
        }
      }

      drawCircle(ctx, y = 0, x = 0) {
        ctx.beginPath();
        ctx.arc(this.x + 80 + x, this.y + 80 + y, 25, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
      }
      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fillRect(
          this.x + 35,
          this.y + 45,
          this.width - 70,
          this.height - 70
        );
        this.drawCircle(ctx);
        this.drawCircle(ctx, 100, 0);
        this.drawCircle(ctx, 0, 100);
        this.drawCircle(ctx, 100, 100);
      }
    }

    function drawHome1(color, x, y) {
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.lineTo(350, 350);
      ctx.lineTo(x, y);

      ctx.closePath(); // Connect last point to first
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
    }

    function drawHome2(color, x, y) {
      ctx.beginPath();
      ctx.moveTo(450, 450);
      ctx.lineTo(350, 350);
      ctx.lineTo(x, y);
      // ctx.lineTo(450, 250);

      ctx.closePath(); // Connect last point to first
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
    }
    const blockHeight = 41.67;
    const blockWidth = 66.67;
    function drawVertBlocks(color, x, y) {
      ctx.fillStyle = color;
      ctx.fillRect(x, 700 - blockHeight * y, blockWidth, blockHeight);
      ctx.strokeStyle = "black"; // Outline color
      ctx.lineWidth = 1; // Optional: thickness
      ctx.strokeRect(x, 700 - blockHeight * y, blockWidth, blockHeight);
    }

    function drawHoriBlocks(color, x, y) {
      ctx.fillStyle = color;
      ctx.fillRect(700 - blockHeight * x, y, blockHeight, blockWidth);
      ctx.strokeStyle = "black"; // Outline color
      ctx.lineWidth = 1; // Optional: thickness
      ctx.strokeRect(700 - blockHeight * x, y, blockHeight, blockWidth);
    }

    const blueTokenImg = new Image();
    blueTokenImg.src = blueToken;
    class blueTokenObj {
      constructor(x,y,move) {
        this.token1Y = 570;
        this.token1X = 60;
        this.move = move;
        this.token2Y = 470;
        this.token2X = 60;
        this.token3Y = 470;
        this.token3X = 160;
        this.token4Y = 570;
        this.token4X = 160;
        this.tokensY=[(y)=>{this.token1Y+=y},(y)=>{this.token2Y+=y},(y)=>{this.token3Y+=y},(y)=>{this.token4Y+=y}];
    
      }


      draw(ctx) {
       const loadBlueTokenImg = blueTokenImg.onload= (x=this.token1X,y=this.token1Y) => {
        const drawImg=()=> {

            ctx.clearRect(0, 50, 100, 100); // Clear canvas
            drawMap();
            ctx.drawImage(blueTokenImg, this.token1X,this.token1Y, 50, 80);
            ctx.drawImage(blueTokenImg, this.token2X,this.token2Y, 50, 80);
            ctx.drawImage(blueTokenImg, this.token3X,this.token3Y, 50, 80);
            ctx.drawImage(blueTokenImg, this.token4X,this.token4Y, 50, 80);
            this.tokensY.map((i)=>{
              i(-hop)
            })
            if (this.token1Y < 560 && hop){
              this.tokensY.map((i)=>{
              i(10)
            })
            }
            allHopAnimation.current = requestAnimationFrame(drawImg);
            
            
          }
          drawImg()
          return drawImg
        }
        
        return loadBlueTokenImg()
      }
    }

    function drawMap() {
      // Set actual pixel size
      const scale = window.devicePixelRatio || 1;
      canvas.width = 700 * scale;
      canvas.height = 700 * scale;

      // Set CSS size
      canvas.style.width = "700px";
      canvas.style.height = "700px";

      // Scale drawing context
      ctx.scale(scale, scale);

      const redBlock = new startBlock("red");
      const greenBlock = new startBlock("green");
      const blueBlock = new startBlock("#0091ff");
      const yellowBlock = new startBlock("yellow");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redBlock.draw(ctx);
      greenBlock.draw(ctx);
      blueBlock.draw(ctx);
      yellowBlock.draw(ctx);
      ctx.fillStyle = "yellow";
      ctx.fillRect(250, 250, 200, 200);
      drawHome1("green", 450, 250);
      drawHome1("red", 250, 450);
      drawHome2("#0091ff", 250, 450);

      drawVertBlocks("white", 250, 1);
      drawVertBlocks("#0091ff", 250, 2);
      for (let i = 3; i <= 6; i++) drawVertBlocks("white", 250, i);

      drawVertBlocks("lightblue", 250 + blockWidth, 1);
      for (let i = 2; i <= 6; i++) drawVertBlocks("#0091ff", 250 + blockWidth, i);
      for (let i = 0; i <= 6; i++)
        drawVertBlocks("white", 250 + blockWidth * 2, i);

      for (let i = 16.8; i >= 15; i--) drawVertBlocks("white", 250, i);
      drawVertBlocks("pink", 250, 14.8);
      for (let i = 13.8; i >= 11; i--) drawVertBlocks("white", 250, i);

      drawVertBlocks("lightgreen", 250 + blockWidth, 16.8);
      for (let i = 15.8; i >= 11; i--)
        drawVertBlocks("green", 250 + blockWidth, i);

      drawVertBlocks("white", 250 + blockWidth * 2, 16.8);
      drawVertBlocks("green", 250 + blockWidth * 2, 15.8);
      for (let i = 14.8; i >= 11; i--)
        drawVertBlocks("white", 250 + blockWidth * 2, i);

      for (let i = 1; i <= 2; i++) drawHoriBlocks("white", i, 250);
      drawHoriBlocks("pink", 3, 250);
      for (let i = 4; i <= 6; i++) drawHoriBlocks("white", i, 250);

      drawHoriBlocks("lightYellow", 1, 250 + blockWidth);
      for (let i = 2; i <= 6; i++)
        drawHoriBlocks("yellow", i, 250 + blockWidth);

      drawHoriBlocks("white", 1, 250 + blockWidth * 2);
      drawHoriBlocks("Yellow", 2, 250 + blockWidth * 2);
      for (let i = 3; i <= 6; i++)
        drawHoriBlocks("white", i, 250 + blockWidth * 2);

      drawHoriBlocks("white", 16.8, 250);
      drawHoriBlocks("red", 15.8, 250);
      for (let i = 14.8; i >= 11; i--) drawHoriBlocks("white", i, 250);

      drawHoriBlocks("crimson", 16.8, 250 + blockWidth);
      for (let i = 15.8; i >= 11; i--)
        drawHoriBlocks("red", i, 250 + blockWidth);

      for (let i = 16.8; i >= 15; i--)
        drawHoriBlocks("white", i, 250 + blockWidth * 2);
      drawHoriBlocks("pink", 14.8, 250 + blockWidth * 2);
      for (let i = 13.8; i >= 11; i--)
        drawHoriBlocks("white", i, 250 + blockWidth * 2);
    }
    drawMap();

    const blueTokens = new blueTokenObj(60,570);
    blueTokens.draw(ctx)
    if (allHop)
      {hop=0.5
    blueTokens.token1X += 120}
   
  }, [move,allHop]);

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
      <button onClick={handleMove} className="">
        Press To Play
      </button>
      <button onClick={handlePlay}>Press to move</button>
      {/* <img  src={carGif} alt="Car Animation" className={styles.carAnimation} /> */}
    </div>
  );
}

export default Splash;
