let canvas1;
    let canvas2;
    let context1;
    let context2;

    const canvasWidth = window.screen.width * 1 / 3;
    const canvasHeight = window.screen.height * 2 / 3;

    window.addEventListener("DOMContentLoaded", () => {
        canvas1 = document.getElementById("canvas1");
        canvas2 = document.getElementById("canvas2");
        context1 = canvas1.getContext("2d");
        context2 = canvas2.getContext("2d");

        canvas1.width = canvasWidth;
        canvas1.height = canvasHeight;
        canvas2.width = canvasWidth;
        canvas2.height = canvasHeight;

        // Run practice1
        // window.requestAnimationFrame(gameLoop1);

        // // Run practice2
        createCircle();
        // window.requestAnimationFrame(gameLoop);

        // runPractice1();
        runPractice2();
    });

    function runPractice1() {
        window.requestAnimationFrame(gameLoop1);
    }

    function runPractice2() {
        window.requestAnimationFrame(gameLoop);
    }

    // Practice 1
    let ball = {
        position: { x: canvasWidth / 2, y: canvasHeight * 1 / 3 },
        veclocity: { x: 0, y: 0 },
        radius: 30,
        color: "gray"
    };

    let secondsPassed = 0;
    let oldTimeStamp = 0

    function clearCanvas1() {
        context1.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawBall() {
        clearCanvas1();
        context1.beginPath();
        context1.fillStyle = ball.color;
        context1.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
        context1.fill();
    }

    let gravity = 9.8;

    function gravity1() {
        ball.veclocity.y += gravity;
    }

    function update1(secondsPassed) {
        ball.position.x += ball.veclocity.x * secondsPassed;
        ball.position.y += ball.veclocity.y * secondsPassed;
    }

    function detectWall() {
        let expend = 0.8     ;
        if(ball.position.x < ball.radius) {
            ball.position.x = ball.radius;
            ball.veclocity.x = Math.abs(ball.veclocity.x) * expend;
        }
        if(ball.position.x > canvasWidth - ball.radius) {
            ball.position.x = canvasWidth - ball.radius;
            ball.veclocity.x = -Math.abs(ball.veclocity.x) * expend;
        }
        if(ball.position.y < ball.radius) {
            ball.position.y = ball.radius;
            ball.veclocity.y = Math.abs(ball.veclocity.y) * expend;
        }
        if(ball.position.y > canvasHeight - ball.radius) {
            ball.position.y = canvasHeight - ball.radius;
            ball.veclocity.y = -Math.abs(ball.veclocity.y) * expend;
        }
    }

    let speedJump = 500;

    function jumpBall() {
        ball.veclocity.y -= speedJump;
    }

    document.addEventListener("keydown", (event) => {
        if(event.key == " ") {
            jumpBall();
        }
    })

    function drawText() {
        context1.font = "25px Arial";
        context1.textAlign = "right";
        context1.textBaseline = "bottom";
        context1.fillStyle = "black";
        context1.fillText("Space to Jump", 200, 60);

        // context1.font = "17px Arial";
        // context1.textAlign = "center";
        // context1.textBaseline = "bottom";
        // context1.fillStyle = "Gray";
        // context1.fillText("Cancle comment in line 59 and command line 58", canvasWidth / 2, 80);
        // context1.fillText("in source code to run Practice 2", canvasWidth / 2, 100);
    }

    function drawText2() {
        // context2.font = "17px Arial";
        // context2.textAlign = "center";
        // context2.textBaseline = "bottom";
        // context2.fillStyle = "Gray";
        // context2.fillText("Cancle comment in line 58 and command line 59", canvasWidth / 2, 80);
        // context2.fillText("in source code to run Practice 1", canvasWidth / 2, 100);
    }

    function gameLoop1(timeStamp) {

        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        // console.log(1 / secondsPassed);
        gravity1();
        update1(secondsPassed);
        detectWall();
        drawBall();
        drawText();

        window.requestAnimationFrame(gameLoop1);
    }


    // Practice 2
    class GameObject {
        constructor(context, x, y, vx, vy) {
            this.context = context;
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;

            this.isColliding = false;
        }
    }

    class Circle extends GameObject {
        constructor(context, x, y, vx, vy, mass) {
            super(context, x, y, vx, vy);
            this.isColliding = false;
            this.mass = mass;
            this.r = mass;
        }

        draw() {
            context2.beginPath();
            context2.fillStyle = this.isColliding
                ? "#ff8080"
                : "#0099b0";
            context2.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            context2.fill();

            // context2.beginPath();
            // context2.moveTo(this.x, this.y);
            // context2.lineTo(this.x + this.vx, this.y + this.vy);
            // context2.stroke();
        }

        update(secondsPassed) {
            const g = 9.81;
            this.vy += g;
            this.x = this.x + this.vx * secondsPassed;
            this.y = this.y + this.vy * secondsPassed;
        }
    }

    function clearCanvas2() {
        context2.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    let listObjectCircle;

    function createCircle() {
        listObjectCircle = [
            new Circle(context2, 150, 100, 0, 50, 25),
            new Circle(context2, 250, 300, 0, -50, 20),
            new Circle(context2, 150, 0, 50, 50, 20),
            new Circle(context2, 250, 150, 50, 50, 20),
            new Circle(context2, 350, 75, -50, 50, 20),
            new Circle(context2, 300, 300, 50, -50, 30),
        ];

        console.log(listObjectCircle);
    }

    function gameLoop(timeStamp) {
        circleIntersect();
        detectEdgeCollisions();
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        for (let i = 0; i < listObjectCircle.length; i++) {
            listObjectCircle[i].update(secondsPassed);
        }

        clearCanvas2();

        for (let i = 0; i < listObjectCircle.length; i++) {
            listObjectCircle[i].draw();
        }
        drawText2();

        window.requestAnimationFrame(gameLoop);
    }

    function circleIntersect() {
        for (let i = 0; i < listObjectCircle.length; ++i) {
            listObjectCircle[i].isColliding = false;
        }

        for (let i = 0; i < listObjectCircle.length; ++i) {
            for (let j = i + 1; j < listObjectCircle.length; ++j) {
                let obj1 = listObjectCircle[i];
                let obj2 = listObjectCircle[j];
                let vCollision = {
                    x: obj2.x - obj1.x,
                    y: obj2.y - obj1.y,
                };
                let distance = Math.sqrt(
                    (obj2.x - obj1.x) * (obj2.x - obj1.x) +
                        (obj2.y - obj1.y) * (obj2.y - obj1.y)
                );
                let vCollisionNorm = {
                    x: vCollision.x / distance,
                    y: vCollision.y / distance,
                };
                let vRelativeVelocity = {
                    x: obj1.vx - obj2.vx,
                    y: obj1.vy - obj2.vy,
                };
                let speed =
                    vRelativeVelocity.x * vCollisionNorm.x +
                    vRelativeVelocity.y * vCollisionNorm.y;

                console.log(speed);

                // if (speed < 0) {
                //     break;
                // }

                if (distance < obj1.r + obj2.r) {
                    let overlap = obj1.r + obj2.r - distance;
                    obj1.x -= vCollisionNorm.x * (overlap / 2);
                    obj1.y -= vCollisionNorm.y * (overlap / 2);
                    obj2.x += vCollisionNorm.x * (overlap / 2);
                    obj2.y += vCollisionNorm.y * (overlap / 2);

                    let impulse = (2 * speed) / (obj1.mass + obj2.mass);
                    obj1.vx -= impulse * obj2.mass * vCollisionNorm.x;
                    obj1.vy -= impulse * obj2.mass * vCollisionNorm.y;
                    obj2.vx += impulse * obj1.mass * vCollisionNorm.x;
                    obj2.vy += impulse * obj1.mass * vCollisionNorm.y;
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                }
            }
        }
    }

    let restitution = 0.9;

    function detectEdgeCollisions() {
        let obj;
        for (let i = 0; i < listObjectCircle.length; i++) {
            obj = listObjectCircle[i];

            // Check for left and right
            if (obj.x < obj.r) {
                obj.vx = Math.abs(obj.vx) * restitution;
                obj.x = obj.r;
            } else if (obj.x > canvasWidth - obj.r) {
                obj.vx = -Math.abs(obj.vx) * restitution;
                obj.x = canvasWidth - obj.r;
            }

            // Check for bottom and top
            if (obj.y < obj.r) {
                obj.vy = Math.abs(obj.vy) * restitution;
                obj.y = obj.r;
            } else if (obj.y > canvasHeight - obj.r) {
                obj.vy = -Math.abs(obj.vy) * restitution;
                obj.y = canvasHeight - obj.r;
            }
        }
    }