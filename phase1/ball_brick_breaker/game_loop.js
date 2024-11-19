/////////////////////////////////////////////////////

import { canvasWidth, canvasHeight, canvasBorder } from "./common.js";
import GameManager from "./manager/game_manager.js";



////////////////////////////////////////////////////

let canvas;
let context;
let secondPassed;
let oldTime = 0;
let gameManager;


////////////////////////////////////////////////////

window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = `${canvasBorder}`;

    context = canvas.getContext('2d');
    gameManager = new GameManager(canvas);

    requestAnimationFrame(gameLoop);
});

function gameLoop(timeStamp) {

    if (secondPassed == null) secondPassed = timeStamp / 1000;
    else {
        secondPassed = (timeStamp - oldTime) / 1000;
    }
    oldTime = timeStamp;


    gameManager.clearCanvas(context);
    gameManager.update(secondPassed);
    gameManager.draw(context);

    requestAnimationFrame(gameLoop);
}