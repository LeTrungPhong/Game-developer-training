import { canvasHeight, canvasWidth, heightBorder, heightGame, heightScore, postX, postY, radiusBall } from "../common.js";
import Ball from "../models/ball.js";

export default class BallManager {
    constructor() {
        this.timeSpace = 0.2;
        this.timeStamp = 0;
        this.indexBall = 0;
        this.listBall = Array.from({ length: 10 }, () => 
            new Ball(postX, postY, 0, 0, radiusBall)
        );
        this.checkStart = false;
        this.velocityX = 0;
        this.velocityY = 0;
        this.checkObstacleMove = false;
    }

    draw(context) {
        this.listBall.forEach((ball) => {
            ball.draw(context);
        });

        this.drawNumberBall(context);
    }

    update(deltaTime) {
        this.listBall.forEach((ball) => {
            ball.update(deltaTime);
        })
        if (this.checkStart) {
            this.ballMove(deltaTime);
        }
    }

    ballMove(deltaTime) {
        this.timeStamp += deltaTime;

        if (this.indexBall < this.listBall.length && this.timeStamp > this.timeSpace) {
            this.timeStamp = 0;
            this.listBall[this.indexBall].vx = this.velocityX;
            this.listBall[this.indexBall].vy = this.velocityY;
            this.indexBall++;
        }

        if (this.indexBall == this.listBall.length) {
            let check = true;
            for (let i = 0; i < this.listBall.length; ++i) {
                if (this.listBall[i].vx != 0 || this.listBall[i].vy != 0) {
                    check = false;
                    break;
                }
            }
            if (check) {
                this.timeStamp = 0;
                this.checkStart = false;
                this.indexBall = 0;
                this.checkObstacleMove = true;
            }
        }
    }

    addBall(ball) {
        this.listBall.push(ball);
    }

    drawNumberBall(context) {
        context.beginPath();
        context.fillStyle = 'white';
        context.font = '25px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`Number ball: ${this.listBall.length}x`, canvasWidth / 2, canvasHeight - 20);
    }
}