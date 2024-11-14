export default class GameManager {
    constructor() {
        this.score = 0;
        this.state = 'playing';
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
}