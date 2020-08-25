import React from "react";

import classes from "./block.module.css";

const block = (props) => {
  const blockClass = [classes[props.value], classes.Block];

  return <div className={blockClass.join(" ")} onClick={props.clicked}></div>;
};

export default block;
