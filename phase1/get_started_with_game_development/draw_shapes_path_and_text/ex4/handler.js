let canvas;
let context;
const canvasWidth = window.screen.width * 4 / 5;
const canvasHeight = window.screen.height * 4 / 5;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    window.requestAnimationFrame(gameLoop);
});



const localeCenter = { x: canvasWidth / 2, y: canvasHeight / 2 }
    const now = new Date();
    const hours = now.getHours();    
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(`Time: ${hours}:${minutes}:${seconds}`);
    let second = {
        rotation: seconds * Math.PI / 30,
        speedRotate: Math.PI / 30,
    }

    let minute = {
        rotation: (minutes * Math.PI / 30) + (seconds * Math.PI / (30 * 60)),
        speedRotate: Math.PI / (30 * 60),
    }

    let hour = {
        rotation: (hours * Math.PI / 6) + (minutes * Math.PI / (6 * 60)) + (seconds * Math.PI / (6 * 60 * 60)),
        speedRotate: Math.PI / (30 * 60 * 12),
    }

    function gameLoop(timeStamp) {

        clearCanvas();
        
        drawOclock();

        window.requestAnimationFrame(gameLoop);
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    
    function drawOclock() {
        const circleMax = 220;
        const circleMin = 180;
        context.beginPath();
        context.strokeStyle = 'rgb(10, 10, 10)';
        context.arc(localeCenter.x, localeCenter.y, circleMax, 0, 2 * Math.PI);
        context.arc(localeCenter.x, localeCenter.y, circleMin, 0, 2 * Math.PI);
        context.stroke();

        const localeNumberY = (circleMax + circleMin) / 2;
        context.save();
        context.translate(localeCenter.x, localeCenter.y);
        context.rotate(-Math.PI / 6);
        for(let i = 0; i < 12; ++i) {
            context.rotate(Math.PI / 6); 
            context.font = '12px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'center';
            context.fillStyle = 'black';
            context.fillText(`${i == 0 ? 12 : i}`, 0, -localeNumberY);
        };
        context.restore();

        context.beginPath();
        context.save();
        context.translate(localeCenter.x, localeCenter.y);
        context.rotate(second.rotation);
        context.moveTo(0, 0);
        context.lineTo(0, -localeNumberY  * 4 / 5);
        context.strokeStyle = "black";
        context.stroke();
        context.restore();

        context.beginPath();
        context.save();
        context.translate(localeCenter.x, localeCenter.y);
        context.rotate(minute.rotation);
        context.moveTo(0, 0);
        context.lineTo(0, -localeNumberY  * 3 / 4);
        context.strokeStyle = "black";
        context.stroke();
        context.restore();

        context.beginPath();
        context.save();
        context.translate(localeCenter.x, localeCenter.y);
        context.rotate(hour.rotation);
        context.moveTo(0, 0);
        context.lineTo(0, -localeNumberY  * 1 / 2);
        context.strokeStyle = "black";
        context.stroke();
        context.restore();
    }

    setInterval(() => {
        second.rotation += second.speedRotate;
        minute.rotation += minute.speedRotate;
        hour.rotation += hour.speedRotate;
    }, 1000);