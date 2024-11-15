import GameObject from "./game_object.js";
import RectCollider from "./rectangle_collider.js";
import { canvasWidth } from "./common.js";

export default class Player extends GameObject {
    constructor(x, y, vx, vy, width, height) {
        super(x, y, vx, vy, new RectCollider(null, width, height));
        this.image = new Image();
        this.image.src = 'img/Dino_T-Rex.png';
        this.width = width;
        this.height = height;
    }

    update(deltaTime) {
        this.x = this.x + this.vx * deltaTime;
        this.y = this.y + this.vy * deltaTime;
    }

    draw(context) {
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

        // context.beginPath();
        // context.strokeStyle = 'blue';
        // context.strokeRect(this.x, this.y, this.width, this.height);
    }

    detectWall() {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > canvasWidth - this.width) {
            this.x = canvasWidth - this.width;
        }
    }
}