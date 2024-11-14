export default class Collider {
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    checkCollision(other) {
        throw new Error("checkCollision() must be implemented in a subclass");
    }

    onCollision(other) {
        console.log("Collision detected with: " + other);
    }
}