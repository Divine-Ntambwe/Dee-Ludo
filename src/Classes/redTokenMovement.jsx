
export class redTokenObj {
  constructor(styles, setRedPositions) {
    this.token1 = { x: 33.2, y: 10, block: 13 };
    this.token2 = { x: 33.2, y: 20, block: 13 };
    this.token3 = { x: 38.3, y: 10, block: 13 };
    this.token4 = { x: 38.3, y: 20, block: 13 };
    this.playingTokens = [];
    this.tokensWon = 0;
    this.styles = styles;
    this.setRedPositions = setRedPositions; //from context
    this.startX = 31.4;
    this.startY = 35;
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

  tokenMoves(token, x, y, num) {
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
    } else if (token.block >= 50 && token.block <= 51) {
      y = 0;
      x = -moveXBy;
      
    }else if (token.block >= 0 && token.block < 5) {
      console.log("problem?")
      x = 0;
      y = -moveYBy;
    }else if (token.block >= 5 && token.block < 11) {
      y = 0;
      x = -moveXBy;
      if (token.block === 5) {
        y = -turnY;
        x = -turnX;
      }
    } else if (token.block >= 11 && token.block < 12) {
      console.log("or is it here")
      y = -moveYBy;
      x = 0;
      
    } else if (token.block >= 52 && token.block < 58 || token.block === 12) {
      this.tokensInStrip.push(num)
      y = 0;
      x = moveXBy;
      console.log(`red${num} in home strip ${token.block}, ${x},${y}`)
      
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
      console.log(x,y)
    if (token.block  === 57) {
        console.log("crashhhh")
        //if token gets home stops it from moving
        y = 0;
        x = 0;
        this.tokensWon += 1;
        console.log(this.tokensWon)
        tokenObj.pointerEvents = "none"

        this.playingTokens.splice(this.playingTokens.indexOf(tokenNo), 1);
        if (this.tokensWon === 4) {
          console.log("sigh")
          this.moveStatus = "won!"
        } else {
          console.log("sigh2")
          this.moveStatus = "tokenIn"
          return 
        }
      } 
      if (count > dice) return ;
      if (token.block === 51) token.block = -1;
      if (token.block === 12) {token.block = 51;console.log("red entered")}
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
      this.setRedPositions(this.getPositions());
    
      setTimeout(step, 300);
    };
    setTimeout(() => {
      tokenObj.classList.remove(this.styles.bounce);
    }, dice * 300);
    return [step,token.block];
  }
}
