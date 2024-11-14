export default class GameObject {
    constructor(x, y, vx, vy, collider) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.collider = collider;
        collider.gameObject = this;
    }

    update(deltaTime) {
        throw new Error("update() must be implemented in a subclass");
    }

    draw(context) {
        throw new Error("draw() must be implemented in a subclass");
    }
}