import React from "react";
import "./Board.css";
import Tile from "../Tile";

const Board = (props) => {
  const gridConfig = {
    gridTemplateColumns: `repeat(${Math.sqrt(props.numTiles)}, 1fr)`,
    gridTemplateRows: `repeat(${Math.sqrt(props.numTiles)}, 1fr)`,
  };

  const mapTiles = props.tiles.map((tile) => <Tile {...tile} />);
  console.log(mapTiles);
  return (
    <div className="Board" style={gridConfig}>
      {mapTiles}
    </div>
  );
};

export default Board;
