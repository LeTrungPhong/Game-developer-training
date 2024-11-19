import Collider from "./collider_abstract.js";

export default class CircleCollider extends Collider {
    static currentId = 0;

    constructor(x, y, radius) {
        super(x, y, 1);
        this.radius = radius;
        this.id = CircleCollider.currentId++;
    }

    checkCollision(other) {
        if(other.type == 1) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < this.radius + other.radius;
        } else if(other.type == 2) {
            return other.checkCollision(this);
        }
        return false;
    }
}