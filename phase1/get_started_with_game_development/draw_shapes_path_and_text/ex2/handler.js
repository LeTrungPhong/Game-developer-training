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
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function draw() {
    context.save();
    context.translate(canvasWidth / 2, canvasHeight / 2);

    context.beginPath();
    context.strokeStyle = 'yellow';
    context.strokeRect(-10, -30, 250, 250);
    
    const textName = [ 'B', 'A', 'C', 'H', ' ', 'K', 'H', 'O', 'A' ];
    let localeName = { x: 20, y: 20 };
    for(let i = 0; i < textName.length; ++i) {
        context.beginPath();
        context.font = '20px Arial';
        context.fillStyle = 'red';
        context.textAlign = 'center';
        context.textBaseLine = 'center';
        context.fillText(`${textName[i]}`, localeName.x, localeName.y);
        localeName.x = localeName.x + 20;
    }

    const textCity = [ 'D', ' ', 'N', 'A', 'N', 'G' ];
    let localeCity = { x: 40, y: 0 };
    for(let i = 0; i < textCity.length; ++i) {
        context.beginPath();
        context.font = '20px Arial';
        context.fillStyle = 'blue';
        context.textAlign = 'center';
        context.textBaseLine = 'center';
        context.fillText(`${textCity[i]}`, localeCity.x, localeCity.y);
        localeCity.y = localeCity.y + 20;
    }

    context.beginPath();
    context.fillStyle = 'blue';
    context.fillRect(59, 39, 170, 170);

    context.beginPath();
    context.fillStyle = 'yellow';
    context.arc(81, 125, 85, -Math.PI / 2, Math.PI / 2);
    context.fill();

    context.beginPath();
    context.arc(121, 125, 85, -3 * Math.PI / 4, Math.PI / 2 + Math.PI / 4);
    context.fill();

    context.beginPath();
    context.fillStyle = 'blue';
    context.fillRect(61, 41, 20, 168);
    context.stroke();

    context.beginPath();
    context.fillStyle = 'blue';
    context.arc(81, 105, 64, -Math.PI / 2, Math.PI / 2, false);
    context.fill();
    context.restore();
}