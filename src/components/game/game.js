import React, { Component } from "react";

import Block from "./block/block";
import classes from "./game.module.css";

class Game extends Component {
  state = {
    width: 10,
    bombAmount: 20,
    gameArray: [],
  };

  blockClickedHandler = (id) => {
    const gameArray = { ...this.state.gameArray };

    if (gameArray[id] === "bomb") {
      console.log("game over!");
    }
  };

  componentDidMount() {
    const bombArray = Array(this.state.bombAmount).fill("bomb");
    const numberArray = Array(
      this.state.width * this.state.width - this.state.bombAmount
    ).fill("number");
    const totalArray = bombArray.concat(numberArray);
    const gameArray = totalArray.sort(() => Math.random() - 0.5);

    this.setState({ gameArray: gameArray });
  }

  render() {
    let blocks = [];
    for (let i = 0; i < this.state.width * this.state.width; ++i) {
      blocks.push(
        <Block
          key={i}
          value={this.state.gameArray[i]}
          clicked={() => this.blockClickedHandler(i)}
        />
      );
    }

    return <div className={classes.Game}>{blocks}</div>;
  }
}

export default Game;
