'use strict'
const ThreeNodeCanvas = require('../threeCanvasNodeBox')

const box1 = {
  'pos': {'x': 1, 'y': 1, 'z': 1},
  'dim': {'l': 2, 'w': 1, 'h': 1},
  'rot': {'x': 1, 'y': 0.5, 'z': 0},
  'name': 'My first box',
  'color': 0x333388
}

const box2 = {
  'pos': {'x': 3, 'y': 1, 'z': 1},
  'dim': {'l': 2, 'w': 1, 'h': 1},
  'rot': {'x': 1, 'y': 0.5, 'z': 0},
  'name': 'My first box',
  'color': 0x333388
}

const box3 = {
  'pos': {'x': 1, 'y': 1, 'z': 2},
  'dim': {'l': 2, 'w': 1, 'h': 1},
  'rot': {'x': 1, 'y': 0.5, 'z': 0},
  'name': 'My first box',
  'color': 0x333388
}

const boxes = [box1, box2, box3]

const renderObj = new ThreeNodeCanvas(boxes)
renderObj.renderToFile({
  fileName: 'CanvasRenderedFile.png'
})
  .then(data => console.log(data.message))
  .catch(error => console.log(error.message))