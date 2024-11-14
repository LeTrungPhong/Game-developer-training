import GameManager from "./game_manager";
import InputController from "./input_controller";
import CollisionManager from "./collision_manager";
import RectCollider from "./rectangle_collider";
import CircleCollider from "./circle_collider";
import AudioManager from "./audio_manager";

const gameManager = new GameManager();
gameManager.updateScore(10);
gameManager.setState('paused');

const inputController = new InputController();
const collisionManager = new CollisionManager();

const player = new RectCollider(50, 50, 20, 20);
const enemy = new CircleCollider(100, 100, 15);

collisionManager.addCollider(player);
collisionManager.addCollider(enemy);

const audioManager = new AudioManager();
audioManager.loadSound('jump', 'jump.wav');
audioManager.playSound('jump');

window.addEventListener("DOMContentLoaded", () => {
    gameLoop();
});

function gameLoop() {
    collisionManager.checkCollisions();
    requestAnimationFrame(gameLoop);
}

function drawHUD(context, score, health) {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, 10, 20);
    context.fillText(`Health: ${health}`, 10, 40);
}

drawHUD(context, 50, 3); 

