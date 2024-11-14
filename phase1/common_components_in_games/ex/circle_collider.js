import Collider from "./collider_abstract.js";

export default class CircleCollider extends Collider {
    constructor(gameObject, radius) {
        super(gameObject);
        this.radius = radius;
    }

    checkCollision(other) {
        if (other instanceof CircleCollider) {
            const dx = this.gameObject.x - other.gameObject.x;
            const dy = this.gameObject.y - other.gameObject.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < this.radius + other.radius;
        } else if (other instanceof RectCollider) {
            return other.checkCollision(this);
        }
    }
}