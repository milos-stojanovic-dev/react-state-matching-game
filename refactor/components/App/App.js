import React, { Component } from "react";
import OptionsPanel from "../OptionsPanel";
import Board from "../Board";
import { createTiles, indexOfSelected } from "../../misc/utils";
import GameContext from "../../GameContext";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTiles: 36,
      playing: false,
      previousTileIndex: null,
      tiles: [],
      toBeCleared: null,
    };
  }

  handleTileClicked = (id, color) => {
    this.setState(() => {
      const tiles = this.state.tiles;
      let toBeCleared = this.state.toBeCleared;
      const selectedTileIndex = indexOfSelected(tiles, id, color);
      let previousTileIndex = this.state.previousTileIndex;

      if (toBeCleared !== null) {
        let tile0 = toBeCleared[0];
        let tile1 = toBeCleared[1];
        tiles[tile0].selected = false;
        tiles[tile1].selected = false;
        toBeCleared = null;
      }

      tiles[selectedTileIndex].selected = true;

      if (previousTileIndex !== null) {
        let previousTile = tiles[previousTileIndex];
        let selectedTile = tiles[selectedTileIndex];
        if (
          previousTile.id !== selectedTile.id &&
          previousTile.color === color
        ) {
          selectedTile.matched = true;
          previousTile.matched = true;
          previousTileIndex = null;
        } else {
          toBeCleared = [previousTileIndex, selectedTileIndex];
          previousTileIndex = null;
        }
      } else {
        previousTileIndex = selectedTileIndex;
      }
      return {
        tiles,
        toBeCleared,
        previousTileIndex,
      };
    });
  };

  startGame = (numTiles) => {
    this.setState((state) => {
      return {
        playing: true,
        previousTileIndex: null,
        toBeCleared: null,
        tiles: createTiles(this.state.numTiles, this.handleTileClicked),
      };
    });
  };

  handleNumTileChange = (num) => {
    this.setState({
      numTiles: num,
      playing: false,
      tiles: [],
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">Turbo-Matcher</header>
        <GameContext.Provider value={this.state}>
          <OptionsPanel
            handleNumTileChange={this.handleNumTileChange}
            startGame={this.startGame}
            playing={this.state.playing}
            numTiles={this.state.numTiles}
          />
          <Board numTiles={this.state.numTiles} tiles={this.state.tiles} />
        </GameContext.Provider>
      </div>
    );
  }
}

export default App;
