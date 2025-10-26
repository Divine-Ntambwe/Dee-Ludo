import { useContext } from "react";
import { TokensContext } from "../App";

export class blueTokenObj {
  constructor(styles, setBluePositions) {
    this.token1 = { x: 455, y: 580, block: 0 };
    this.token2 = { x: 555, y: 580, block: 0 };
    this.token3 = { x: 555, y: 480, block: 0 };
    this.token4 = { x: 455, y: 480, block: 0 };
    this.playingTokens = [];
    this.styles = styles;
    this.setBluePositions = setBluePositions;
    this.startX = 658;
    this.startY = 600;
  }
  getPositions() {
    return {
      token1: { ...this.token1 },
      token2: { ...this.token2 },
      token3: { ...this.token3 },
      token4: { ...this.token4 },
    };
  }

  getPlayingTokens() {
    return this.playingTokens;
  }

  takeOut(num) {
    switch (num) {
      case "1":
        this.token1 = { ...this.token1, x: this.startX, y: this.startY };
        this.playingTokens.push(num);
        break;
      case "2":
        this.token2 = { ...this.token2, x: this.startX, y: this.startY };
        this.playingTokens.push(num);
        break;

      case "3":
        this.token3 = { ...this.token3, x: this.startX, y: this.startY };
        this.playingTokens.push(num);
        break;

      case "4":
        this.token4 = { ...this.token4, x: this.startX, y: this.startY };
        this.playingTokens.push(num);
        break;
    }

    return this.getPositions();
  }

  tokenMoves(token,x,y,count){
     //   start block to block 5
      if (token.block < 5) {
        y = -40;
      } else if (token.block >= 5 && token.block < 11) {
        y = 0;
        x = -40;
        if (token.block === 5) {
          y = -55;
          x = -55;
        }
      } else if (token.block >= 11 && token.block < 13) {
        y = -65;
        x = 0;
      } else if (token.block >= 13 && token.block < 18) {
        y = 0;
        x = 40;
      } else if (token.block >= 18 && token.block < 24) {
        y = -42;
        x = 0;
        if (token.block === 18) {
          y = -58;
          x = 55;
        }
      } else if (token.block >= 24 && token.block < 26) {
        y = 0;
        x = 65;
      } else if (token.block >= 26 && token.block < 31) {
        y = 42;
        x = 0;
      } else if (token.block >= 31 && token.block < 37) {
        y = 0;
        x = 42;
        if (token.block === 31) {
          y = 60;
          x = 55;
        }
      } else if (token.block >= 37 && token.block < 39) {
        y = 65;
        x = 0;
      } else if (token.block >= 39 && token.block < 44) {
        y = 0;
        x = -42;
      } else if (token.block >= 44 && token.block < 50) {
        y = 42;
        x = 0;
        if (token.block === 44) {
          y = 55;
          x = -55;
        }
      }  else if (token.block >= 50 && token.block < 51){
        y=0;
        x= -65;
      } else if (token.block >= 51 && token.block < 57){
          x=0;
          y=-42;
        if (count + token.block > 57){
            y=0;
            x=0;
        }
      }

      return [x,y]
  }

  moveToken(tokenObj, tokenNo, dice) {
    let y = 0;
    let x = 0;
    let token;
    let count = 0;
    switch (tokenNo) {
      case "1":
        token = this.token1;
        break;
      case "2":
        token = this.token2;
        break;

      case "3":
        token = this.token3;
        break;

      case "4":
        token = this.token4;
        break;
    }
    let diffY = token.y - this.startY;
    let diffX = token.y - this.startY;

    const step = () => {
      tokenObj.classList.add(this.styles.bounce);
      count++;
      token.block += 1;
      [x,y] = this.tokenMoves(token,0,0,count)
      if (token.block === 57){
        y = 0;
        x = 0;

        tokenObj
      }
      

      if (count > 5 ) return;
      let pos = { ...token, x: (token.x += x), y: (token.y += y) };
      switch (tokenNo) {
        case "1":
          this.token1 = pos;
          break;
        case "2":
          this.token2 = pos;
          break;

        case "3":
          this.token3 = pos;
          break;

        case "4":
          this.token4 = pos;
          break;
      }
      this.setBluePositions(this.getPositions());
      setTimeout(step,100);
    };
    return step;
  }
}
