import Collider from "./collider_abstract.js";
import CircleCollider from "./circle_collider.js";

export default class RectCollider extends Collider {
    constructor(gameObject, width, height) {
        super(gameObject);
        this.width = width;
        this.height = height;
    }

    checkCollision(other) {
        if (other instanceof RectCollider) {
            return (
                this.gameObject.x < other.gameObject.x + other.width &&
                this.gameObject.x + this.width > other.gameObject.x &&
                this.gameObject.y < other.gameObject.y + other.height && 
                this.gameObject.y + this.height > other.gameObject.y
            );
        } else if (other instanceof CircleCollider) {
            const closestX = Math.max(this.gameObject.x, Math.min(other.gameObject.x, this.gameObject.x + this.width));
            const closestY = Math.max(this.gameObject.y, Math.min(other.gameObject.y, this.gameObject.y + this.height));
            const dx = other.gameObject.x - closestX;
            const dy = other.gameObject.y - closestY;
            return dx * dx + dy * dy < other.radius * other.radius;
        }
        return false;
    }
}