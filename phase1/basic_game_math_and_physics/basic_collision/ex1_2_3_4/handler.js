let canvas;
let context;
let canvasWidth = window.screen.width * 1 / 3;
let canvasHeight = window.screen.height * 2 / 3;
let expend = 0.9;
const sizeRow = 10;
const sizeColumn = 10;
let cellWidth;
let cellHeight;
let grid;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    canvasWidth = sizeColumn * Math.floor(canvasWidth / sizeColumn);
    canvasHeight = sizeRow * Math.floor(canvasHeight / sizeRow);

    cellWidth = canvasWidth / sizeColumn;
    cellHeight = canvasHeight / sizeRow;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    createObject();
    createGrid();

    window.requestAnimationFrame(gameLoop);
    // window.requestAnimationFrame(gameLoop4);
});

class Vector {
    static sub(v1, v2) {
        return { x: v1.x - v2.x, y: v1.y - v2.y };
    }

    static normalize(v, number) {
        return { x: v.x / number, y: v.y / number };
    }

    static mul(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static distance(v1, v2) {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    }
}

class GameObject {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.isCollosion = false;
    }
}

class Circle extends GameObject {
    constructor(x, y, vx, vy, radius, id) {
        super(x, y, vx, vy);
        this.radius = radius;
        this.mass = this.radius * this.radius;
        this.type = 1;
        this.id = id;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.isCollosion ? 'red' : 'gray';
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        this.isCollosion = false;
    }

    update(secondsPassed) {
        this.x = this.x + this.vx * secondsPassed;
        this.y = this.y + this.vy * secondsPassed;
    }

    static detectWall(obj) {
        if(obj.x < obj.radius) {
            obj.x = obj.radius;
            obj.vx = Math.abs(obj.vx) * expend;
        }
        if(obj.x > canvasWidth - obj.radius) {
            obj.x = canvasWidth- obj.radius;
            obj.vx = -Math.abs(obj.vx) * expend;
        }
        if(obj.y < obj.radius) {
            obj.y = obj.radius;
            obj.vy = Math.abs(obj.vy) * expend;
        }
        if(obj.y > canvasHeight - obj.radius) {
            obj.y = canvasHeight - obj.radius;
            obj.vy = -Math.abs(obj.vy) * expend;
        }
    }

    static detectCollision(obj1, obj2) {
        let distance = Vector.distance(obj1, obj2);
        let vectorDirection = Vector.sub({ x: obj2.x, y: obj2.y }, { x: obj1.x, y: obj1.y });
        let vectorDirectionNorm = Vector.normalize(vectorDirection, distance);
        let vectorV = Vector.sub({ x: obj1.vx, y: obj1.vy }, { x: obj2.vx, y: obj2.vy });
        let speed = Vector.mul(vectorV, vectorDirectionNorm);

        if(distance <= obj1.radius + obj2.radius) {
            let overlap = (obj1.radius + obj2.radius - distance) / 2;
            obj1.x -= overlap * vectorDirectionNorm.x;
            obj1.y -= overlap * vectorDirectionNorm.y;
            obj2.x += overlap * vectorDirectionNorm.x;
            obj2.y += overlap * vectorDirectionNorm.y;
            let impluse = (2 * speed) / (obj1.mass + obj2.mass);
            obj1.vx -= impluse * obj2.mass * vectorDirectionNorm.x;
            obj1.vy -= impluse * obj2.mass * vectorDirectionNorm.y;
            obj2.vx += impluse * obj1.mass * vectorDirectionNorm.x;
            obj2.vy += impluse * obj1.mass * vectorDirectionNorm.y;
            obj1.isCollosion = true;
            obj2.isCollosion = true;
        }
    }
}

class Rectangle extends GameObject {
    constructor(x, y, vx, vy, width, height, id) {
        super(x, y, vx, vy);
        this.width = width;
        this.height = height;
        this.mass = this.width * this.height;
        this.type = 2;
        this.id = id;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.isCollosion ? 'red' : 'gray';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fill();
        this.isCollosion = false;
    }

    update(secondsPassed) {
        this.x = this.x + this.vx * secondsPassed;
        this.y = this.y + this.vy * secondsPassed;
    }

    static detectWall(obj) {
        if(obj.x < 0) {
            obj.x = 0;
            obj.vx = Math.abs(obj.vx) * expend;
        }
        if(obj.x > canvasWidth - obj.width) {
            obj.x = canvasWidth - obj.width;
            obj.vx = -Math.abs(obj.vx) * expend;
        }
        if(obj.y < 0) {
            obj.y = 0;
            obj.vy = Math.abs(obj.vy) * expend;
        }
        if(obj.y > canvasHeight - obj.height) {
            obj.y = canvasHeight - obj.height;
            obj.vy = -Math.abs(obj.vy) * expend;
        }
    }

    static detectCollision(obj1, obj2) {
        let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
        let vectorDirection = Vector.sub({ x: obj2.x, y: obj2.y }, { x: obj1.x, y: obj1.y });
        let vectorDirectionNorm = Vector.normalize(vectorDirection, distance);
        let vectorV = Vector.sub({ x: obj1.vx, y: obj1.vy }, { x: obj2.vx, y: obj2.vy });
        let speed = Vector.mul(vectorV, vectorDirectionNorm);

        if(obj2.x < obj1.x + obj1.width && obj1.x < obj2.x + obj2.width && obj2.y < obj1.height + obj1.y && obj1.y < obj2.height + obj2.y) {
            let impluse = (2 * speed) / (obj1.mass + obj2.mass);
            obj1.vx -= impluse * obj2.mass * vectorDirectionNorm.x;
            obj1.vy -= impluse * obj2.mass * vectorDirectionNorm.y;
            obj2.vx += impluse * obj1.mass * vectorDirectionNorm.x;
            obj2.vy += impluse * obj1.mass * vectorDirectionNorm.y;
            obj1.isCollosion = true;
            obj2.isCollosion = true;

            if(obj1.x < obj2.x && obj1.y < obj2.y) {
                let overlapX = obj1.x + obj1.width - obj2.x;
                let overlapY = obj1.y + obj1.height - obj2.y;
                if(overlapX < overlapY) {
                    obj2.x += overlapX;
                    obj1.x -= overlapX;
                } else {
                    obj2.y += overlapY;
                    obj1.y -= overlapY;
                }
            } else if(obj1.x > obj2.x && obj1.y < obj2.y) {
                let overlapX = obj2.x + obj2.width - obj1.x;
                let overlapY = obj1.y + obj1.height - obj2.y;
                if(overlapX < overlapY) {
                    obj2.x -= overlapX;
                    obj1.x += overlapX;
                } else {
                    obj2.y += overlapY;
                    obj1.y -= overlapY;
                }
            } else if(obj1.x < obj2.x && obj1.y > obj2.y) {
                let overlapX = obj1.x + obj1.width - obj2.x;
                let overlapY = obj2.y + obj2.height - obj1.y;
                if(overlapX < overlapY) {
                    obj2.x += overlapX;
                    obj1.x -= overlapX;
                } else {
                    obj2.y -= overlapY;
                    obj1.y += overlapY;
                }
            } else if(obj1.x > obj2.x && obj1.y > obj2.y) {
                let overlapX = obj2.x + obj2.width - obj1.x;
                let overlapY = obj2.y + obj2.height - obj1.y;
                if(overlapX < overlapY) {
                    obj2.x -= overlapX;
                    obj1.x += overlapX;
                } else {
                    obj2.y -= overlapY;
                    obj1.y += overlapY;
                }
            }
        }
    }
}

function detectCollisionOfCircleAndRectangle(rectangle, circle) {
    let localeN = { x: 0, y: 0};
    localeN.x = Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));
    localeN.y = Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));

    if(Vector.distance(localeN, circle) < circle.radius) {
        let vectorDirection = Vector.sub(circle, localeN);
        let distance = Vector.distance(circle, localeN);
        let vectorDirectionNorm = Vector.normalize(vectorDirection, distance);
        let vectorV = Vector.sub({ x: circle.vx, y: circle.vy }, { x: rectangle.vx, y: rectangle.vy });
        let speed = Vector.mul(vectorV, vectorDirectionNorm);
       
        let impluse = (2 * speed) / (rectangle.mass + circle.mass);
        circle.vx -= impluse * rectangle.mass * vectorDirectionNorm.x;
        circle.vy -= impluse * rectangle.mass * vectorDirectionNorm.y;
        rectangle.vx += impluse * circle.mass * vectorDirectionNorm.x;
        rectangle.vy += impluse * circle.mass * vectorDirectionNorm.y;

        let overlap = circle.radius - distance;
        circle.x += overlap * vectorDirectionNorm.x;
        circle.y += overlap * vectorDirectionNorm.y;
        rectangle.x -= overlap  * vectorDirectionNorm.x;
        rectangle.y -= overlap * vectorDirectionNorm.y;
        rectangle.isCollosion = true;
        circle.isCollosion = true;
    }
}

let listCircle;
let listRetangle;

function createObject() {
    listCircle = [
        new Circle(100, 200, -300, -40, 20, 1),
        new Circle(400, 100, 60, 20, 24, 2),
        new Circle(300, 400, 30, -20, 20, 3)
    ];

    listRetangle = [
        new Rectangle(150, 350, -1000, -10, 40, 35, 1),
        new Rectangle(350, 250, -1000, 600, 35, 30, 2),
        new Rectangle(450, 500, -500, -30, 30, 40, 3)
    ];
}

function drawObject() {
    for(let i = 0; i < listCircle.length; ++i) {
        listCircle[i].draw();
    }
    for(let i = 0; i < listRetangle.length; ++i) {
        listRetangle[i].draw();
    }
}

function updateObject(secondsPassed) {
    for(let i = 0; i < listCircle.length; ++i) {
        listCircle[i].update(secondsPassed);
    }
    for(let i = 0; i < listRetangle.length; ++i) {
        listRetangle[i].update(secondsPassed);
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function detectWallByForceBrute() {
    for(let i = 0; i < listCircle.length; ++i) {
        Circle.detectWall(listCircle[i]);
    }
    for(let i = 0; i < listRetangle.length; ++i) {
        Rectangle.detectWall(listRetangle[i]);
    }
}

function detectCollisionByForceBrute() {
    for(let i = 0; i < listCircle.length; ++i) {
        for(let j = i + 1; j < listCircle.length; ++j) {
            let obj1 = listCircle[i];
            let obj2 = listCircle[j];
            Circle.detectCollision(obj1, obj2);
        }
    }

    for(let i = 0; i < listRetangle.length; ++i) {
        for(let j = i + 1; j < listRetangle.length; ++j) {
            let obj1 = listRetangle[i];
            let obj2 = listRetangle[j];
            Rectangle.detectCollision(obj1, obj2);
        }
    }

    for(let i = 0; i < listCircle.length; ++i) {
        for(let j = 0; j < listRetangle.length; ++j) {
            let obj1 = listCircle[i];
            let obj2 = listRetangle[j];
            detectCollisionOfCircleAndRectangle(obj2, obj1);
        }
    }
}

// Grid ------------------------------------------------------------

function createGrid() {
    grid = Array.from({ length: sizeRow }, () => 
        Array.from({ length: sizeColumn }, () => [])
    );
};

function drawGrid() {
    for(let i = 0; i < grid.length; ++i) {
        for(let j = 0; j < grid[i].length; ++j) {
            const sizeItemGrid = grid[i][j].length;
            const changeColor = 20;
            context.beginPath();
            context.fillStyle = `rgb(${255 - sizeItemGrid * changeColor}, ${255 - sizeItemGrid * changeColor}, ${255 - sizeItemGrid * changeColor})`;
            context.strokeStyle = 'gray';
            context.strokeRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            context.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
            context.fill();
        }
    }
}

function resetGrid() {
    for(let i = 0; i < grid.length; ++i) {
        for(let j = 0; j < grid[i].length; ++j) {
            grid[i][j] = [];
        }
    }
}

function widePhaseCircle(obj, indexRow, indexColumn) {

    let locale00 = { x: cellWidth * indexColumn, y: cellHeight * indexRow };
    let locale10 = { x: cellWidth * (indexColumn + 1), y: cellHeight * indexRow };
    let locale01 = { x: cellWidth * indexColumn, y: cellHeight * (indexRow + 1) };
    let locale11 = { x: cellWidth * (indexColumn + 1), y: cellHeight * (indexRow + 1) };

    let check00 = false;
    let check01 = false;
    let check10 = false;
    let check11 = false;

    let inforObject = { type: obj.type, id: obj.id };

    if(Math.sqrt((locale00.x - obj.x) * (locale00.x - obj.x) + (locale00.y - obj.y) * (locale00.y - obj.y)) < obj.radius) {
        indexRow - 1 >= 0 && indexColumn - 1 >=0 ? grid[indexRow - 1][indexColumn - 1].push(inforObject) : true;
        indexColumn - 1 >=0 ? grid[indexRow][indexColumn - 1].push(inforObject) : true;
        indexRow - 1 >= 0 ? grid[indexRow - 1][indexColumn].push(inforObject) : true;
        check00 = true;
    }

    if(Math.sqrt((locale01.x - obj.x) * (locale01.x - obj.x) + (locale01.y - obj.y) * (locale01.y - obj.y)) < obj.radius) {
        indexColumn - 1 >=0 ? grid[indexRow][indexColumn - 1].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 && indexColumn - 1 >=0 ? grid[indexRow + 1][indexColumn - 1].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 ? grid[indexRow + 1][indexColumn].push(inforObject) : true;
        check01 = true;
    }

    if(Math.sqrt((locale10.x - obj.x) * (locale10.x - obj.x) + (locale10.y - obj.y) * (locale10.y - obj.y)) < obj.radius) {
        indexRow - 1 >= 0 ? grid[indexRow - 1][indexColumn].push(inforObject) : true;
        indexRow - 1 >= 0 && indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow - 1][indexColumn + 1].push(inforObject) : true;
        indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow][indexColumn + 1].push(inforObject) : true;
        check10 = true;
    }

    if(Math.sqrt((locale11.x - obj.x) * (locale11.x - obj.x) + (locale11.y - obj.y) * (locale11.y - obj.y)) < obj.radius) {
        indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow][indexColumn + 1].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 ? grid[indexRow + 1][indexColumn].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 && indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow + 1][indexColumn + 1].push(inforObject) : true;
        check11 = true;
    }

    if(!check00 && !check10) {
        // y = 0

        if(obj.y - locale00.y < obj.radius) {
            indexRow - 1 >= 0 ? grid[indexRow - 1][indexColumn].push(inforObject) : true;
        }
    }

    if(!check01 && !check00) {
        // x = 0

        if(obj.x - locale00.x < obj.radius) {
            indexColumn - 1 >= 0 ? grid[indexRow][indexColumn - 1].push(inforObject) : true;
        }
    }

    if(!check10 && !check11) {
        // x = 1

        if(obj.x > locale11.x - obj.radius) {
            indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow][indexColumn + 1].push(inforObject) : true;
        }
    }

    if(!check01 && !check11) {
        // y = 1

        if(obj.y > locale11.y - obj.radius) {
            indexRow + 1 <= sizeRow - 1 ? grid[indexRow + 1][indexColumn].push(inforObject) : true;
        }
    }

    grid[indexRow][indexColumn].push(inforObject);
}

function widePhaseRectangle(obj, indexColumn, indexRow, centerX, centerY) {

    let locale00 = { x: cellWidth * indexColumn, y: cellHeight * indexRow };
    let locale10 = { x: cellWidth * (indexColumn + 1), y: cellHeight * indexRow };
    let locale01 = { x: cellWidth * indexColumn, y: cellHeight * (indexRow + 1) };
    let locale11 = { x: cellWidth * (indexColumn + 1), y: cellHeight * (indexRow + 1) };

    let check00 = false;
    let check01 = false;
    let check10 = false;
    let check11 = false;

    let inforObject = { type:obj.type, id: obj.id };

    if(Math.sqrt((locale00.x - centerX) * (locale00.x - centerX) + (locale00.y - centerY) * (locale00.y - centerY)) < Math.sqrt((obj.x - centerX) * (obj.x - centerX) + (obj.y - centerY) * (obj.y - centerY))) {
        indexRow - 1 >= 0 && indexColumn - 1 >=0 ? grid[indexRow - 1][indexColumn - 1].push(inforObject) : true;
        indexColumn - 1 >=0 ? grid[indexRow][indexColumn - 1].push(inforObject) : true;
        indexRow - 1 >= 0 ? grid[indexRow - 1][indexColumn].push(inforObject) : true;
        check00 = true;
    }

    if(Math.sqrt((locale01.x - centerX) * (locale01.x - centerX) + (locale01.y - centerY) * (locale01.y - centerY)) < Math.sqrt((obj.x - centerX) * (obj.x - centerX) + (obj.y - centerY) * (obj.y - centerY))) {
        indexColumn - 1 >=0 ? grid[indexRow][indexColumn - 1].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 && indexColumn - 1 >=0 ? grid[indexRow + 1][indexColumn - 1].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 ? grid[indexRow + 1][indexColumn].push(inforObject) : true;
        check01 = true;
    }

    if(Math.sqrt((locale10.x - centerX) * (locale10.x - centerX) + (locale10.y - centerY) * (locale10.y - centerY)) < Math.sqrt((obj.x - centerX) * (obj.x - centerX) + (obj.y - centerY) * (obj.y - centerY))) {
        indexRow - 1 >= 0 ? grid[indexRow - 1][indexColumn].push(inforObject) : true;
        indexRow - 1 >= 0 && indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow - 1][indexColumn + 1].push(inforObject) : true;
        indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow][indexColumn + 1].push(inforObject) : true;
        check10 = true;
    }

    if(Math.sqrt((locale11.x - centerX) * (locale11.x - centerX) + (locale11.y - centerY) * (locale11.y - centerY)) < Math.sqrt((obj.x - centerX) * (obj.x - centerX) + (obj.y - centerY) * (obj.y - centerY))) {
        indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow][indexColumn + 1].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 ? grid[indexRow + 1][indexColumn].push(inforObject) : true;
        indexRow + 1 <= sizeRow - 1 && indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow + 1][indexColumn + 1].push(inforObject) : true;
        check11 = true;
    }

    if(!check00 && !check10) {
        // y = 0

        if(centerY - locale00.y < obj.height / 2) {
            indexRow - 1 >= 0 ? grid[indexRow - 1][indexColumn].push(inforObject) : true;
        }
    }

    if(!check01 && !check00) {
        // x = 0

        if(centerX - locale00.x < obj.width / 2) {
            indexColumn - 1 >= 0 ? grid[indexRow][indexColumn - 1].push(inforObject) : true;
        }
    }

    if(!check10 && !check11) {
        // x = 1

        if(centerX > locale11.x - obj.width / 2) {
            indexColumn + 1 <= sizeColumn - 1 ? grid[indexRow][indexColumn + 1].push(inforObject) : true;
        }
    }

    if(!check01 && !check11) {
        // y = 1

        if(centerY > locale11.y - obj.height / 2) {
            indexRow + 1 <= sizeRow - 1 ? grid[indexRow + 1][indexColumn].push(inforObject) : true;
        }
    }

    grid[indexRow][indexColumn].push(inforObject);
}

function updateGrid() {
    for(let i = 0; i < listCircle.length; ++i) {
        let obj = listCircle[i];
        const indexColumn = Math.floor(obj.x / cellWidth);
        const indexRow = Math.floor(obj.y / cellHeight);

        // console.log(`x: ${obj.x}, y: ${obj.y}`);
        // console.log(`indexR: ${indexRow}, indexC: ${indexColumn}`)

        // console.log(obj);
        widePhaseCircle(obj, indexRow, indexColumn);
    }

    for(let i = 0; i < listRetangle.length; ++i) {
        let obj = listRetangle[i];
        const centerX = obj.x + obj.width / 2;
        const centerY = obj.y + obj.height / 2;

        const indexColumn = Math.floor(centerX / cellWidth);
        const indexRow = Math.floor(centerY / cellHeight);

        // console.log(obj);
        widePhaseRectangle(obj, indexColumn, indexRow, centerX, centerY);
    }
}

function detectWallBySimpleSpatialGrid() {
    let i = 0;
    let expent = 0.9;
    for(let j = 0; j < grid[i].length; ++j) {
        const count = grid[i][j].length;
        if(count != 0) {
            for(let k = 0; k < grid[i][j].length; ++k) {
                let object = grid[i][j][k];
                if(object.type == 1) {
                    for(let h = 0; h < listCircle.length; ++h) {
                        if(object.id == listCircle[h].id) {
                            Circle.detectWall(listCircle[h]);
                            break;
                        }
                    }
                } else if(object.type == 2) {
                    for(let h = 0; h < listRetangle.length; ++h) {
                        if(object.id == listRetangle[h].id) {
                            Rectangle.detectWall(listRetangle[h]);
                            break;
                        }
                    }
                }
            }
        }
    }

    i = grid.length - 1;
    for(let j = 0; j < grid[i].length; ++j) {
        const count = grid[i][j].length;
        if(count != 0) {
            for(let k = 0; k < grid[i][j].length; ++k) {
                let object = grid[i][j][k];
                if(object.type == 1) {
                    for(let h = 0; h < listCircle.length; ++h) {
                        if(object.id == listCircle[h].id) {
                            Circle.detectWall(listCircle[h]);
                            break;
                        }
                    }
                } else if(object.type == 2) {
                    for(let h = 0; h < listRetangle.length; ++h) {
                        if(object.id == listRetangle[h].id) {
                            Rectangle.detectWall(listRetangle[h]);
                            break;
                        }
                    }
                }
            }
        }
    }

    let j = 0;
    for(let i = 0; i < grid.length; ++i) {
        const count = grid[i][j].length;
        if(count != 0) {
            for(let k = 0; k < grid[i][j].length; ++k) {
                let object = grid[i][j][k];
                if(object.type == 1) {
                    for(let h = 0; h < listCircle.length; ++h) {
                        if(object.id == listCircle[h].id) {
                            Circle.detectWall(listCircle[h]);
                            break;
                        }
                    }
                } else if(object.type == 2) {
                    for(let h = 0; h < listRetangle.length; ++h) {
                        if(object.id == listRetangle[h].id) {
                            Rectangle.detectWall(listRetangle[h]);
                            break;
                        }
                    }
                }
            }
        }
    }

    j = grid[i].length - 1;
    for(let i = 0; i < grid.length; ++i) {
        const count = grid[i][j].length;
        if(count != 0) {
            for(let k = 0; k < grid[i][j].length; ++k) {
                let object = grid[i][j][k];
                if(object.type == 1) {
                    for(let h = 0; h < listCircle.length; ++h) {
                        if(object.id == listCircle[h].id) {
                            Circle.detectWall(listCircle[h]);
                            break;
                        }
                    }
                } else if(object.type == 2) {
                    for(let h = 0; h < listRetangle.length; ++h) {
                        if(object.id == listRetangle[h].id) {
                            Rectangle.detectWall(listRetangle[h]);
                            break;
                        }
                    }
                }
            }
        }
    }
}

function detectCollisionBySimpleSpatialGrid() {
    for(let i = 0; i < grid.length; ++i) {
        for(let j = 0; j < grid[i].length; ++j) {
            if(grid[i][j].length > 1) {

                for(let k = 0; k < grid[i][j].length; ++k) {
                    for(let h = k + 1; h < grid[i][j].length; ++h) {
                        let obj1 = grid[i][j][k];
                        let obj2 = grid[i][j][h];
                        let obj1Real;
                        let obj2Real;
                        for(let t = 0; t < listCircle.length; ++t) {
                            if(listCircle[t].id == obj1.id && obj1.type == 1) {
                                obj1Real = listCircle[t];
                            } else if(listCircle[t].id == obj2.id && obj2.type == 1) {
                                obj2Real = listCircle[t];
                            }
                        }
                        for(let t = 0; t < listRetangle.length; ++t) {
                            if(listRetangle[t].id == obj1.id && obj1.type == 2) {
                                obj1Real = listRetangle[t];
                            } else if(listRetangle[t].id == obj2.id && obj2.type == 2) {
                                obj2Real = listRetangle[t];
                            }
                        }
                        if(obj1Real == null || obj2Real == null) {
                            break;
                        }
                        if(obj1Real.type == 1 && obj2Real.type == 1) {
                            Circle.detectCollision(obj1Real, obj2Real);
                        } else if(obj1Real.type == 2 && obj2Real.type == 2) {
                            Rectangle.detectCollision(obj1Real, obj2Real);
                        } else if(obj1Real.type == 1 && obj2Real.type == 2) {
                            detectCollisionOfCircleAndRectangle(obj2Real, obj1Real);
                        } else if(obj1Real.type == 2 && obj2Real.type == 1) {
                            detectCollisionOfCircleAndRectangle(obj1Real, obj2Real);
                        }
                    }
                }

            }
        }
    }
}

function drawText() {
   
}

let secondsPassed = 0;
let oldTimeStamp = 0;
function gameLoop(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    console.log(1 / secondsPassed);

    clearCanvas();

    drawGrid();
    drawObject();
    drawText();

    // detectWallByForceBrute();
    // detectCollisionByForceBrute();

    detectWallBySimpleSpatialGrid();
    detectCollisionBySimpleSpatialGrid();

    resetGrid();
    updateGrid();
    updateObject(secondsPassed);

    window.requestAnimationFrame(gameLoop);
}



// Practice 4

let wall = {
    x: canvasWidth * 3 / 5,
    y: canvasHeight * 1 / 5,
    width: 1,
    height: canvasHeight * 3 / 5,
     
    draw() {
        context.beginPath();
        context.fillStyle = 'red';
        context.fillRect(wall.x, wall.y, wall.width, wall.height);
        context.fill();
    }
}

let bullet = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    nextX: 0,
    nextY: 0,
    vx: -1000,
    vy: -500,
    radius: 5,

    // function nay nang cao qua dung ChatGPT :DDD
    doesVectorIntersectRectangle(x1, y1, x2, y2, xMin, xMax, yMin, yMax) {
        // Bước 1: Kiểm tra xem một trong hai điểm có nằm trong hình chữ nhật không
        function isPointInsideRect(x, y, xMin, xMax, yMin, yMax) {
            return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
        }

        if (isPointInsideRect(x1, y1, xMin, xMax, yMin, yMax) || isPointInsideRect(x2, y2, xMin, xMax, yMin, yMax)) {
            return true;
        }

        // Bước 2: Kiểm tra giao điểm giữa vector và các cạnh của hình chữ nhật
        function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
            let dx1 = x2 - x1;
            let dy1 = y2 - y1;
            let dx2 = x4 - x3;
            let dy2 = y4 - y3;
            let dx3 = x3 - x1;
            let dy3 = y3 - y1;

            let denominator = dx1 * dy2 - dy1 * dx2;

            // Nếu định thức là 0, thì hai đoạn thẳng song song hoặc đồng nhất
            if (denominator === 0) return false;

            let t = (dx3 * dy2 - dy3 * dx2) / denominator;
            let u = (dx3 * dy1 - dy3 * dx1) / denominator;

            // Kiểm tra điều kiện của t và u
            return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
        }

        // Kiểm tra từng cạnh của hình chữ nhật
        // Cạnh trái
        if (checkIntersection(x1, y1, x2, y2, xMin, yMin, xMin, yMax)) return true;

        // Cạnh phải
        if (checkIntersection(x1, y1, x2, y2, xMax, yMin, xMax, yMax)) return true;

        // Cạnh dưới
        if (checkIntersection(x1, y1, x2, y2, xMin, yMin, xMax, yMin)) return true;

        // Cạnh trên
        if (checkIntersection(x1, y1, x2, y2, xMin, yMax, xMax, yMax)) return true;

        // Nếu không có cạnh nào bị cắt
        return false;
    },

    checkIntersectingRectangle(x, y, nX, nY, rectMinX, rectMaxX, rectMinY, rectMaxY) {
        if(nX <= rectMaxX && nX >= rectMinX && nY <= rectMaxY && nY >=rectMinY) {
            return true;
        }

        if(bullet.doesVectorIntersectRectangle(x, y, nX, nY, rectMinX, rectMaxX, rectMinY, rectMaxY)) {
            console.log(rectMinX + " " + rectMaxX)
            return true;
        }

        return false;
    },

    checkProjectedPath() {
        bullet.nextX = bullet.x + bullet.vx * secondsPassed;
        bullet.nextY = bullet.y + bullet.vy * secondsPassed;

        if(bullet.checkIntersectingRectangle(bullet.x, bullet.y, bullet.nextX, bullet.nextY, wall.x, wall.x + wall.width, wall.y, wall.y + wall.height)) {
            if(bullet.vx >= 0 && bullet.vy <= 0) {
                if(bullet.y < wall.y + wall.height) {
                    bullet.vx = -Math.abs(bullet.vx);
                } else {
                    bullet.vy = Math.abs(bullet.vy);
                }
            } else if(bullet.vx <=0 && bullet.vy <= 0) {
                if(bullet.y < wall.y + wall.height) {
                    bullet.vx = Math.abs(bullet.vx);
                } else {
                    bullet.vy = Math.abs(bullet.vy);
                }
            } else if(bullet.vx >= 0 && bullet.vy >= 0) {
                if(bullet.y < wall.y) {
                    bullet.vy = -Math.abs(bullet.vy);
                } else {
                    bullet.vx = -Math.abs(bullet.vx);
                }
            } else if(bullet.vx <= 0 && bullet.vy >=0) {
                if(bullet.y < wall.y) {
                    bullet.vy = -Math.abs(bullet.vy);
                } else {
                    bullet.vx = Math.abs(bullet.vx);
                }
            }
        }
    },

    draw() {
        context.beginPath();
        context.fillStyle = 'gray';
        context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
        context.fill();
    },

    update(secondsPassed) {
        bullet.x += bullet.vx * secondsPassed;
        bullet.y += bullet.vy * secondsPassed;
    },

    detectWall() {
        if(bullet.x < bullet.radius) {
            bullet.x = bullet.radius;
            bullet.vx = Math.abs(bullet.vx);
        }
        if(bullet.x > canvasWidth - bullet.radius) {
            bullet.x = canvasWidth - bullet.radius;
            bullet.vx = -Math.abs(bullet.vx);
        }
        if(bullet.y < bullet.radius) {
            bullet.y = bullet.radius;
            bullet.vy = Math.abs(bullet.vy);
        }
        if(bullet.y > canvasHeight - bullet.radius) {
            bullet.y = canvasHeight - bullet.radius;
            bullet.vy = -Math.abs(bullet.vy);
        }
    }
};

function drawText4() {
    
}

function gameLoop4(timeStamp) {

    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    clearCanvas();

    drawText4();
    wall.draw();
    bullet.draw(secondsPassed);
    bullet.update(secondsPassed);

    bullet.checkProjectedPath();

    bullet.detectWall();


    window.requestAnimationFrame(gameLoop4);
}

