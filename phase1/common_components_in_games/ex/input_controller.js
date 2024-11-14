export default class InputController {
    constructor() {
        this.keys = {};
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            console.log(e.key)
        });
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }
}