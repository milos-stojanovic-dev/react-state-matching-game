import GameContext from "../../GameContext.js";
import React from "react";
import "./Button.css";

const Button = ({ playing, startGame }) => (
  <GameContext.Consumer>
    <button onClick={startGame}>{playing ? "reset" : "start"}</button>
  </GameContext.Consumer>
);

export default Button;
