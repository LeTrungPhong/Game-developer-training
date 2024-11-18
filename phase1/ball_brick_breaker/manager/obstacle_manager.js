import { heightBorder, heightScore, itemHeight, itemWidth, sizeColumnItem } from "../common.js";
import Obstacle from "../models/obstacle.js";

export default class ObstacleManager {
    constructor() {
        this.level = 6;
        this.thickness = 10;
        this.itemInColumn = sizeColumnItem - 5;
        this.indexList = 0;
        this.postYSpawn = heightScore + heightBorder;
        this.listObstacle = Array.from({ length: this.level }, () => 
            Array.from({ length: sizeColumnItem }, () => null)
        );

        this.hiddenObstacle();
        this.hiddenObstacle();
        this.hiddenObstacle();
    }

    update(deltaTime) {
        this.listObstacle.forEach((listObstacleRow) => {
            listObstacleRow.forEach((obstacle) => {
                if (obstacle != null) {
                    obstacle.update(deltaTime);
                }
            })
        })
    }

    draw(context) {
        this.listObstacle.forEach((listObstacleRow) => {
            listObstacleRow.forEach((obstacle) => {
                if (obstacle != null) {
                    obstacle.draw(context);
                }
            })
        })
    }

    hiddenObstacle() {
        if (this.indexList < this.listObstacle.length) {

            const numbers = this.getRandomNumbers(sizeColumnItem, this.itemInColumn);

            for(let i = 0; i < this.listObstacle[this.indexList].length; ++i) {
                if (numbers.includes(i)) {
                    const thicknessItem = Math.floor(Math.random() * (this.thickness + 5 - (this.thickness - 5) + 1)) + this.thickness - 5;
                    this.listObstacle[this.indexList][i] = new Obstacle(i * itemWidth, heightScore + heightBorder, 0, 0, itemWidth, itemHeight, thicknessItem);
                }
            }

            if(this.indexList != 0) {
                for(let i = 0; i < this.indexList; ++i) {
                    this.listObstacle[i].forEach((obstacle) => {
                        if (obstacle != null) {
                            obstacle.setInterpolation();
                        }
                    });
                }
            }


            this.indexList++;
        }
    }

    getRandomNumbers(range, count) {
        const numbers = [];
        while (numbers.length < count) {
            const randomNum = Math.floor(Math.random() * (range * 1));
            if (!numbers.includes(randomNum)) {
                numbers.push(randomNum);
            }
        }
        return numbers;
    }
}