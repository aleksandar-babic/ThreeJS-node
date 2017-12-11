"use strict";
global.THREE = require("three"); // Make three module global so others can extend it

const fs = require('fs');
const Canvas = require('canvas');
const pngStream = require('three-png-stream');

const w = 1920;
const h = 1080;
const gl = require('gl')(64, 64, { preserveDrawingBuffer: true }); //Headless GL

let boxes = []; // This array will keep all boxes

const scene = new THREE.Scene();

function addBox2Scene(scene, boxParams){
    const geometry = new THREE.BoxGeometry( boxParams.dim.l, boxParams.dim.w, boxParams.dim.h );
    const material = new THREE.MeshBasicMaterial( { color: boxParams.color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotation.x = boxParams.rot.x;
    cube.rotation.y = boxParams.rot.y;
    cube.rotation.z = boxParams.rot.z;
    cube.position.set(boxParams.pos.x, boxParams.pos.y, boxParams.pos.z);
    scene.add( cube );
}

function drawPackagingStep(scene, boxesParams, stepIndex, autoAssignColors){
    let stepColor = 0x000000;
    // step 0 is considered before packaging (will later only show container), step 1 is when the first box was added
    for(let i = 1; i < boxesParams.length+1; i++ ) {
        if(i > stepIndex){
            break;
        }
        const boxParams = boxesParams[i-1];
        stepColor = boxParams.color;
        if(autoAssignColors){
            stepColor = 0x999999;
            if(i === stepIndex){
                stepColor = 0xAA0000;
            }
        }
        boxParams.color = stepColor;
        addBox2Scene(scene, boxParams);
    }
}

function helperGetFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

module.exports.setBoxes = (boxesNew) => {boxes=boxesNew; console.log(boxes.length)};

module.exports.addBox = (box) => {
    boxes.push(box);
};

module.exports.renderToFile = (options) => {
    return new Promise((resolve, reject) => {
        if(!options || !options.fileName)
            return reject({message: 'Options object is required with required property fileName.'});

        drawPackagingStep(scene, boxes, 3, true);

        const canvas = new Canvas(200, 200);
        canvas.style = {}; // dummy shim to prevent errors during render.setSize
        canvas.addEventListener = () => {};

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            width: w,
            height: h,
            canvas: canvas,
            context: gl
        });

        const camera = new THREE.PerspectiveCamera(75, (options.w || w)/(options.h || h), 0.1, 1000);
        camera.position.z = 5;
        renderer.setClearColor(0x000000, 1); //Set background to black
        renderer.setSize(options.w || w, options.h || h);
        const target = new THREE.WebGLRenderTarget(options.w || w, options.h || h);
        renderer.render(scene, camera, target);

        //Make public dir if it does not exist
        if (!fs.existsSync('public')){
            fs.mkdirSync('public');
        }

        //Add file extension if not specified
        const fileName = helperGetFileExtension(options.fileName) === 'png'?options.fileName:`${options.fileName}.png`;
        //Open write stream for image
        const out = fs.createWriteStream(`public/${fileName}`);
        //Pipe png stream to png file
        pngStream(renderer, target).pipe(out);

        out.on('close', () => resolve(
            {
                message: `Image has been written to public/${fileName}`,
                path: `public/${fileName}`
            }
                ));

    });
};

