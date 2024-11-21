import CircleCollider from "../collider/circle_collider.js";
import { itemWidth, itemHeight } from "../common.js";
import GameObject from "./game_object.js";

export default class Item extends GameObject {
    constructor(x, y, vx, vy, radius) {
        super(x, y, vx, vy, new CircleCollider(x, y, radius));
        this.radius = radius;
        // this.image = new Image();
        // this.image.src = './img/ball_sprite_sheet.png';
        // this.itemWidthImg = 0;
        // this.itemHeightImg = 0;
        // this.image.onload = () => {
        //     this.itemWidthImg = this.image.width / 6;
        //     this.itemHeightImg = this.image.height / 1;
        // }
        // this.indexRow = 0;
        // this.indexColumn = 0;
        this.scale = 0;
        this.checkScale = true;
        this.name = 'item';

        this.animation = {
            start: { x: null, y: null },
            end: { x: null, y: null },
            startTime: null,
            duration: 0.5
        };
        this.timeStamp = 0;
        this.checkInterpolation = false;
        this.countInterpolation = 0;
        this.name = 'item';
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

    draw(context) {
        if (this.checkScale) {
            this.scale += 0.05;
        } else {
            this.scale -= 0.05;
        }
        if (this.scale >= 1) {
            this.checkScale = false;
        } else if (this.scale <= 0) {
            this.checkScale = true;
        }
        // this.indexColumn++;
        // if (this.indexColumn == 6) this.indexColumn = 0;

        context.beginPath();
        // context.drawImage(this.image, this.indexColumn * this.itemWidthImg, this.indexRow * this.itemHeightImg, this.itemWidthImg, this.itemHeightImg, this.x, this.y, itemWidth, itemWidth);
        context.fillStyle = 'rgb(255, 255, 100)';
        context.arc(this.x, this.y, this.radius * 2 / 3, 0, 2 * Math.PI);
        context.fill();

        context.save();
        context.beginPath();
        context.translate(this.x, this.y);
        context.scale(this.scale, 1);
        context.lineWidth = 3;
        context.strokeStyle = 'white';
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.lineWidth = 1;
        context.restore();
    }

    checkCollision(other) {

    }
}