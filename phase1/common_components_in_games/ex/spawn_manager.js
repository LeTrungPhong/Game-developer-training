import Star from "./star_prefab.js";
import { canvasWidth } from "./common.js";

export default class SpawnManager {
    constructor() {
        this.listStar = [];
        this.level = 4;
        this.speed = 300,
        this.hiddenItem = 0;
        this.timeCount = 4;
        this.timeSpace = 4;
        this.timeSpaceRandom = this.timeSpace;
    }

    update(deltaTime, context) {
        if (this.listStar.length == 0) {
            for(let i = 0; i < this.level; ++i) {
                const randomPosX = Math.floor(Math.random() * ( canvasWidth - 40 - 40 + 1 )) + 40;
                const randomRadius = Math.floor(Math.random() * ( 30 - 20 + 1 )) + 20;
                const speedRandom = Math.floor(Math.random() * (this.speed + 5 - (this.speed - 5) + 1)) + this.speed - 5;
                this.listStar.push(new Star(randomPosX, -40, 0, speedRandom, randomRadius));
            }

            this.level++;
            this.speed += 5;
        }

        if(this.hiddenItem > this.listStar.length) {
            this.hiddenItem = this.listStar.length;
        }

        if(this.listStar.length > 0) {
            for (let i = 0; i < this.hiddenItem; ++i) {
                this.listStar[i].draw(context);
                this.listStar[i].update(deltaTime);
            }
        }

        this.timeCount += deltaTime;

        if(this.timeCount > this.timeSpaceRandom) {
            this.hiddenItem++;
            this.timeCount = 0;
            const randowmTimeSpace = Math.floor(Math.random() * (this.timeSpace + 1 - (this.timeSpace - 1) + 1)) + this.timeSpace - 1;
            this.timeSpaceRandom = randowmTimeSpace;
        }
    }
}