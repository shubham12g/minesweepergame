import React from "react";

import classes from "./block.module.css";

const block = (props) => {
  const blockClass = [classes[props.blockState], classes.Block];

  let value = props.value;
  if (props.blockState === "bomb") value = "💣";

  return (
    <div className={blockClass.join(" ")} onClick={props.clicked}>
      {props.showValue ? value : null}
    </div>
  );
};

export default block;
