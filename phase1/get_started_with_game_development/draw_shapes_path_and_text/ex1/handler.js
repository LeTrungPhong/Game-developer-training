let canvas;
let context;
const canvasWidth = window.screen.width * 2 / 3;
const canvasHeight = window.screen.height / 2;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = '1px solid gray';
    context = canvas.getContext("2d");

    window.requestAnimationFrame(gameLoop);
});

function gameLoop() {
    clearCanvas();
    draw();
    window.requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function draw() {
    context.beginPath();
    context.save();
    context.translate(canvasWidth / 2, canvasHeight / 2);
    context.fillStroke = 'gray';
    context.fillStyle = 'gray';
    context.strokeRect(0, 0, 100, 100);

    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(150, 50);
    context.stroke();

    context.beginPath();
    context.moveTo(150, 50);
    context.lineTo(150, -50);
    context.stroke();

    context.beginPath();
    context.moveTo(150, -50);
    context.lineTo(100, 0);
    context.stroke();

    context.beginPath();
    context.setLineDash([10, 5]);
    context.moveTo(150, -50);
    context.lineTo(50, -50);
    context.stroke();

    context.beginPath();
    context.moveTo(50, -50);
    context.lineTo(0, 0);
    context.stroke();

    context.beginPath();
    context.setLineDash([]);
    context.moveTo(0, 0);
    context.lineTo(50, -100);
    context.lineTo(100, 0);
    context.stroke();

    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(150, -50);
    context.lineTo(50, -100);
    context.stroke();

    context.beginPath();
    context.moveTo(25, 100);
    context.lineTo(25, 50);
    context.lineTo(75, 50);
    context.lineTo(75, 100);
    context.stroke();

    context.beginPath();
    context.moveTo(50, 50);
    context.lineTo(50, 100);
    context.stroke();

    context.beginPath();
    context.strokeRect(10, 10, 80, 20);

    context.beginPath();
    context.moveTo(50, 10);
    context.lineTo(50, 30);
    context.stroke();

    context.restore();
}