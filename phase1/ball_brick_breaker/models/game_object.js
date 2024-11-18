export default class GameObject {
    constructor(x, y, vx, vy, collider) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.collider = collider;
    }

    update() {
        throw new Error("update() must be implemented in a subclass");
    }

    draw() {
        throw new Error("draw() must be implemented in a subclass");
    }
}