
export class greenTokenObj {
  constructor(styles, setGreenPositions) {
    this.token1 = { x: 59.2, y: 10, block: 26 };
    this.token2 = { x: 59.2, y: 20, block: 26 };
    this.token3 = { x: 64.2, y: 10, block: 26 };
    this.token4 = { x: 64.2, y: 20, block: 26 };
    this.playingTokens = [];
    this.styles = styles;
    this.setGreenPositions = setGreenPositions; //from context
    this.startX = 51.7;
    this.startY = 4.5;
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

  setPositions(position){
    this[position[0]] = position[1];
    let num = this.playingTokens.indexOf(position[0][position[0].length-1])
    console.log(position[0][position[0].length-1], position[0])
    this.playingTokens.splice(num,1)
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

   tokenMoves(token, x, y,num) {
    let moveYBy = 6.2;
    let moveXBy = 2.85;
    let turnX = 2.9;
    let turnY = 5.5;

    if (token.block >= 13 && token.block < 18) {
      x = moveXBy;
    } else if (token.block >= 18 && token.block < 24) {
      y = -moveYBy;
      x = 0;
      if (token.block === 18) {
        y = -turnY;
        x = turnX;
      }
    } else if (token.block >= 24 && token.block < 25) {
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
    } else if (token.block >= 50 && token.block < 52) {
      y = 0;
      x = -moveXBy;
      
    } if (token.block >= 0 && token.block < 5) {
      x = 0;
      y = -moveYBy;
    }else if (token.block >= 5 && token.block < 11) {
      y = 0;
      x = -moveXBy;
      if (token.block === 5) {
        y = -turnY;
        x = -turnX;
      }
    } else if (token.block >= 11 && token.block < 13) {
      y = -moveYBy;
      x = 0;
      
    } else if (token.block > 51 && token.block < 58) {
      this.tokensInStrip.push(num)
      y = moveYBy;
      x = 0;
      
    }
    return [x, y];
  }
  getMoveStatus(){
    return this.moveStatus
  }

  moveToken(tokenObj, tokenNo, dice,move = true) {
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
   
     if (!move) return [()=>{},token.block]
  
    if (token.block > 55 || token.block + dice > 56)
      return [
        () => {
          return "can't play";
        },
        token.block,
      ];
    tokenObj.classList.add(this.styles.bounce);
    const step = () => {
      count++;
      token.block += 1;
      
      [x, y] = this.tokenMoves(token, 0, 0, tokenNo);
       if (token.block === 58) {
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
      
      console.log(token.block)
      if (count > dice) return;
      if (token.block === 51) {token.block = -1; console.log("turned")}
      if (token.block === 25) {token.block = 51;}
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
      this.setGreenPositions(this.getPositions());
    
      setTimeout(step, 100);
    };
    setTimeout(() => {
      tokenObj.classList.remove(this.styles.bounce);
    }, dice * 500);
    return [step,token.block];
  }
}
