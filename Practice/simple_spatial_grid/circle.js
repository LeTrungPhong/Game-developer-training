import GameObject from "./game_object_handler.js";
import { canvasWidth, canvasHeight } from "./common.js"
import Vector from "./vector.js";

export default class Circle extends GameObject {

    static counterId = 0;

    constructor(x, y, vx, vy, radius) {
        super(x, y, vx, vy, 1, Circle.counterId++);
        this.radius = radius;
    }

    detectWall() {
        if(this.x < this.radius) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx);
        }
        if(this.x > canvasWidth - this.radius) {
            this.x = canvasWidth - this.radius;
            this.vx = -Math.abs(this.vx);
        }
        if(this.y < this.radius) {
            this.y = this.radius;
            this.vy = Math.abs(this.vy);
        }
        if(this.y > canvasHeight - this.radius) {
            this.y = canvasHeight - this.radius;
            this.vy = -Math.abs(this.vy);
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = 'gray';
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}