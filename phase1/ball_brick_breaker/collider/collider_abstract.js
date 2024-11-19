export default class Collider {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    checkCollision(other) {
        throw new Error("checkCollision() must be implemented in a subclass");
    }

    onCollision(other) {
        console.log("Collision detected with: " + other);
    }
}