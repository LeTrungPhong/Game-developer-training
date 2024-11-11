import GameObject from "./game_object_handler.js";
import { canvasWidth, canvasHeight } from "./common.js";

export default class Rectangle extends GameObject {

    static counterId = 0;

    constructor(x, y, vx, vy, width, height) {
        super(x, y, vx, vy, 2, Rectangle.counterId++);
        this.width = width;
        this.height = height
    }

    detectWall() {
        if(this.x < 0) {
            this.x = 0;
            this.vx = Math.abs(this.vx);
        }
        if(this.x > canvasWidth - this.width) {
            this.x = canvasWidth - this.width;
            this.vx = -Math.abs(this.vx);
        }
        if(this.y < 0) {
            this.y = 0;
            this.vy = Math.abs(this.vy);
        }
        if(this.y > canvasHeight - this.height) {
            this.y = canvasHeight - this.height;
            this.vy = -Math.abs(this.vy);
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = 'gray';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}