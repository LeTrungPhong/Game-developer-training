let canvas;
let context;
const canvasWidth = window.screen.width * 2 / 3;
const canvasHeight = window.screen.height * 2 / 3;
let animation;
let animation2;
let rect;
let check = true;


window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    animation = {
        start: { x: canvas.width / 2, y: canvas.height / 2 },
        end: { x: canvas.width / 2 - 100, y: canvas.height / 2 - 100 },
        duration: 2000,
        startTime: null
    }

    animation2 = {
        start : { x: canvas.width / 2 - 100, y: canvas.height / 2 - 100},
        end: { x: canvas.width / 2, y: canvas.height / 2 },
        duration: 2000,
        startTime: null
    }

    rect = {
        position: { x: 100, y: 50 },
        width: 200,
        height: 100
    }

    window.requestAnimationFrame(gameLoop);
});

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function gameLoop(time) {
    if(animation.startTime == null) animation.startTime = time;
    let elapsed;
    let t;

    if(check) {
        elapsed = time - animation.startTime;
        t = Math.min(elapsed / animation.duration, 1);
    } else {
        console.log("H")
        elapsed = time - animation2.startTime;
        t = Math.min(elapsed / animation2.duration, 1);
    }

    clearCanvas();
    
    t = easeInQuad(t);

    if(check) {
        rect.position.x = lerp(animation.start.x, animation.end.x, t) - 100;
        rect.position.y = lerp(animation.start.y, animation.end.y, t) - 50;
        rect.width = 200 + (animation.start.x - lerp(animation.start.x, animation.end.x, t)) * 2; 
        rect.height = 100 + (animation.start.y - lerp(animation.start.y, animation.end.y, t)) * 2;
    } else {
        rect.position.x = lerp(animation2.start.x, animation2.end.x, t) - 100;
        rect.position.y = lerp(animation2.start.y, animation2.end.y, t) - 50;
        rect.width = 400 - (lerp(animation2.start.x, animation2.end.x, t) - animation2.start.x) * 2; 
        rect.height = 300 - (lerp(animation2.start.y, animation2.end.y, t) - animation2.start.y ) * 2;
        console.log((lerp(animation2.start.x, animation2.end.x, t) - animation2.start.x) * 2)
    }


    if(rect.position.x == animation.end.x - 100) {
        check = false;
        animation2.startTime = time;
    } else if(rect.position.x == animation2.end.x - 100) {
        check = true;
        animation.startTime = time;
    }
    
    draw();

    window.requestAnimationFrame(gameLoop);
}

function easeInQuad(t) {
    return t * t;
}

function draw() {
    context.beginPath();
    context.fillStyle = 'gray';
    context.fillRect(rect.position.x, rect.position.y, rect.width, rect.height);
}

function clearCanvas() {
    context.beginPath();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}


