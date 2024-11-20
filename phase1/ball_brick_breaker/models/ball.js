import CircleCollider from "../collider/circle_collider.js";
import { canvasWidth, heightBorder, heightScore, postX, postY } from "../common.js";
import GameObject from "./game_object.js";

export default class Ball extends GameObject {

    constructor(x, y, vx, vy, radius) {
        super(x, y, vx, vy, new CircleCollider(x, y, radius));
        this.radius = radius;
        this.postX = postX;
        this.postY = postY;
        this.checkInterpolation = false;
        this.timeStamp = null;
        this.name = 'ball';

        this.animation = {
            start: { x: null, y: null },
            end: { x: postX, y: postY },
            duration: 0.2,
            startTime: null
        }
    }

    update(deltaTime) {
        // if (this.vx != 0 && this.vy != 0) {
        //     console.log(this.vx + " " + this.vy + " " + this.x + " " + this.y)
        // }
        if (this.checkInterpolation) {
            this.interpolationDefaultPost(deltaTime);
        }

        this.detectWall();

        this.x = this.x + this.vx * deltaTime;
        this.y = this.y + this.vy * deltaTime;
        this.collider.x = this.x;
        this.collider.y = this.y;
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = 'white';
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    detectWall() {
        if (this.x < this.radius) {
            this.x = this.radius;
            this.vx = Math.abs(this.vx);
        }

        if (this.y < this.radius + heightScore + heightBorder) {
            this.y = this.radius + heightScore + heightBorder;
            this.vy = Math.abs(this.vy);
        }

        if (this.x > canvasWidth - this.radius) {
            this.x = canvasWidth - this.radius;
            this.vx = -Math.abs(this.vx);
        }

        if (this.y > this.postY && !this.checkInterpolation) {
            this.vx = 0;
            this.vy = 0;
            this.animation.start.x = this.x;
            this.animation.start.y = this.y;
            this.animation.startTime = 0;
            this.timeStamp = 0;
            this.checkInterpolation = true;
        }
    }

    interpolationDefaultPost(deltaTime) {
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

    onCollision(other) {
        if (other.name == 'obstacle') {

            const postMinX = Math.max(other.x, Math.min(this.x, other.x + other.width));
            const postMinY = Math.max(other.y, Math.min(this.y, other.y + other.height));

            const direction = { x: postMinX - this.x, y: postMinY - this.y };
            const distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            const directionNorm = { x: direction.x / distance, y: direction.y / distance };

            const overlap = Math.max(0, this.radius - distance);
            // console.log(overlap);
            const directionOverlap = { x: directionNorm.x * (overlap + 1), y: directionNorm.y * (overlap + 1) };
            
            this.x = this.x - directionOverlap.x;
            this.y = this.y - directionOverlap.y;

            other.thickness = other.thickness - 1;

            if (this.vx >= 0 && this.vy >= 0) {
                if (this.y <= other.y && this.x <= other.x) {
                    this.vy = -Math.abs(this.vy);
                    this.vx = -Math.abs(this.vx);
                } else if (this.y <= other.y) {
                    this.vy = -Math.abs(this.vy);
                } else if (this.x <= other.x) {
                    this.vx = -Math.abs(this.vx);
                }
            } else if (this.vx >= 0 && this.vy <= 0) {
                if (this.x <= other.x && this.y >= other.y + other.height) {
                    this.vx = -Math.abs(this.vx);
                    this.vy = Math.abs(this.vy);
                } else if (this.x <= other.x) {
                    this.vx = -Math.abs(this.vx);
                } else if (this.y >= other.y + other.height) {
                    this.vy = Math.abs(this.vy);
                }
            } else if (this.vx <= 0 && this.vy <= 0) {
                if (this.x >= other.x + other.width && this.y >= other.y + other.height) {
                    this.vx = Math.abs(this.vx);
                    this.vy = Math.abs(this.vy);
                } else if (this.x >= other.x + other.width) {
                    this.vx = Math.abs(this.vx);
                } else if (this.y >= other.y + other.height) {
                    this.vy = Math.abs(this.vy);
                }
            } else if (this.vx <= 0 && this.vy >= 0) {
                if (this.x >= other.x + other.width && this.y <= other.y) {
                    this.vx = Math.abs(this.vx);
                    this.vy = -Math.abs(this.vy);
                } else if (this.x >= other.x + other.width) {
                    this.vx = Math.abs(this.vx);
                } else if (this.y <= other.y) {
                    this.vy = -Math.abs(this.vy);
                }
            }

        }
    }
}