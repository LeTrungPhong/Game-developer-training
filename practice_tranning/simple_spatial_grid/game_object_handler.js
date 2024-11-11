export default class GameObject {
    constructor(x, y, vx, vy, type, id) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        this.id = id;
    }

    update(delta) {
        this.x = this.x + this.vx * delta;
        this.y = this.y + this.vy * delta;
    }

    draw() {
        throw new Error("draw method must be implemented");
    }
}