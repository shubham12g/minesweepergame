import React from "react";

import classes from "./App.module.css";
import Game from "./components/game/game";

function App() {
  return (
    <div className={classes.App}>
      <div>minesweeper</div>
      <Game />
    </div>
  );
}

export default App;
