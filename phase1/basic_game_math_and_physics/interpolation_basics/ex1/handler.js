    let canvas;
    let context;
    const canvasWidth = window.screen.width * 1 / 3;
    const canvasHeight = window.screen.height * 2 / 3;

    window.addEventListener("DOMContentLoaded", () => {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    });

    let circle = {
        position: { x: 50, y: 200 },
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

    let animation = {
        start: { x: 50, y: 200 },
        end: { x: 500, y: 200 },
        duration: 2000,
        startTime: null
    };

    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    function animateCircle(time) {
        console.log(time)
        if (!animation.startTime) animation.startTime = time;
        const elapsed = time - animation.startTime;

        let t = Math.min(elapsed / animation.duration, 1);
        let k = t;
        let h = t;
        t = easeOutQuad(t);
        k = easeInOutQuad(k);
        h = easeInQuad(h);

        circle.position.x = lerp(animation.start.x, animation.end.x, t);
        circle.position.y = lerp(animation.start.y, animation.end.y, t);

        circle2.position.x = lerp(animation.start.x, animation.end.x, k);
        circle2.position.y = lerp(animation.start.y + 100, animation.end.y + 100, k);

        circle3.position.x = lerp(animation.start.x, animation.end.x, h);
        circle3.position.y = lerp(animation.start.y + 200, animation.end.y + 200, h);

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle(circle);
        drawCircle(circle2);
        drawCircle(circle3);

        if (t < 1) requestAnimationFrame(animateCircle);
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