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
let spaceTime = 0;
let checkKey = true;

const spawnManager = new SpawnManager();
const inputController = new InputController();
const player = new Player(canvasWidth / 2, canvasHeight - 70, 0, 0, 70, 70, inputController);
const gameManager = new GameManager();

window.onload = function() {
    
}

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");
   
    draw();
    // const audio = document.getElementById('myAudio');
    // audio.play();
    
    // startGame();

    
    canvas.addEventListener('click', handleClick);
});

function handleClick(event) {
    test();
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.x;
    const mouseY = event.clientY - rect.y;
    if(canvasWidth / 2 - 100 <= mouseX && mouseX <= canvasWidth / 2 + 100 && canvasHeight / 2 - 30 <= mouseY && mouseY <= canvasHeight / 2 + 30) {
        startGame();
    }
    canvas.removeEventListener('click', handleClick);
}



function test() {
    window.requestAnimationFrame(drawCountDown);
}

function draw() {
    context.beginPath();
    context.strokeStyle = 'red';
    context.strokeRect(canvasWidth / 2 - 100, canvasHeight / 2 - 30, 200, 60);

    context.beginPath();
    context.fillStyle = 'blue';
    context.font = '40px Brush Script MT';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText("Start", canvasWidth / 2, canvasHeight / 2); 
}

let oldTime = 0;
let secondPassed;
let animation = {
    start: Math.PI / 2,
    end: Math.PI / 2 + 2 * Math.PI,
    duration: 1000
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

let countTime = 0;
let checkColor = true;
let timeDelay = 0;
function drawCountDown(timeStamp) {
    if (secondPassed == null) {
        secondPassed = timeStamp;
        timeDelay = timeStamp;
    }
    else {
        secondPassed = (timeStamp - oldTime);
    }
    oldTime = timeStamp - timeDelay;

    if (countTime > 1000) {
        console.log(countTime)
        countTime = 0;
        if(checkColor) {
            checkColor = false;
        } else {
            checkColor = true;
        }
    }

    countTime = (oldTime);

    let t = (countTime) / animation.duration;
    t = easeInQuad(t);
    let angle = lerp(animation.start, animation.end, t);

    clearCanvas();

    
    if(checkColor) {
        context.beginPath();
        context.fillStyle = '#c39999';
        context.arc(canvasWidth / 2, canvasHeight / 2, 130, Math.PI / 2, angle);
        context.fill();
    } else {
        
        context.beginPath();
        context.fillStyle = '#c39999';
        context.arc(canvasWidth / 2, canvasHeight / 2, 130, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = 'white';
        context.arc(canvasWidth / 2, canvasHeight / 2, 130, Math.PI / 2, angle);
        context.fill();
    }

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '70px Trebuchet MS';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(`${ Math.ceil(3 - (countTime / 1000)) }`, canvasWidth / 2, canvasHeight / 2);

    // context.beginPath();
    // context.strokeStyle = 'red';
    // context.arc(canvasWidth / 2, canvasHeight / 2, 150, 0, 2 * Math.PI);
    // context.stroke();

    context.beginPath();
    context.strokeStyle = 'gray';
    context.arc(canvasWidth / 2, canvasHeight / 2, 120, 0, 2 * Math.PI);
    context.stroke();

    

    if(countTime / 1000 < 3) {
        requestAnimationFrame(drawCountDown);
    }
}

function easeInQuad(t) {
    return t * t;
}


function startGame() {
    window.requestAnimationFrame(drawCountDown);
    const audioStartGame = new Audio();
    audioStartGame.src = 'audio/countdown1.mp3';
    audioStartGame.play();

    clearCanvas();
    
    setTimeout(() => {
        window.requestAnimationFrame(gameLoop);
    }, 3000);
}

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
            const audioTakeStar = new Audio();
            audioTakeStar.src = 'audio/take_star3.mp3';
            audioTakeStar.play();
        }
    }
    for(let i = 0; i < arrayRemove.length; ++i) {
        spawnManager.listStar.splice(arrayRemove[i], 1);
    }

    arrayRemove = [];
    for(let i = 0; i < spawnManager.listStar.length; ++i) {
        if(spawnManager.listStar[i].detectWall()) {
            arrayRemove.push(i);
            const audioDropStar = new Audio();
            audioDropStar.src = 'audio/drop_star.mp3';
            // audioDropStar.play();
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
    
    spaceTime += deltaTime;

    

    if (inputController.isKeyPressed(' ')) {
        if(player.y >= canvasHeight - player.height) {
            player.vy -= 500;
            spaceTime = 0;
        }
    }
    

    player.vy +=  9.8;
    if(player.y >= canvasHeight - player.height) {
        player.y = canvasHeight - player.height;
    } 


    if(gameManager.state == 'playing') {
        window.requestAnimationFrame(gameLoop);
    }

    
}



function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}