
export class redTokenObj {
  constructor(styles, setRedPositions) {
    this.token1 = { x: 32, y: 95, block: 0 };
    this.token2 = { x: 32, y: 105, block: 0 };
    this.token3 = { x: 37, y: 105, block: 0 };
    this.token4 = { x: 37, y: 95, block: 0 };
    this.playingTokens = [];
    this.styles = styles;
    this.setBluePositions = setBluePositions;
    this.startX = 44.6;
    this.startY = 78.5;
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

  tokenMoves(token, x, y, dice) {
    let moveBy = 6;
    let turnX = 3;
    let turnY = 6;
    if (token.block < 5) {
      y = -moveBy;
    } else if (token.block >= 5 && token.block < 11) {
      y = 0;
      x = -moveBy / 2;
      if (token.block === 5) {
        y = -turnY;
        x = -turnX;
      }
    } else if (token.block >= 11 && token.block < 13) {
      y = -moveBy;
      x = 0;
    } else if (token.block >= 13 && token.block < 18) {
      y = 0;
      x = moveBy / 2;
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
    } else if (token.block >= 50 && token.block < 51) {
      y = 0;
      x = -moveBy / 2;
    } else if (token.block >= 51 && token.block < 57) {
      x = 0;
      y = -moveBy;
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
      if (token.block === 57) {
        y = 0;
        x = 0;
      }
      console.log(dice)

      if (count > dice) return;
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
    return step;
  }
}
