export default class Vector {
    static add(v1, v2) {
        return { x: v1.x + v2.x, y: v1.y + v2.y };
    }

    static sub(v1, v2) {
        return { x: v1.x - v2.x, y: v1.y - v2.y };
    }

    static mul(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static divScale(v, scale) {
        return { x: v.x / scale, y: v.y / scale };
    }

    static distance(v1, v2) {
        return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
    }
}