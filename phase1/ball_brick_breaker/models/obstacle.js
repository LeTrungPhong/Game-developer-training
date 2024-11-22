import RectCollider from "../collider/rectangle_collider.js";
import { colorTextItem, itemHeight, itemWidth } from "../common.js";
import GameObject from "./game_object.js";

export default class Obstacle extends GameObject {
    constructor(x, y, vx, vy, width, height, thickness) {
        super(x, y, vx, vy, new RectCollider(x, y, width, height));
        this.thickness = thickness;
        this.width = width;
        this.height = height;
        this.animation = {
            start: { x: null, y: null },
            end: { x: null, y: null },
            startTime: null,
            duration: 0.5
        };
        this.timeStamp = 0;
        this.checkInterpolation = false;
        this.countInterpolation = 0;
        this.name = 'obstacle';
    }

    update(deltaTime) {
        if (this.checkInterpolation == false && this.countInterpolation > 0) {
            this.setInterpolation();
            this.countInterpolation--;
        }
        if (this.checkInterpolation) {
            this.interpolationMove(deltaTime);
        }

        this.x = this.x + this.vx * deltaTime;
        this.y = this.y + this.vy * deltaTime;
        this.collider.x = this.x;
        this.collider.y = this.y;
    }

    draw(context) {        
        const colorHigh = 15;

        context.beginPath();
        context.fillStyle = `rgb(${255 - this.thickness * colorHigh}, ${255 - this.thickness * colorHigh}, ${255 - this.thickness * colorHigh})`;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.beginPath();
        context.strokeStyle = 'orange';
        context.strokeRect(this.x, this.y, this.width, this.height);

        context.beginPath();
        if (255 - this.thickness * colorHigh > 150) {
            context.fillStyle = 'black';
        } else {
            context.fillStyle = 'white';
        }
        context.font = '22px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${this.thickness}`, this.x + itemWidth / 2, this.y + itemHeight / 2);
    }

    setInterpolation() {
        if (this.checkInterpolation) {
            this.countInterpolation++;
        } else {
            this.timeStamp = 0;
            this.animation.start.x = this.x;
            this.animation.start.y = this.y;
            this.animation.end.x = this.x;
            this.animation.end.y = this.y + itemHeight;
            this.animation.startTime = 0;
            this.checkInterpolation = true;
        }
    }

    interpolationMove(deltaTime) {
        this.timeStamp += deltaTime;

        const elapsed = this.timeStamp - this.animation.startTime;
        let t = Math.min(elapsed / this.animation.duration, 1);
        t = this.easeInQuad(t);

        this.x = this.lerp(this.animation.start.x, this.animation.end.x, t);
        this.y = this.lerp(this.animation.start.y, this.animation.end.y, t);
        
        if (t >= 1) {
            this.checkInterpolation = false;
        }
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    easeInQuad(t) {
        return t * t;
    }
}