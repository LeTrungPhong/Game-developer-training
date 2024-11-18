import GameObject from "./game_object.js";
import RectCollider from "./rectangle_collider.js";
import { canvasHeight, canvasWidth } from "./common.js";

export default class Player extends GameObject {
    constructor(x, y, vx, vy, width, height, inputController) {
        super(x, y, vx, vy, new RectCollider(null, width, height));
        this.image = new Image();
        this.image.src = 'img/Dino_T-Rex3.jpg';
        this.width = width;
        this.height = height;
        this.inputController = inputController;
        this.checkKey = true;
    }

    update(deltaTime) {
        this.x = this.x + this.vx * deltaTime;
        this.y = this.y + this.vy * deltaTime;
    }

    draw(context) {
        if (this.inputController.isKeyPressed('ArrowLeft')) {
            context.save();
            context.beginPath();
            context.translate(this.x, this.y); 
            context.scale(-1, 1); 
            context.drawImage(this.image, 0 - this.width, 0, this.width, this.height); // Vẽ ảnh từ tâm
            context.restore(); 
            this.checkKey = false;
        } else if(this.inputController.isKeyPressed('ArrowRight')) {
            context.beginPath();
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.checkKey = true;
        } else if(this.checkKey) {
            context.beginPath();
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            context.save();
            context.beginPath();
            context.translate(this.x, this.y); 
            context.scale(-1, 1); 
            context.drawImage(this.image, 0 - this.width, 0, this.width, this.height); // Vẽ ảnh từ tâm
            context.restore(); 
        }

        // context.beginPath();
        // context.strokeStyle = 'blue';
        // context.strokeRect(this.x, this.y, this.width, this.height);
    }

    detectWall() {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > canvasWidth - this.width) {
            this.x = canvasWidth - this.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > canvasHeight - this.height) {
            this.y = canvasHeight - this.height;
        }
    }
}