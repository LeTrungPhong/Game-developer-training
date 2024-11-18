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
    heightTextScore
} from "../common.js"
import BallManager from "./ball_manager.js";
import ObstacleManager from "./obstacle_manager.js";

export default class GameManager {
    constructor() {
        this.score = 0;
        this.state = 'playing';
        this.ballManager = new BallManager();
        this.obstacleManager = new ObstacleManager();
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
        
        this.ballManager.draw(context);
        this.obstacleManager.draw(context);
    }

    update(deltaTime) {
        this.ballManager.update(deltaTime);
        this.obstacleManager.update(deltaTime);
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
}