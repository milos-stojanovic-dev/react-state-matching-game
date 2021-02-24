import React from "react";
import "./Button.css";

const Button = (props) => (
  <button onClick={props.startGame}>
    {props.playing ? "Reset" : "Start"}
  </button>
);

export default Button;
