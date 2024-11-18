// import CircleCollider from "./circle_collider";
import Collider from "./collider_abstract.js";

export default class RectCollider extends Collider {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    checkCollider(other) {
        if(other instanceof RectCollider) {
            return (
                this.x < other.x + other.width && 
                this.x + this.width > other.x && 
                this.y < other.y + other.height &&
                this.y + this.height > other.y
            );
        } else if(other instanceof CircleCollider) {
            const closestX = Math.max(this.x, Math.min(other.x, this.x + this.width));
            const closestY = Math.max(this.x, Math.min(other.y, this.y + this.height));
            const dx = other.x - closestX;
            const dy = other.y - closestY;
            return dx * dx + dy * dy < other.radius * other.radius;
        }
        return false;
    }
}