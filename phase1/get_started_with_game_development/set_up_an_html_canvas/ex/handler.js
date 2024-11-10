let canvas;
let context;
const canvasWidth = 800;
const canvasHeight = 600;
let secondPassed;
let oldPassed;
let colorObject = 'gray';
let colorBackground = 0;
let checkCount = true;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = '1px solid blue';

    context = canvas.getContext("2d");
    window.requestAnimationFrame(gameLoop);
});

function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = `${colorObject}`;
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

function gameLoop(timeStamp) {
    if(secondPassed == null) {
        secondPassed = timeStamp;
    } else {
        secondPassed = timeStamp - oldPassed;
    }

    oldPassed = timeStamp;

    clearCanvas();
    createLinearGradient();
    drawCircle(canvasWidth * 1 / 6, canvasHeight / 2, 10);
    drawCircle(canvasWidth * 2 / 6, canvasHeight / 2, 20);
    drawCircle(canvasWidth * 3 / 6, canvasHeight / 2, 30);
    drawCircle(canvasWidth * 4 / 6, canvasHeight / 2, 20);
    drawCircle(canvasWidth * 5 / 6, canvasHeight / 2, 10);

    window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

window.onload = () => {
    canvas.addEventListener("mousedown", () => {
        colorObject = `red`;
    });

    canvas.addEventListener("mouseup", () => {
        colorObject = `gray`;
    });
};

function createLinearGradient() {
    context.beginPath();
    context.fillStyle = `rgb(${colorBackground},${colorBackground},${colorBackground})`;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.fill();
    if(checkCount) {
        colorBackground++;
    } else {
        colorBackground--;
    }
    if(colorBackground == 255) {
        checkCount = false;
    } else if (colorBackground == -1) {
        checkCount = true;
    }
}
