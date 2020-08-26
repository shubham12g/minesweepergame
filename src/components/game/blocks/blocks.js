import React from "react";

import classes from "./blocks.module.css";
import Block from "./block/block";

const Blocks = (props) => {
  let blocks = [];
  if (!props.gameLoaded) {
    blocks.push("Loading...");
  } else {
    for (let i = 0; i < props.width * props.width; ++i) {
      blocks.push(
        <Block
          key={i}
          blockState={props.gameArray.blockState[i]}
          value={props.gameArray.value[i]}
          showValue={props.gameArray.showValue[i]}
          clicked={() => props.clicked(i)}
          addFlag={(e) => props.addFlag(e, i)}
        />
      );
    }
  }

  return <div className={classes.Blocks}>{blocks}</div>;
};

export default Blocks;
