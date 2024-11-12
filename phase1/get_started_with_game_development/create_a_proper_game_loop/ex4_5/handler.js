let canvas;
let context;
const canvasWidth = window.screen.width / 2;
const canvasHeight = window.screen.height / 2;
let secondsPassed;
let oldTimeStamp = 0;
let check = true;
let fps = 30;
const frameDuration = 1000 / fps;
let array = [];
let showFps = 0;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext("2d");

    window.requestAnimationFrame(gameLoop);
});

let circle = {
    x: 200,
    y: 200,
    vx: 200,
    vy: -200,
    radius: 50
}

function gameLoop(timeStamp) {

    clearCanvas();

    if(check) {
        if(secondsPassed == null) {
            secondsPassed = timeStamp / 1000;
            array.push(1 / secondsPassed);
        } else {
            secondsPassed = (timeStamp - oldTimeStamp) / 1000;
            oldTimeStamp = timeStamp;
            array.push(1 / secondsPassed);
        }

        context.beginPath();
        context.fillStyle = 'gray';
        context.font = '20px Arial';
        context.textAlign = 'left';
        context.textBaseLine = 'center';
        context.fillText(`fps: ${showFps}`, 100 , 100);
        draw();
    } else {
        if (timeStamp - oldTimeStamp >= frameDuration) {
            secondsPassed = (timeStamp - oldTimeStamp) / 1000;
            oldTimeStamp = timeStamp;
            fps = 30;
            array.push(1 / secondsPassed);
            context.fillStyle = 'gray';
            context.font = '20px Arial';
            context.textAlign = 'left';
            context.textBaseLine = 'center';
            context.fillText("fps: " + showFps, 100, 100);
            draw();
        }
    }

    detectWall();
    
    update(secondsPassed);

    window.requestAnimationFrame(gameLoop);
}

function draw() {
    context.beginPath();
    context.fillStyle = 'gray';
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    context.fill();
}

function update(secondsPassed) {
    circle.x = circle.x + circle.vx * secondsPassed;
    circle.y = circle.y + circle.vy * secondsPassed;
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function detectWall() {
    if(circle.x < circle.radius) {
        circle.x = circle.radius;
        circle.vx = Math.abs(circle.vx);
    }
    if(circle.x > canvasWidth - circle.radius) {
        circle.x = canvasWidth - circle.radius;
        circle.vx = -Math.abs(circle.vx);
    }
    if(circle.y < circle.radius) {
        circle.y = circle.radius;
        circle.vy = Math.abs(circle.vy);
    }
    if(circle.y > canvasHeight - circle.radius) {
        circle.y = canvasHeight - circle.radius;
        circle.vy = -Math.abs(circle.vy);
    }
} 

function switchs() {
    if(check) check = false;
    else check = true;
}

setInterval(() => {
    let tb = 0;
    for(let i = 0 ;i < array.length; ++i) {
        tb = tb + array[i];
    }
    console.log(array)
    if(tb != 0) {
        showFps = tb / array.length;
    }
    array = [];
}, 1000);