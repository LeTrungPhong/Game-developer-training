import { canvasWidth, canvasHeight } from "./common.js";
import Circle from "./circle.js";

export default class CanvasManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.border = '1px solid gray';
        this.context = this.canvas.getContext("2d");
    }

    drawObject(listObject) {
        for(let i = 0; i < listObject.length; ++i) {
            listObject[i].draw(this.context);
        }
    }

    drawGrid(grid) {
        grid.draw(this.context);
    }

    updateObject(listObject, deltaTime) {
        for(let i = 0; i < listObject.length; ++i) {
            listObject[i].update(deltaTime);
        }
    }

    updateDetectWall(listObject) {
        for(let i = 0; i < listObject.length; ++i) {
            listObject[i].detectWall();
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}