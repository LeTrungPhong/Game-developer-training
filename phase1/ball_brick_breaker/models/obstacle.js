import RectCollider from "../collider/rectangle_collider";
import GameObject from "./game_object";

export default class Obstacle extends GameObject {
    constructor(x, y, vx, vy, width, height) {
        super(x, y, vx, vy, new RectCollider(x, y, width, height));
    }

    update(deltaTime) {
        this.x = this.x + this.vx * deltaTime;
        this.y = this.y + this.vy * deltaTime;
        this.collider.x = this.x;
        this.collider.y = this.y;
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}