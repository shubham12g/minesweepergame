import React from "react";

import classes from "./block.module.css";

const block = (props) => {
  const blockClass = [classes[props.blockState], classes.Block];

  let value;
  if (props.showValue === 0) value = null;
  else if (props.showValue === 1) {
    if (props.blockState === "bomb") {
      value = "💣";
    } else {
      value = props.value > 0 ? props.value : null;
      blockClass.push(classes.Checked);
    }
  } else {
    value = "⛳";
  }

  return (
    <div
      className={blockClass.join(" ")}
      onClick={props.clicked}
      onContextMenu={props.addFlag}
    >
      {value}
    </div>
  );
};

export default block;
