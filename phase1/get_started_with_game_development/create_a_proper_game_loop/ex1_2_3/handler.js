"use strict";
let canvas;
let context;

window.onload = init;

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
}

// function gameLoop(timeStamp) {
//     draw();

//     // Keep requesting new frames
//     window.requestAnimationFrame(gameLoop);
// }

let secondsPassed;
let oldTimeStamp;
let fps = 30;
let check = true;
const frameDuration = 1000 / fps;

function gameLoop(timeStamp) {
    if(check) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
    
        fps = Math.round(1 / secondsPassed);
    
        context.fillStyle = "white";
        context.fillRect(0, 0, 200, 100);
        context.font = "25px Arial";
        context.fillStyle = "black";
        context.fillText("FPS: " + fps, 10, 30);
        draw();
    } else {
        if (timeStamp - oldTimeStamp >= frameDuration) {
            oldTimeStamp = timeStamp;
            fps = 30;
            context.fillStyle = "white";
            context.fillRect(0, 0, 200, 100);
            context.font = "25px Arial";
            context.fillStyle = "black";
            context.fillText("FPS: " + fps, 10, 30);
            draw();
        }
    }

    // draw();
    window.requestAnimationFrame(gameLoop);
}

function draw() {
    let randomColor = Math.random() > 0.5 ? "#ff8080" : "#0099b0";
    context.fillStyle = randomColor;
    context.fillRect(100, 50, 200, 175);
}

function switchs() {
    if(check) check = false;
    else check = true;
}