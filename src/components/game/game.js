import React, { Component } from "react";

import Block from "./block/block";
import classes from "./game.module.css";

class Game extends Component {
  state = {
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
          showValue[id] = 1;
        }

        gameArray.showValue = showValue;

        this.setState({ gameArray: gameArray, gameOver: gameOver });
      }
    }
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
      } else if (showValue[id] == 2) {
        showValue[id] = 0;
        ++flagAmount;
      }

      gameArray.showValue = showValue;
      this.setState({ gameArray: gameArray, flagAmount: flagAmount });
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

    this.setState({ gameArray: gameArray });
  }

  render() {
    let blocks = [];
    for (let i = 0; i < this.state.width * this.state.width; ++i) {
      blocks.push(
        <Block
          key={i}
          blockState={this.state.gameArray.blockState[i]}
          value={this.state.gameArray.value[i]}
          showValue={this.state.gameArray.showValue[i]}
          clicked={() => this.blockClickedHandler(i)}
          addFlag={(e) => this.addFlagHandler(e, i)}
        />
      );
    }

    return <div className={classes.Game}>{blocks}</div>;
  }
}

export default Game;
