import React, { useEffect } from 'react'

export const dim = 700;
function drawMap(canvas) {
      const ctx = canvas.getContext("2d");
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
     const drawMap = ()=> {
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
    drawMap()

    
}


export default drawMap
// export default drawMap