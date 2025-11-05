import { useContext } from "react";
import { TokensContext } from "../App";

export class yellowTokenObj {
  constructor(styles, setYellowPositions) {
    this.token1 = { x: 58, y: 75, block: 39 };
    this.token2 = { x: 58, y: 65, block: 39 };
    this.token3 = { x: 63, y: 75, block: 39 };
    this.token4 = { x: 63, y: 65, block: 39 };
    this.playingTokens = [];
    this.styles = styles;
    this.setYellowPositions = setYellowPositions;
    this.startX = 65;
    this.startY = 48;
  }
  getPositions() {
    return {
      token1: { ...this.token1 },
      token2: { ...this.token2 },
      token3: { ...this.token3 },
      token4: { ...this.token4 },
    };
  }

  setPositions(position){
    this[position[0]] = position[1];
    let num = this.playingTokens.indexOf(position[0][position[0].length-1])
    console.log(position[0][position[0].length-1], position[0])
    this.playingTokens.splice(num,1)
  }

  getPlayingTokens() {
    return this.playingTokens;
  }

  takeOut(num) {
    console.log(num)
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

  tokenMoves(token, x, y, dice) {
    let moveBy = 6;
    let turnX = 3;
    let turnY = 6;

    if (token.block >= 13 && token.block < 18) {
      x = moveBy/2;
    } else if (token.block >= 18 && token.block < 24) {
      y = -moveBy;
      x = 0;
      if (token.block === 18) {
        y = -turnY;
        x = turnX;
      }
    } else if (token.block >= 24 && token.block < 26) {
      y = 0;
      x = moveBy / 2;
    } else if (token.block >= 26 && token.block < 31) {
      y = moveBy;
      x = 0;
    } else if (token.block >= 31 && token.block < 37) {
      y = 0;
      x = moveBy / 2;
      if (token.block === 31) {
        y = turnY;
        x = turnX;
      }
    } else if (token.block >= 37 && token.block < 39) {
      y = moveBy;
      x = 0;
    } else if (token.block >= 39 && token.block < 44) {
      y = 0;
      x = -moveBy / 2;
    } else if (token.block >= 44 && token.block < 50) {
      y = moveBy;
      x = 0;
      if (token.block === 44) {
        y = turnY;
        x = -turnX;
      }
    } else if (token.block >= 50 && token.block < 52) {
      y = 0;
      x = -moveBy / 2;
      
    } if (token.block >= 0 && token.block < 5) {
      x = 0;
      y = -moveBy;
    }else if (token.block >= 5 && token.block < 11) {
      y = 0;
      x = -moveBy / 2;
      if (token.block === 5) {
        y = -turnY;
        x = -turnX;
      }
    } else if (token.block >= 11 && token.block < 13) {
      y = -moveBy;
      x = 0;
      
    } else if (token.block > 51 && token.block < 58) {
      y = 0;
      x = -moveBy / 2;
      
    }
    return [x, y];
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
    if ((token.block + dice) > 57) return ;
    tokenObj.classList.add(this.styles.bounce);
    const step = () => {
      count++;
      token.block += 1;
      
      [x, y] = this.tokenMoves(token, 0, 0, dice);
      if (token.block === 58) {
        y = 0;
        x = 0;
      }
      
      console.log(token.block)
      if (count > dice) return;
      if (token.block === 51) token.block = -1;
      if (token.block === 37) token.block = 51;
      let pos = { x: (token.x += x), y: (token.y += y),block:token.block };
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
      this.setYellowPositions(this.getPositions());
    
      setTimeout(step, 800);
    };
    setTimeout(() => {
      tokenObj.classList.remove(this.styles.bounce);
    }, dice * 500);
    return [step,token.block];
  }
}
