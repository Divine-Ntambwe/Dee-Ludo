import { useContext } from "react";
import { TokensContext } from "../App";

export class blueTokenObj {
  constructor(styles, setBluePositions) {
    this.token1 = { x: 33.2, y: 75, block: 0 };
    this.token2 = { x: 33.2, y: 65, block: 0 };
    this.token3 = { x: 38.2, y: 75, block: 0 };
    this.token4 = { x: 38.2, y: 65, block: 0 };
    this.playingTokens = [];
    this.styles = styles;
    this.setBluePositions = setBluePositions;
    this.startX = 45.8;
    this.startY = 77.8;
    this.tokensWon = 0;
    this.moveStatus = "ok"
    this.tokensInStrip = []
  }
  getPositions() {
    return {
      token1: { ...this.token1 },
      token2: { ...this.token2 },
      token3: { ...this.token3 },
      token4: { ...this.token4 },
    };
  }

  //gets called when token gets captured sets token to its initial postion and removed it from playing tokens
  setPositions(position) {
    //postion = [<tokenName e.g token1>,initial position]
    this[position[0]] = position[1]; //setting token initial postion
    let num = this.playingTokens.indexOf(position[0][position[0].length - 1]); //getting index of killed token in playing tokens
    this.playingTokens.splice(num, 1);
  }

  getPlayingTokens() {
    return this.playingTokens;
  }

  getTokensInStrip(){
    return [...new Set(this.tokensInStrip)]
  }
  getTokensWon(){
    return this.tokensWon
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

  tokenMoves(token, x, y, num) {
    let moveYBy = 6.2;
    let moveXBy = 2.85;
    let turnX = 2.9;
    let turnY = 5.5;
    if (token.block < 5) {
      y = -moveYBy;
    } else if (token.block >= 5 && token.block < 11) {
      y = 0;
      x = -moveXBy;
      if (token.block === 5) {
        y = -turnY;
        x = -turnX;
      }
    } else if (token.block >= 11 && token.block < 13) {
      y = -moveYBy;
      x = 0;
    } else if (token.block >= 13 && token.block < 18) {
      y = 0;
      x = moveXBy;
    } else if (token.block >= 18 && token.block < 24) {
      y = -moveYBy;
      x = 0;
      if (token.block === 18) {
        y = -turnY;
        x = turnX;
      }
    } else if (token.block >= 24 && token.block < 26) {
      y = 0;
      x = moveXBy;
    } else if (token.block >= 26 && token.block < 31) {
      y = moveYBy;
      x = 0;
    } else if (token.block >= 31 && token.block < 37) {
      y = 0;
      x = moveXBy;
      if (token.block === 31) {
        y = turnY;
        x = turnX;
      }
    } else if (token.block >= 37 && token.block < 39) {
      y = moveYBy;
      x = 0;
    } else if (token.block >= 39 && token.block < 44) {
      y = 0;
      x = -moveXBy;
    } else if (token.block >= 44 && token.block < 50) {
      y = moveYBy;
      x = 0;
      if (token.block === 44) {
        y = turnY;
        x = -turnX;
      }
    } else if (token.block >= 50 && token.block < 51) {
      y = 0;
      x = -moveXBy;
    } else if (token.block >= 51 && token.block < 57) {
      this.tokensInStrip.push(num)
      console.log(this.getTokensInStrip())
      x = 0;
      y = -moveYBy;
    }

    return [x, y];
  }
  getMoveStatus(){
    return this.moveStatus
  }

  moveToken(tokenObj, tokenNo, dice,move = true) {
    //should always return an array [<function>,<block>]
    
    let y = 0;
    let x = 0;
    let token;
    let count = 0;
    this.moveStatus = "ok"
   
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
    //when function is being called to retrive token block
    if (!move) return [()=>{},token.block]
  
    if (token.block > 55 || token.block + dice > 56)
      return [
        () => {
          return "can't play";
        },
        token.block,
      ];
      
     
    // tokenObj.classList.add(this.styles.bounce);
    const step = () => {
      count++;
      token.block += 1;

      [x, y] = this.tokenMoves(token, 0, 0, tokenNo);
      console.log(token.block);

      if (token.block === 57) {
        //if token gets home stops it from moving
        y = 0;
        x = 0;
        this.tokensWon += 1;

        this.playingTokens.splice(this.playingTokens.indexOf(tokenNo), 1);
        if (this.tokensWon === 4) {
          this.moveStatus = "won!"
        } else {
          this.moveStatus = "tokenIn"
          return 
        }
      } 

      

      if (count > dice) return "moved"
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
      setTimeout(step, 500);
    };
    setTimeout(() => {
      tokenObj.classList.remove(this.styles.bounce);
    
    }, dice * 500);
    return [step, token.block];
  }
}
