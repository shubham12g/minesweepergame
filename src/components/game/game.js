import React, { Component } from "react";

import classes from "./game.module.css";
import Blocks from "./blocks/blocks";

class Game extends Component {
  state = {
    gameLoaded: false,
    width: 10,
    bombAmount: 20,
    flagAmount: 20,
    gameArray: {
      blockState: [],
      value: [],
      showValue: [],
    },
    gameOver: false,
  };

  blockClickedHandler = (id) => {
    if (!this.state.gameOver) {
      if (this.state.gameArray.showValue[id] === 0) {
        const gameArray = { ...this.state.gameArray };
        const showValue = { ...this.state.gameArray.showValue };

        let gameOver = false;
        if (this.state.gameArray.blockState[id] === "bomb") {
          for (let i = 0; i < this.state.width * this.state.width; ++i) {
            if (this.state.gameArray.blockState[i] === "bomb") {
              showValue[i] = 1;
            }
          }
          gameOver = true;
        } else {
          if (this.state.gameArray.value[id] === 0) {
            this.checkBlock(id);
          }
          showValue[id] = 1;
        }

        gameArray.showValue = showValue;

        this.setState({ gameArray: gameArray, gameOver: gameOver });
      }
    }
  };

  checkBlock = (id) => {
    const isLeftEdge = id % this.state.width === 0;
    const isRightEdge = id % this.state.width === this.state.width - 1;

    setTimeout(() => {
      if (id > 0 && !isLeftEdge) {
        this.blockClickedHandler(id - 1);
      }
      if (id > 9 && !isRightEdge) {
        this.blockClickedHandler(id - this.state.width + 1);
      }
      if (id > 9) {
        this.blockClickedHandler(id - this.state.width);
      }
      if (id > 10 && !isLeftEdge) {
        this.blockClickedHandler(id - 1 - this.state.width);
      }
      if (id < 99 && !isRightEdge) {
        this.blockClickedHandler(id + 1);
      }
      if (id < 90 && !isLeftEdge) {
        this.blockClickedHandler(id + this.state.width - 1);
      }
      if (id < 89 && !isRightEdge) {
        this.blockClickedHandler(id + this.state.width + 1);
      }
      if (id < 90) {
        this.blockClickedHandler(id + this.state.width);
      }
    }, 10);
  };

  addFlagHandler = (e, id) => {
    e.preventDefault();

    if (!this.state.gameOver) {
      const gameArray = { ...this.state.gameArray };
      const showValue = { ...this.state.gameArray.showValue };
      let flagAmount = this.state.flagAmount;

      if (showValue[id] === 0 && flagAmount > 0) {
        showValue[id] = 2;
        --flagAmount;
      } else if (showValue[id] === 2) {
        showValue[id] = 0;
        ++flagAmount;
      }

      gameArray.showValue = showValue;
      this.setState({ gameArray: gameArray, flagAmount: flagAmount });

      this.checkForWin(showValue);
    }
  };

  checkForWin = (showValue) => {
    let matches = 0;
    for (let i = 0; i < this.state.width * this.state.width; ++i) {
      if (this.state.gameArray.blockState[i] === "bomb" && showValue[i] === 2) {
        ++matches;
      }
    }

    console.log(matches);

    if (matches === this.state.bombAmount) {
      console.log("won!");
      this.setState({ gameOver: true });
    }
  };

  componentDidMount() {
    //create the game array
    const bombArray = Array(this.state.bombAmount).fill("bomb");
    const numberArray = Array(
      this.state.width * this.state.width - this.state.bombAmount
    ).fill("number");
    const totalArray = bombArray.concat(numberArray);
    const blockStateArray = totalArray.sort(() => Math.random() - 0.5);

    //add the numbers
    const dataArray = [];
    for (let i = 0; i < this.state.width * this.state.width; ++i) {
      let total = 0;
      const isLeftEdge = i % this.state.width === 0;
      const isRightEdge = i % this.state.width === this.state.width - 1;

      if (i > 0 && !isLeftEdge && blockStateArray[i - 1] === "bomb") ++total;
      if (
        i > 9 &&
        !isRightEdge &&
        blockStateArray[i - this.state.width + 1] === "bomb"
      )
        ++total;
      if (i > 9 && blockStateArray[i - this.state.width] === "bomb") ++total;
      if (
        i > 10 &&
        !isLeftEdge &&
        blockStateArray[i - this.state.width - 1] === "bomb"
      )
        ++total;
      if (i < 99 && blockStateArray[i + 1] === "bomb") ++total;
      if (
        i < 90 &&
        !isLeftEdge &&
        blockStateArray[i + this.state.width - 1] === "bomb"
      )
        ++total;
      if (
        i < 88 &&
        !isRightEdge &&
        blockStateArray[i + this.state.width + 1] === "bomb"
      )
        ++total;
      if (i < 90 && blockStateArray[i + this.state.width] === "bomb") ++total;

      dataArray.push(total);
    }

    let gameArray = { blockState: [], value: [], showValue: [] };
    for (let i = 0; i < this.state.width * this.state.width; ++i) {
      gameArray.blockState.push(blockStateArray[i]);
      gameArray.value.push(dataArray[i]);
      gameArray.showValue.push(0);
    }

    this.setState({ gameArray: gameArray, gameLoaded: true });
  }

  render() {
    return (
      <div className={classes.Game}>
        <Blocks
          gameLoaded={this.state.gameLoaded}
          width={this.state.width}
          gameArray={this.state.gameArray}
          clicked={(i) => this.blockClickedHandler(i)}
          addFlag={(e, i) => this.addFlagHandler(e, i)}
        />
        <p>score and other info</p>
      </div>
    );
  }
}

export default Game;
