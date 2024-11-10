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
    context.save();
    context.translate(200, 100);
    
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 400);
    context.stroke();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(-8, 10);
    context.stroke();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(8, 10);
    context.stroke();

    context.beginPath();
    context.moveTo(0, 400);
    context.lineTo(800, 400);
    context.stroke();

    context.beginPath();
    context.moveTo(800, 400);
    context.lineTo(790, 392);
    context.stroke();

    context.beginPath();
    context.moveTo(800, 400);
    context.lineTo(790, 408);
    context.stroke();

    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseLine = 'center';
    context.fillText('muc tieu thu', 70, -10);

    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseLine = 'center';
    context.fillText('thanh pho', 800, 430);

    let locale = { x: 100, y: 430 };
    let height = [ 100, 120, 90, 200, 100 ];
    const name = ['da nang', 'hue', 'ha noi', 'sai gon', 'bac giang'];
    
    for(let i = 0; i < name.length; ++i) {
        context.beginPath();
        context.fillStyle = 'gray';
        context.font = '15px Arial';
        context.fillText(`${name[i]}`, locale.x, locale.y);

        context.beginPath();
        context.fillStyle = 'gray';
        context.strokeStyle = 'black';
        context.fillRect(locale.x - 20, locale.y - height[i] - 30, 40, height[i]);

        locale.x = locale.x + 125;
    }

    context.restore();
}