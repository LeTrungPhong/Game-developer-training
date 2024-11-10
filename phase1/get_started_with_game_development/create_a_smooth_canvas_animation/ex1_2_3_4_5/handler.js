let canvas;
let context;
const canvasWidth = window.screen.width / 2;
const canvasHeight = window.screen.height / 2;
let secondsPassed;
let oldTimeStamp = 0;
let angle = 0;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = '1px solid gray';
    context = canvas.getContext("2d");

    window.requestAnimationFrame(gameLoop);
});

let circle1 = {
    x: canvasWidth * 2 / 3,
    y: canvasHeight / 2,
    width: 100,
    height: 100,
    angle: 0
};

let circle2 = {
    x: canvasWidth * 1 / 3,
    y: canvasHeight / 2,
    width: 100,
    height: 100,
    angle: 0
};

let circle3 = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: 100,
    height: 100,
    vx: 200,
    vy: 200
}

let circleRemote = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: 100,
    height: 100,
    vx: 0,
    vy: 0,
    speed: 200
}

function gameLoop(timeStamp) {

    if(secondsPassed == null) {
        secondsPassed = timeStamp / 1000;
    } else {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
    }

    clearCanvas();
    draw(secondsPassed);

    window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function draw(secondsPassed) {

    // circle 1
    const x1 = circle1.x + 100 * Math.cos(angle);
    const y1 = circle1.y + 100 * Math.sin(angle);

    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(x1, y1, circle1.width, circle1.height);
    context.fill();

    // circle 2
    const x2 = circle2.x - 100 * Math.cos(angle);
    const y2 = circle2.y - 100 * Math.sin(angle);

    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(x2, y2, circle2.width, circle2.height);
    context.fill();

    // circle 3
    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(circle3.x, circle3.y, circle3.width, circle3. height);
    context.fill();

    circle3.x += secondsPassed * circle3.vx;
    circle3.y += secondsPassed * circle3.vy;

    if(circle3.x < 0) {
        circle3.x = 0;
        circle3.vx = Math.abs(circle3.vx);
    }

    if(circle3.x > canvasWidth - circle3.width) {
        circle3.x = canvasWidth - circle3.width;
        circle3.vx = -Math.abs(circle3.vx);
    }

    if(circle3.y < 0) {
        circle3.y = 0;
        circle3.vy = Math.abs(circle3.vy);
    }

    if(circle3.y > canvasHeight - circle3.height) {
        circle3.y = canvasHeight - circle3.height;
        circle3.vy = -Math.abs(circle3.vy);
    }

    // circle remote
    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(circleRemote.x, circleRemote.y, circleRemote.width, circle3. height);
    context.fill();

    circleRemote.y += circleRemote.vy * secondsPassed;
    circleRemote.x += circleRemote.vx * secondsPassed;
 
    angle += 0.05;

    // fps
    context.fillStyle = 'gray';
    context.textAlign = 'center';
    context.textBaseLine = 'center';
    context.font = '20px Arial';
    context.fillText(`fps: ${1 / secondsPassed}`, 200, 50);
}

document.addEventListener('keydown', (event) => {
    if(event.key == "ArrowRight") {
        circleRemote.vx = circleRemote.speed;
    }
    if(event.key == "ArrowLeft") {
        circleRemote.vx = -circleRemote.speed;
    }
    if(event.key == "ArrowDown") {
        circleRemote.vy = circleRemote.speed;
    }
    if(event.key  == "ArrowUp") {
        circleRemote.vy = -circleRemote.speed;
    }
});

document.addEventListener('keyup', (event) => {
    if(event.key == "ArrowRight") {
        circleRemote.vx = 0;
    }
    if(event.key == "ArrowLeft") {
        circleRemote.vx = 0;
    }
    if(event.key == "ArrowDown") {
        circleRemote.vy = 0;
    }
    if(event.key  == "ArrowUp") {
        circleRemote.vy = 0;
    }
});

