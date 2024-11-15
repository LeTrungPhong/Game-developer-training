import { canvasWidth, canvasHeight, sizeRow, sizeColumn } from "./common.js";
import SpawnManager from "./spawn_manager.js";
import Player from "./player_controller.js";
import RectCollider from "./rectangle_collider.js";
import InputController from "./input_controller.js";
import GameManager from "./game_manager.js";

let canvas;
let context;
let deltaTime;
let lastTime;

const spawnManager = new SpawnManager();
const player = new Player(canvasWidth / 2, canvasHeight - 70, 0, 0, 70, 70);
const inputController = new InputController();
const gameManager = new GameManager();


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

    clearCanvas();

    gameManager.update();
    gameManager.draw(context);
    spawnManager.update(deltaTime, context);
    player.draw(context);
    player.update(deltaTime);
    player.detectWall();
    
    let arrayRemove = [];
    for(let i = 0; i < spawnManager.listStar.length; ++i) {
        if(player.collider.checkCollision(spawnManager.listStar[i].collider)) {
            gameManager.updateScore(5);
            arrayRemove.push(i);
        }
    }
    for(let i = 0; i < arrayRemove.length; ++i) {
        spawnManager.listStar.splice(arrayRemove[i], 1);
    }


    arrayRemove = [];
    for(let i = 0; i < spawnManager.listStar.length; ++i) {
        if(spawnManager.listStar[i].detectWall()) {
            arrayRemove.push(i);
        }
    }

    for(let i = 0; i < arrayRemove.length; ++i) {
        spawnManager.listStar.splice(arrayRemove[i], 1);
        gameManager.updateHeart(-1);
    }




    if (inputController.isKeyPressed('ArrowLeft')) {
        player.vx = -400;
    } else {
        if(player.vx < 0) {
            player.vx = 0;
        }
    }

    if (inputController.isKeyPressed('ArrowRight')) {
        player.vx = 400;
    } else {
        if(player.vx > 0) {
            player.vx = 0;
        }
    }

    if(gameManager.state == 'playing') {
        window.requestAnimationFrame(gameLoop);
    }
}



function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}