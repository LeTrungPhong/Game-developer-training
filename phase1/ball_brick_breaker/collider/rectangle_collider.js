import Collider from "./collider_abstract.js";

export default class RectCollider extends Collider {
    static currentId = 0;

    constructor(x, y, width, height) {
        super(x, y, 2);
        this.width = width;
        this.height = height;
        this.id = RectCollider.currentId++;
    }

    checkCollision(other) {
        if(other.type == 2) {
            return (
                this.x < other.x + other.width && 
                this.x + this.width > other.x && 
                this.y < other.y + other.height &&
                this.y + this.height > other.y
            );
        } else if(other.type == 1) {
            const closestX = Math.max(this.x, Math.min(other.x, this.x + this.width));
            const closestY = Math.max(this.y, Math.min(other.y, this.y + this.height));
            const dx = other.x - closestX;
            const dy = other.y - closestY;
            
            // if (dx * dx + dy * dy < other.radius * other.radius) {
            //     console.log(Math.sqrt(dx * dx + dy * dy) + " " + Math.sqrt(other.radius * other.radius));
            // }

            return dx * dx + dy * dy < other.radius * other.radius;
        }
        return false;
    }
}