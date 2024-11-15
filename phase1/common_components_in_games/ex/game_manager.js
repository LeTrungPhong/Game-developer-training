import { canvasWidth, canvasHeight } from "./common.js";

export default class GameManager {
    constructor() {
        this.score = 0;
        this.state = 'playing';
        this.heart = 10;
        this.heartMax = this.heart;
        this.sizeHeart = 30;

        this.imageHeart = new Image();
        this.imageHeart.src = 'img/heart.png';

        this.imageHeartDie = new Image();
        this.imageHeartDie.src = 'img/heartDie.webp';
    }

    setState(newState) {
        this.state = newState;
    }

    updateScore(points) {
        this.score += points;
    }

    updateHeart(number) {
        this.heart = this.heart + number;
    }

    resetGame() {
        this.score = 0;
        this.state = 'playing';
    }

    update() {

    }

    draw(context) {
        if(this.heart > 0) {
            
        } else {
            this.setState('ending');
            this.drawEndGame(context);
        }
        this.drawHeart(context);
        this.drawScore(context);
    }

    drawHeart(context) {
        const postY = 30;
        let postX = 30;
        const spaceItem = 30;

        for(let i = 0; i < this.heart; ++i) {
            context.beginPath();
            context.drawImage(this.imageHeart, postX, postY, this.sizeHeart, this.sizeHeart);
            postX += spaceItem;
        }

        for(let i = 0; i < this.heartMax - this.heart; ++i) {
            context.beginPath();
            context.drawImage(this.imageHeartDie, postX, postY, this.sizeHeart, this.sizeHeart);
            postX += spaceItem;
        }
    }

    drawScore(context) {
        const postY = 95;
        const postX = 35;

        context.beginPath();
        context.fillStyle = 'gray';
        context.font = '25px Arial';
        context.textAlign = 'left';
        context.fillText("Score: " + this.score, postX, postY);
    }

    drawEndGame(context) {
        const postX = canvasWidth / 2;
        const postY = canvasHeight / 2;

        context.beginPath();
        context.fillStyle = 'gray';
        context.font = '50px Arial';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillText("End Game", postX, postY);
    }
}