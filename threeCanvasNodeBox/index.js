"use strict";
global.THREE = require("three"); // Make three module global so others can extend it
require("./CanvasRenderer.js"); // CanvasRenderer isn't anymore in three package
require("./Projector.js"); // CanvasRenderer needs this dependency

const fs = require('fs');
const Canvas = require('canvas');

module.exports = class ThreeCanvasNodeBox {

    constructor(boxes, w = 1920, h = 1080) {
        this.w = w;
        this.h = h;
        this.boxes = boxes;
        this.scene = new THREE.Scene();
    }

    /**
     * Helper method to add box to scene
     * @param boxParams
     */
    addBox2Scene(boxParams) {
        const geometry = new THREE.BoxGeometry(boxParams.dim.l, boxParams.dim.w, boxParams.dim.h);
        const material = new THREE.MeshBasicMaterial({color: boxParams.color});
        const cube = new THREE.Mesh(geometry, material);
        cube.rotation.x = boxParams.rot.x;
        cube.rotation.y = boxParams.rot.y;
        cube.rotation.z = boxParams.rot.z;
        cube.position.set(boxParams.pos.x, boxParams.pos.y, boxParams.pos.z);
        this.scene.add(cube);
    }

    /**
     * Helper method
     * @param stepIndex
     * @param autoAssignColors
     */
    drawPackagingStep(stepIndex, autoAssignColors) {
        let stepColor = 0x000000;
        // step 0 is considered before packaging (will later only show container), step 1 is when the first box was added
        for (let i = 1; i < this.boxes.length + 1; i++) {
            if (i > stepIndex) {
                break;
            }
            const boxParams = this.boxes[i - 1];
            stepColor = boxParams.color;
            if (autoAssignColors) {
                stepColor = 0x999999;
                if (i === stepIndex) {
                    stepColor = 0xAA0000;
                }
            }
            boxParams.color = stepColor;
            this.addBox2Scene(boxParams);
        }
    }

    /**
     * Adds box to boxes array
     * @param box
     */
    addBox(box) {
        this.boxes.push(box);
    }

    /**
     * Sets new boxes array
     * @param boxes
     */
    setBoxes(boxes) {
        this.boxes = boxes;
    }

    /**
     * Creates readable png stream from canvas, writes it to writable stream
     * @param options
     * @returns {Promise}
     */
    saveStream(options) {
        return new Promise((resolve,reject) => {
            //Make public dir if it does not exist
            if (!fs.existsSync('public')) {
                fs.mkdirSync('public');
            }

            //Add file extension if not specified
            const fileName = helperGetFileExtension(options.fileName) === 'png' ? options.fileName : `${options.fileName}.png`;
            //Open write stream for image
            const out = fs.createWriteStream(`public/${fileName}`);
            const canvasStream = this.canvas.pngStream();
            canvasStream.on('data', (chunk) => out.write(chunk)); //Write chunk per chunk to png file
            canvasStream.on('end', () => resolve(
                {
                    message: `Image has been written to public/${fileName}`,
                    path: `public/${fileName}`
                }
            ));
            canvasStream.on('error', () => reject(
                {
                    message: 'Error while writing image'
                }
            ));
        });
    }

    /**
     * Renders scene, calls saveStream
     * @param options
     * @returns {Promise}
     */
    renderToFile(options) {
            if (!options || !options.fileName)
                return Promise.reject({message: 'Options object is required with required property fileName.'});

            this.drawPackagingStep(3, true);

            this.canvas = new Canvas(200, 200);
            this.canvas.style = {}; // dummy shim to prevent errors during render.setSize
            const renderer = new THREE.CanvasRenderer({
                canvas: this.canvas,
                alpha: true
            });

            const camera = new THREE.PerspectiveCamera(75, (options.w || this.w) / (options.h || this.h), 0.1, 1000);
            camera.position.z = 5;
            renderer.setClearColor(0xffffff, 0);
            renderer.setSize(options.w || this.w, options.h || this.h);
            renderer.render(this.scene, camera);

            return this.saveStream(options);
    };

};

/**
 * Helper function to determinate file extension from argument
 * @param filename
 * @returns {Blob|ArrayBuffer|Array.<T>|string}
 */
function helperGetFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}


