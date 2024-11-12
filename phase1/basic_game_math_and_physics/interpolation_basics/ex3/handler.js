let canvas;
let context;
const canvasWidth = window.screen.width * 6 / 7;
const canvasHeight = window.screen.height * 6 / 7;
let positionCenter;

let rotate1 = {
    angleStart: 0,
    angleEnd: Math.PI * 2,
    duration: 3000,
    radius: 150,
    startTime: null
};

let rotate2 = { radius: 250 };
let rotate3 = { radius: 350 };

let circle1 = {
    position: { x: 0, y: 0 },
    radius:40
};

let circle2 = {
    position: { x: 0, y: 0 },
    radius: 40
};

let circle3 = {
    position: { x: 0, y: 0 },
    radius: 40
};


window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    positionCenter = { x: canvas.width / 2, y: canvas.height / 2 };

    window.requestAnimationFrame(gameLoop);
});

function gameLoop(time) {

    if(rotate1.startTime == null) rotate1.startTime = time;

    let elapsed = time - rotate1.startTime;
    let t, k, h;

    t = Math.min(elapsed / rotate1.duration, 1);
    k = t
    h = k

    t = easeInQuad(t);
    k = easeInOutQuad(k);
    h = easeOutQuad(h);

    circle1.position.x = positionCenter.x + rotate1.radius * Math.cos(lerp(rotate1.angleStart, rotate1.angleEnd, t));
    circle1.position.y = positionCenter.y + rotate1.radius * Math.sin(lerp(rotate1.angleStart, rotate1.angleEnd, t));

    circle2.position.x = positionCenter.x + rotate2.radius * Math.cos(lerp(rotate1.angleStart, rotate1.angleEnd, k));
    circle2.position.y = positionCenter.y + rotate2.radius * Math.sin(lerp(rotate1.angleStart, rotate1.angleEnd, k));

    circle3.position.x = positionCenter.x + rotate3.radius * Math.cos(lerp(rotate1.angleStart, rotate1.angleEnd, h));
    circle3.position.y = positionCenter.y + rotate3.radius * Math.sin(lerp(rotate1.angleStart, rotate1.angleEnd, h));

    
    clearCanvas();
    draw();

    window.requestAnimationFrame(gameLoop);
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function draw() {
    context.beginPath();
    context.setLineDash([]);
    context.strokeStyle = 'black';
    context.arc(circle1.position.x, circle1.position.y, circle1.radius, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(circle2.position.x, circle2.position.y, circle2.radius, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(circle3.position.x, circle3.position.y, circle3.radius, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.setLineDash([5, 10]);
    context.arc(positionCenter.x, positionCenter.y, rotate1.radius, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(positionCenter.x, positionCenter.y, rotate2.radius, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(positionCenter.x, positionCenter.y, rotate3.radius, 0, 2 * Math.PI);
    context.stroke();
}

function easeOutQuad(t) {
    return t * (2 - t); 
}

function easeInOutQuad(t) {
    return t * t * (3.0 - 2.0 * t);
}

function easeInQuad(t) {
    return t * t;
}

function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}