import { canvasWidth, canvasHeight, sizeRow, sizeColumn } from "./common.js";
import SpawnManager from "./spawn_manager.js";

let canvas;
let context;
let deltaTime;
let lastTime;

const spawnManager = new SpawnManager();

// const imageTest = new Star(200, 200, 0, 0, 20, 'img/star-solid.svg');
// const imageTest1 = new Star(300, 200, 0, 0, 20, 'img/star-solid.svg');
// const imageTest2 = new Star(400, 200, 0, 0, 20, 'img/star-solid.svg');

const starImg = new Image();
starImg.src = 'img/star-solid.svg';

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");

    window.requestAnimationFrame(gameLoop);
});

function gameLoop(timeStamp) {

    if (deltaTime == null) {
        deltaTime = timeStamp / 1000;
    } else {
        deltaTime = (timeStamp - lastTime) / 1000;
    }
    lastTime = timeStamp;

    // imageTest.draw(context);
    // imageTest1.draw(context);
    // imageTest2.draw(context);

    clearCanvas();
    
    spawnManager.update(deltaTime, context);

    window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}