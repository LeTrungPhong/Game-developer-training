import CircleCollider from "./circle_collider.js";
import GameObject from "./game_object.js";

export default class Star extends GameObject{
    constructor(x, y, vx, vy, radius) {
        super(x, y, vx, vy, new CircleCollider(null, radius));
        this.image = new Image();
        this.image.src = 'img/star-solid.svg';
        this.width = radius * 2;
        this.height = this.width;
    }

    update(deltaTime) {
        this.x = this.x + this.vx * deltaTime;
        this.y = this.y + this.vy * deltaTime;
    }

    draw(context) {
        context.beginPath();
        context.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        context.beginPath();
        context.strokeStyle = 'red';
        context.arc(this.x, this.y, this.collider.radius, 0, 2 * Math.PI);
        context.stroke();
    }
}