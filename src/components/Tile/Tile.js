import React from "react";

import "./Tile.css";

const Tile = (props) => {
  const color =
    props.selected || props.matched ? { backgroundColor: props.color } : null;

  return (
    <div className="Tile">
      {(props.selected || props.matched) && <svg>{props.svg}</svg>}
    </div>
  );
};

export default Tile;
