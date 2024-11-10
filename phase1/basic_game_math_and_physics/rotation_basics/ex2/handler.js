let canvas;
    let context;
    const canvasWidth = window.screen.width * 4 / 5;
    const canvasHeight = window.screen.height * 4 / 5;

    window.addEventListener("DOMContentLoaded", () => {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        createObject();

        // window.requestAnimationFrame(gameLoop);
        window.requestAnimationFrame(gameLoop2);
        startEventMouseMove();
        // window.requestAnimationFrame(gameLoop3);
    });

    let rectangle = {
        position: { x: 300, y: 200 },
        width: 100,
        height: 50,
        rotation: 0
    };

    function drawRotatedRectangle(rect) {
        context.save(); 

        context.translate(rect.position.x, rect.position.y);

        context.rotate(rect.rotation);

        context.fillStyle = "green";
        context.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);

        context.restore();
    }

    function updateRotation(rect, speed) {
        rect.rotation += speed; 
    }

    // Practice 1
    class GameObject {
        constructor(x, y, vx, vy, speedRotate) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.speedRotate = speedRotate;
            this.rotation = 0;
        }
    }

    class Rectangle extends GameObject {
        constructor(x, y, vx, vy, speedRotate, width, height) {
            super(x, y, vx, vy, speedRotate, width, height);
            this.width = width;
            this.height = height;
        }

        draw() {
            context.save();
            context.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            context.translate(this.x, this.y);
            context.rotate(this.rotation);
            context.fillRect(- this.width / 2, - this.height / 2, this.width, this.height);
            context.fill();
            context.restore();
        }

        update(secondsPassed) {
            this.x = this.x + this.vx * secondsPassed;
            this.y = this.y + this.vy * secondsPassed;
            this.rotation += this.speedRotate;
        }
    }

    let listRetangle;

    function createObject() {
        listRetangle = [
            new Rectangle(1000, 200, 0, 0, 0.05, 100, 200),
            new Rectangle(600, 300, 0, 0, 0.02, 100, 100),
            new Rectangle(400, 500, 0, 0, 0.01, 200, 200),
            new Rectangle(1300, 300, 0, 0, 0.03, 150, 300)
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

        for(let i = 0; i < listRetangle.length; ++i) {
            listRetangle[i].update(timeStamp);
            listRetangle[i].draw();
        }

        requestAnimationFrame(gameLoop); 
    }

    // Practice 2
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

    function gameLoop2(timeStamp) {

        clearCanvas();
        
        drawOclock();

        window.requestAnimationFrame(gameLoop2);
    }

    // Practice 3

    let rectangleP3 = {
        x: localeCenter.x,
        y: localeCenter.y,
        width: 20,
        height: 100,
        rotation: 0,
        draw() {

            context.beginPath();
            context.save();
            context.translate(rectangleP3.x, rectangleP3.y);
            context.rotate(rectangleP3.rotation);
            context.fillStyle = 'green';
            context.fillRect(-rectangleP3.width / 2, -rectangleP3.height / 2, rectangleP3.width, rectangleP3.height);
            context.fill();
            context.restore();
        }
    }

    function gameLoop3(timeStamp) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;

        clearCanvas();

        rectangleP3.draw();

        window.requestAnimationFrame(gameLoop3);
    }

    function startEventMouseMove() {
        canvas.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left - rectangleP3.x;  
            let mouseY = event.clientY - rect.top - rectangleP3.y;

            let conner = 0;

            if((mouseX > 0 && mouseY > 0) || (mouseX < 0 && mouseY < 0)) {
                conner = Math.atan2(Math.sqrt((mouseY) * (mouseY)), Math.sqrt((mouseX) * (mouseX))) + Math.PI / 2;
            } else {
                conner = Math.atan2(Math.sqrt((mouseX) * (mouseX)), Math.sqrt((mouseY) * (mouseY)));
            }
            console.log(conner);
            rectangleP3.rotation = conner;
        });
    }