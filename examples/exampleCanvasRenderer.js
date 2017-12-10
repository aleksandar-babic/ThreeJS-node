"use strict";
const threeNode = require('../threeCanvasNodeBox');

const box1 = {
    "pos": {"x": 1, "y": 1, "z": 1},
    "dim": {"l": 2, "w": 1, "h": 1},
    "rot": {"x": 1, "y": 0.5, "z": 0},
    "name": "My first box",
    "color": 0x333388
};

const box2 = {
    "pos": {"x": 3, "y": 1, "z": 1},
    "dim": {"l": 2, "w": 1, "h": 1},
    "rot": {"x": 1, "y": 0.5, "z": 0},
    "name": "My first box",
    "color": 0x333388
};

const box3 = {
    "pos": {"x": 1, "y": 1, "z": 2},
    "dim": {"l": 2, "w": 1, "h": 1},
    "rot": {"x": 1, "y": 0.5, "z": 0},
    "name": "My first box",
    "color": 0x333388
};

threeNode.addBox(box1);
threeNode.addBox(box2);
threeNode.addBox(box3);
threeNode.renderToFile({
    fileName: 'canvasRenderedFile.png',
    w: 1920,
    h: 1080
})
    .then(data => console.log(data.message))
    .catch(error => console.log(error.message));