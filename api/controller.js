'use strict'
const ThreeNodeCanvas = require('../threeCanvasNodeBox')
const ThreeNodeWebGL = require('../threeWebGLNodeBox')

/***
 * Handles request sent by HTTP, validates data
 * @param req
 * @param res
 */
module.exports.handleRequest = (req, res) => {
  //Respond with error if boxes array is not sent or is empty
  if (!req.body.boxes || req.body.boxes.length === 0) {
    return res.status(400).json({'message': 'Boxes array is required and must not be empty.'})
  }
  //If renderer not specified default to webgl
  const renderer =
    (req.body.renderer && req.body.renderer.toLowerCase() === 'canvas') ? 'canvas' : 'webgl'

  //If fileName not specified or it contains invalid characters, set linux timestamp as fileName
  const re = /^[a-zA-Z0-9]*$/
  const fileName =
    (req.body.fileName && req.body.fileName.match(re)) ? req.body.fileName : Date.now().toString()

  renderFromRequest(req.body.boxes, fileName, renderer, req.body.w, req.body.h)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}

/***
 * Renders image to file from passed arguments
 * @param boxes
 * @param fileName
 * @param renderer
 * @param w
 * @param h
 */
function renderFromRequest (boxes, fileName, renderer, w = 1920, h = 1080) {
  if (renderer === 'webgl') {
    const renderedObj = new ThreeNodeWebGL(boxes, w, h)
    return renderedObj.renderToFile({
      fileName: fileName,
      w: w,
      h: h
    })
  } else {
    const renderedObj = new ThreeNodeCanvas(boxes, w, h)
    return renderedObj.renderToFile({
      fileName: fileName,
      w: w,
      h: h
    })
  }
}