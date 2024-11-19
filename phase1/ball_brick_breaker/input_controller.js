import { postX, postY } from "./common.js";

export default class InputController {
    constructor(canvas) {
        this.keys = {};
        this.buttons = {}
        this.canvas = canvas;
        this.mouseX = postX;
        this.mouseY = postY;
        
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
        window.addEventListener('mousedown', (e) => this.buttons[e.button] = true);
        window.addEventListener('mouseup', (e) => this.buttons[e.button] = false);
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    isButtonPressed(button) {
        return this.buttons[button] || false;
    }
}