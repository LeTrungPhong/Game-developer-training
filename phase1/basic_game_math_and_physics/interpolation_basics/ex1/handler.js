    let canvas;
    let context;
    const canvasWidth = window.screen.width * 1 / 3;
    const canvasHeight = window.screen.height * 2 / 3;
    let check = true;
    const positionX = 100;
    let positionY = 200;

    window.addEventListener("DOMContentLoaded", () => {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        animation = {
            start: { x: positionX, y: canvasHeight / 2 },
            end: { x: canvas.width - positionX, y: canvas.height / 2 },
            duration: 2000,
            startTime: null
        };
        animation1 = {
            start: { x: canvas.width - positionX, y: canvasHeight / 2 },
            end: { x: positionX, y: canvasHeight / 2 },
            duration: 2000,
            startTime: null
        }
    });

    let circle = {
        position: { x: 0, y: 200 },
        radius: 20,
        color: "blue"
    };

    let circle2 = {
        position: { x: 50, y: 400 },
        radius: 20,
        color: "blue"
    }

    let circle3 = {
        position: { x: 50, y: 400 },
        radius: 20,
        color: "blue"
    }

    let animation;
    let animation1;

    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    function animateCircle(time) {
        if (!animation.startTime) animation.startTime = time;
        let elapsed;
        if(check) {
            elapsed = time - animation.startTime;
        } else {
            elapsed = time - animation1.startTime;
        }

        let t = Math.min(elapsed / animation.duration, 1);
        let k = t;
        let h = t;
        t = easeOutQuad(t);
        k = easeInOutQuad(k);
        h = easeInQuad(h);

        if(check) {
            circle.position.x = lerp(animation.start.x, animation.end.x, t);
            circle.position.y = lerp(animation.start.y - 100, animation.end.y - 100, t);
    
            circle2.position.x = lerp(animation.start.x, animation.end.x, k);
            circle2.position.y = lerp(animation.start.y, animation.end.y, k);
    
            circle3.position.x = lerp(animation.start.x, animation.end.x, h);
            circle3.position.y = lerp(animation.start.y + 100, animation.end.y + 100, h);
        } else {
            circle.position.x = lerp(animation1.start.x, animation1.end.x, t);
            circle.position.y = lerp(animation1.start.y - 100, animation1.end.y - 100, t);

            circle2.position.x = lerp(animation1.start.x, animation1.end.x, k);
            circle2.position.y = lerp(animation1.start.y, animation1.end.y, k);

            circle3.position.x = lerp(animation1.start.x, animation1.end.x, h);
            circle3.position.y = lerp(animation1.start.y + 100, animation1.end.y + 100, h);
        }

        if(circle.position.x == canvas.width - positionX) {
            check = false;
            animation1.startTime = time;
        } else if(circle.position.x == positionX){
            check = true;
            animation.startTime = time;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle(circle);
        drawCircle(circle2);
        drawCircle(circle3);



        requestAnimationFrame(animateCircle);
    }

    function drawCircle({ position, radius, color }) {
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
    }

    function easeOutQuad(t) {
        return t * (2 - t); 
    }

    // Practice 1
    function easeInOutQuad(t) {
        return t * t * (3.0 - 2.0 * t);
    }

    function easeInQuad(t) {
        return t * t;
    }


    requestAnimationFrame(animateCircle);