import { 
    canvasWidth, 
    canvasHeight,
    backgroundScore,
    heightScore,
    backgroundBottom,
    colorBottomScore,
    heightBorder,
    backgroundGame,
    sizeRowItem,
    itemHeight,
    colorTopBottom,
    heightBottom,
    heightTextScore,
    postX,
    postY,
    speedBall,
    itemWidth,
    radiusBall
} from "../common.js"
import BallManager from "./ball_manager.js";
import ObstacleManager from "./obstacle_manager.js";
import InputController from "../input_controller.js";
import CollisionManager from "./collision_manager.js"
import Item from "../models/item.js";
import Ball from "../models/ball.js";

export default class GameManager {
    constructor(canvas) {
        this.score = 0;
        this.state = 'playing';
        this.ballManager = new BallManager();
        this.obstacleManager = new ObstacleManager();
        this.inputController = new InputController(canvas);
        this.collisionManager = new CollisionManager();
        this.checkBallMove = true;
        this.postX = postX;
        this.postY = postY;
        this.speed = speedBall;

        this.setCollisionManager();

    }

    setCollisionManager() {
        this.ballManager.listBall.forEach((ball) => {
            if (ball != null) {
                this.collisionManager.add(ball.collider, 'dynamic');
            }
        })

        this.obstacleManager.listObstacle.forEach((listObstacleRow) => {
            listObstacleRow.forEach((obstacle) => {
                if (obstacle != null) {
                    this.collisionManager.add(obstacle.collider, 'static');
                }
            })
        });
    }

    addCollisionObstacle() {
        this.collisionManager.listColliders['static'] = [];
        this.obstacleManager.listObstacle.forEach((listObstacleRow) => {
            listObstacleRow.forEach((obstacle) => {
                if (obstacle != null) {
                    this.collisionManager.add(obstacle.collider, 'static');
                }
            });
        })
    }

    setState(newState) {
        this.state = newState;
    }

    updateScore(points) {
        this.score += points;
    }

    resetGame() {
        this.score = 0;
        this.state = 'playing';
    }

    draw(context) {
        this.drawScore(context);
        this.drawBorder(context);
        this.drawBackgroundGame(context);
        // this.collisionManager.drawGrid(context);
        this.drawArrow(context);
        
        this.ballManager.draw(context);
        this.obstacleManager.draw(context);
        if (this.state == 'end') {
            this.drawGameover(context);
        }

    }

    update(deltaTime) {
        if (this.state == 'playing') {
            this.ballManager.update(deltaTime);
            this.obstacleManager.update(deltaTime);
            this.collisionManager.update(deltaTime);

            // console.log(this.checkBallMove + " " + this.ballManager.checkStart);
            if (this.inputController.isButtonPressed(0) && this.checkBallMove) {
                this.ballManager.timeStamp = 0;
                this.ballManager.checkStart = true;
                
                const velocityX = this.inputController.mouseX - this.postX;
                const velocityY = this.inputController.mouseY - this.postY;
                const speedVelocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
                this.ballManager.velocityX = velocityX * this.speed / speedVelocity;
                this.ballManager.velocityY = velocityY * this.speed / speedVelocity;
                this.checkBallMove = false;
            }

            if (this.ballManager.checkStart == false) {
                this.checkBallMove = true;
            }

            if (this.obstacleManager.checkNull == true) {
                this.addCollisionObstacle();
            }

            if (this.ballManager.checkObstacleMove == true) {
                this.obstacleManager.hiddenObstacle();
                this.ballManager.checkObstacleMove = false;
            }

            this.updateScore(this.collisionManager.getThickness * 10);
            this.updateBall(this.collisionManager.getBall);
            this.collisionManager.getThickness = 0;
            this.collisionManager.getBall = 0;

            this.obstacleManager.listObstacle.forEach((listObstacleRow) => {
                listObstacleRow.forEach((obstacle) => {
                    if (obstacle != null) {
                        if (obstacle.y >= heightScore + heightBorder + itemHeight * (sizeRowItem - 1)) {
                            this.state = 'end';
                        }
                    }
                })
            });
        }
    }

    updateBall(number) {
        for (let i = 0; i < number; ++i) {
            let ball = new Ball(postX, postY, 0, 0, radiusBall);
            this.ballManager.addBall(ball);
            this.collisionManager.add(ball.collider, 'dynamic');
        }
    }

    drawGameover(context) {
        context.beginPath();
        context.fillStyle = 'white';
        context.font = '50px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Game Over :)))', canvasWidth / 2, canvasHeight / 2);
    }

    clearCanvas(context) {
        context.beginPath();
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    drawScore(context) {
        context.beginPath();
        context.fillStyle = backgroundScore;
        context.fillRect(0, 0, canvasWidth, heightScore);

        context.beginPath();
        context.fillStyle = 'white';
        context.font = `${heightTextScore}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${this.score}`, canvasWidth / 2, heightScore / 2);

        context.beginPath();
        context.fillStyle = backgroundBottom;
        context.fillRect(0, heightScore + heightBorder * 2 + sizeRowItem * itemHeight, canvasWidth, heightBottom);
    }

    drawBorder(context) {
        context.beginPath();
        context.fillStyle = colorBottomScore;
        context.fillRect(0, heightScore, canvasWidth, heightBorder);

        context.beginPath();
        context.fillStyle = colorTopBottom;
        context.fillRect(0, heightScore + heightBorder + sizeRowItem * itemHeight, canvasWidth, heightBorder);
    }

    drawBackgroundGame(context) {
        context.beginPath();
        context.fillStyle = backgroundGame;
        context.fillRect(0, heightScore + heightBorder, canvasWidth, sizeRowItem * itemHeight);
    }

    drawArrow(context) {
        context.beginPath();
        context.strokeStyle = 'white';
        context.setLineDash([10, 5]);
        context.moveTo(this.postX, this.postY);
        context.lineTo(this.inputController.mouseX, this.inputController.mouseY);
        context.stroke();

        context.beginPath();
        context.setLineDash([]);
        context.save();
        context.translate(this.inputController.mouseX, this.inputController.mouseY);

        const ck = this.postY - this.inputController.mouseY;
        const ch = Math.sqrt((this.postY - this.inputController.mouseY) * (this.postY - this.inputController.mouseY) + (this.postX - this.inputController.mouseX) * (this.postX - this.inputController.mouseX));
        const angleRotate = Math.acos(ck / ch);
        
        if (this.inputController.mouseX > this.postX) {
            context.rotate(angleRotate);
        } else {
            context.rotate(-angleRotate);
        }

        context.moveTo(0, 0);
        context.lineTo(-5, 10);
        context.stroke();

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(5, 10);
        context.stroke();

        context.restore();
    }
}