import Circle from "./circle.js"
import CanvasManager from "./canvas_manager.js";
import Grid from "./grid_manager.js";
import Rectangle from "./rectangle.js";

let canvasManager;
let secondsPassed;
let oldTimeStamp = 0;
let listCircle;
let listRectangle;
let listObject;
let grid;

window.addEventListener("DOMContentLoaded", () => {
    canvasManager = new CanvasManager("canvas");
    grid = new Grid();

    createObject();
    window.requestAnimationFrame(gameLoop);
});

function gameLoop(timeStamp) {
    if(secondsPassed == null) {
        secondsPassed = (timeStamp) / 1000;
    } else {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
    }

    canvasManager.clearCanvas();
    grid.clear();
    grid.updateGridItem(listObject);
    grid.detectObject(listObject);
    canvasManager.drawGrid(grid);
    canvasManager.drawObject(listObject);
    canvasManager.updateObject(listObject, secondsPassed);
    canvasManager.updateDetectWall(listObject);
    console.log(listObject)

    window.requestAnimationFrame(gameLoop);
}

function createObject() {
    listCircle = [
        new Circle(200, 200, 300, 500, 20),
        new Circle(300, 400, 200, -500, 23)
    ];
    listRectangle = [
        new Rectangle(400, 100, 500, 200, 80, 50),
        new Rectangle(500, 200, -300, -200, 50, 80),
    ];

    listObject = [...listCircle, ...listRectangle];
}
