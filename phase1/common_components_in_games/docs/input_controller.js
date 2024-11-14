export default class InputController {
    static instance = null;

    constructor() {
        if (InputController.instance) {
            return InputController.instance;
        } else {
            InputController.instance = this;
        }

        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }
}