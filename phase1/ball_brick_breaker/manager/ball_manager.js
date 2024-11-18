import { canvasWidth, heightBorder, heightGame, heightScore, postX, postY, radiusBall } from "../common.js";
import Ball from "../models/ball.js";

export default class BallManager {
    constructor() {
        this.timeSpace = 0.2;
        this.timeStamp = 0;
        this.indexBall = 0;
        this.listBall = Array.from({ length: 10 }, () => 
            new Ball(postX, postY, 0, 0, radiusBall)
        );
        this.checkBallMove = true;
    }

    draw(context) {
        this.listBall.forEach((ball) => {
            ball.draw(context);
        });
    }

    update(deltaTime) {
        this.timeStamp += deltaTime;
        this.listBall.forEach((ball) => {
            ball.update(deltaTime);
        })
        if (this.indexBall < this.listBall.length && this.timeStamp > this.timeSpace && this.checkBallMove) {
            this.timeStamp = 0;
            this.listBall[this.indexBall].vx = 50;
            this.listBall[this.indexBall].vy = -500;
            this.indexBall++;

            if (this.indexBall == this.listBall.length) {
                this.checkBallMove = false;
                this.indexBall = 0;
            }
        }
    }
}