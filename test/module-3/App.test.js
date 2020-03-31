import React from 'react'

import App from '../../src/components/App'
import { createTiles } from '../../src/misc/utils'

import { shallow } from 'enzyme'

describe('App', () => {
  const wrapper = shallow(<App />)
  const instance = wrapper.instance()

  it('Has a handleTileClicked method @crate-handle-tile-clicked', () => {
    expect(typeof instance.handleTileClicked, 'Did you create the handleTileClicked method on App?')
      .toEqual('function')
  })

  it('calls setState @set-the-state', () => {
    const setStateSpy = jest.spyOn(App.prototype, 'setState')
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()
    instance.handleTileClicked()

    expect(setStateSpy).toHaveBeenCalledWith({ tiles: [], toBeCleared: null})
  })

  it('sets the selected tile as the previous tile if its null @find-the-selected-tile', () => {
    const setStateSpy = jest.spyOn(App.prototype, 'setState')
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()
    instance.startGame(10)
    
    const tiles = instance.state.tiles
    instance.handleTileClicked(tiles[5].id, tiles[5].color)

    expect(setStateSpy).toHaveBeenCalledWith({ previousTileIndex: 5, tiles, toBeCleared: null})

  })

  it('handles matched tiles @handle-matched-tile', () => {
    const setStateSpy = jest.spyOn(App.prototype, 'setState')
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()
    instance.startGame(10)

    let tiles = instance.state.tiles

    const selectedTile = tiles[5]

    const matchingPreviousTileIndex = instance.state.tiles.findIndex((tile) => {
      return tile.color === selectedTile.color && tile.key !== selectedTile.key
    })

    instance.setState({previousTileIndex: matchingPreviousTileIndex})

    instance.handleTileClicked(selectedTile.id, selectedTile.color)


    tiles = instance.state.tiles
    expect(tiles[5].matched, 'Did you set the matched property of the selected tile to true?').toBe(true)
    expect(tiles[matchingPreviousTileIndex].matched, 'Did you set the matched property of the previous tile to true?').toBe(true)
    expect(instance.state.previousTileIndex).toBe(null)
  })
})