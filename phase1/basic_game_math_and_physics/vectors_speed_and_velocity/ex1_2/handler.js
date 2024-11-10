let canvas;
    let context;
    const canvasWidth = 750;
    const canvasHeight = 500;

    window.addEventListener("DOMContentLoaded",() => {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        createListCircle();
        createCircleP3();

        runPractice2();
        // runPractice3();
    });

    function runPractice2() {
        window.requestAnimationFrame(gameLoop);
    }

    function runPractice3() {
        window.requestAnimationFrame(gameLoopPractice3);
    }


    // Practice 1
    class Vector {
        static addVectors(v1, v2) {
            return { x: v1.x + v2.x, y: v1.y + v2.y }
        }

        static subVectors(v1, v2) {
            return { x: v1.x - v2.x, y: v1.y - v2.y }
        }

        static mulVectors(v, scalar) {
            return { x: v.x * scalar, y: v.y * scalar }
        }

        static magnitude(v) {
            return Math.sqrt(v.x * v.x + v.y * v.y)
        }
    }

    // Practice 2
    class GameObject {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
        }
    }

    class Circle extends GameObject {
        constructor(x, y, vx, vy, r) {
            super(x, y, vx, vy);
            this.radius = r;
            this.mass = this.radius;
        }

        draw() {
            context.beginPath();
            context.fillStyle = 'grey';
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        }

        update(secondsPassed) {
            this.x = this.x + this.vx * secondsPassed;
            this.y = this.y + this.vy * secondsPassed;
        }
    }

    let listCircle;

    function createListCircle() {
        listCircle = [
            new Circle(100, 50, 30, 20, 20),
            new Circle(50, 100, -40, 50, 25),
            new Circle(200, 100, 60, 20, 10),
            new Circle(100, 200, -50, -60, 18),
            new Circle(300, 400, 10, 80, 20)
        ];
    }

    function clearCanvas() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    let secondsPassed = 0;
    let oldTimeStamp = 0;

    function gameLoop(timeStamp) {

        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        clearCanvas();

        for(let i = 0; i < listCircle.length; ++i) {
            listCircle[i].update(secondsPassed);
            listCircle[i].draw();
        }

        drawText();

        window.requestAnimationFrame(gameLoop);
    }


    // Practice 3
    class CircleRemote extends GameObject {
        constructor(x, y, vx, vy, r, speed) {
            super(x, y, vx, vy);
            this.radius = r;
            this.speed = speed;
        }

        draw() {
            context.beginPath();
            context.fillStyle = 'grey';
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        }

        update(secondsPassed) {
            this.x = this.x + this.vx * secondsPassed;
            this.y = this.y + this.vy * secondsPassed;
        }

        detectWall() {
            if(this.x < this.radius) {
                this.x = this.radius;
            }
            if(this.x > canvasWidth - this.radius) {
                this.x = canvasWidth - this.radius;
            }
            if(this.y < this.radius) {
                this.y = this.radius;
            }
            if(this.y > canvasHeight - this.radius) {
                this.y = canvasHeight - this.radius;
            }
        }   
    }

    function drawText() {
        context.beginPath();
        context.font = "24px Arial";
        context.textAlign = "center";
        context.textBaseLine = "center";
        context.fillStyle = "gray";
        context.fillText("Cancle comment line 29 and comment line 28 to run Practice 3", canvasWidth / 2, 80);
    }

    let circleRemote;

    function createCircleP3() {
        circleRemote = new CircleRemote(canvasWidth / 2, canvasHeight / 2, 0, 0, 20, 100);
    }

    function gameLoopPractice3(timeStamp) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        clearCanvas();

        circleRemote.update(secondsPassed);
        circleRemote.detectWall();
        circleRemote.draw();
        drawText();

        window.requestAnimationFrame(gameLoopPractice3);
    }

    document.addEventListener("keydown", (event) => {
        console.log(event.key);

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

    document.addEventListener("keyup", (event) => {
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
    })