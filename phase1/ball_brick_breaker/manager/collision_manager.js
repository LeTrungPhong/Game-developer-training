import RectCollider from "../collider/rectangle_collider.js";
import { heightBorder, heightScore, itemGridHeight, itemGridWidth, itemHeight, itemWidth, sizeColumnGrid, sizeRowGrid } from "../common.js";

export default class CollisionManager {
    constructor() {
        this.listColliders = {
            static: [],
            dynamic: []
        };
        this.grid = Array.from({ length: sizeRowGrid }, () => 
            Array.from({ length: sizeColumnGrid }, () => [])
        );
        this.postX = 0;
        this.postY = heightScore + heightBorder;
    }

    update(deltaTime) {
        this.resetGrid(deltaTime);
        this.updateGrid(deltaTime);
        this.checkCollision();
    }

    resetGrid(deltaTime) {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                this.grid[i][j] = [];
            }
        }
    }

    updateGrid(deltaTime) {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                this.listColliders['dynamic'].forEach((item) => {
                    if (item != null) {
                        if (item.checkCollision(new RectCollider(j * itemGridWidth, i * itemGridHeight + heightScore + heightBorder, itemGridWidth, itemGridHeight))) {
                            this.grid[i][j].push({ id: item.id, type: 'dynamic' });
                        }
                    }
                });

                this.listColliders['static'].forEach((item) => {
                    if (item != null) {
                        if (item.checkCollision(new RectCollider(j * itemGridWidth, i * itemGridHeight + heightScore + heightBorder, itemGridWidth, itemGridHeight))) {
                            this.grid[i][j].push({ id: item.id, type: 'static' });
                        }
                    }
                })
            }
        }
    }

    checkCollision() {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                if (this.grid[i][j].length > 1) {
                    for (let k = 0; k < this.grid[i][j].length; ++k) {
                        for (let h = k + 1; h < this.grid[i][j].length; ++h) {
                            if (this.grid[i][j][k].type == 'static' && this.grid[i][j][h].type == 'dynamic') {
                                const itemA = this.listColliders['static'].find(item => item.id === this.grid[i][j][k].id);
                                const itemB = this.listColliders['dynamic'].find(item => item.id === this.grid[i][j][h].id);

                                if (itemB.checkCollision(itemA)) {
                                    
                                }
                            } else if (this.grid[i][j][k].type == 'dynamic' && this.grid[i][j][h].type == 'static') {
                                const itemA = this.listColliders['dynamic'].find(item => item.id === this.grid[i][j][k].id);
                                const itemB = this.listColliders['static'].find(item => item.id === this.grid[i][j][h].id);

                                if (itemA.checkCollision(itemB)) {
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    add(collider, type) {
        if (type == 'static' || type == 'dynamic') {
            this.listColliders[type].push(collider);
        }
    }

    remove(collider) {

    }

    drawGrid(context) {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                const countItem = this.grid[i][j] != null ? this.grid[i][j].length : 0;
                const changeColor = 20;
                context.beginPath();
                context.strokeStyle = `#ebcaca`;
                context.fillStyle = `rgb(${95 + (countItem) * changeColor}, ${63 + (countItem) * changeColor}, ${63 + (countItem) * changeColor})`;
                context.fillRect(this.postX + j * itemGridWidth, this.postY + i * itemGridHeight, itemGridWidth, itemGridHeight);
                context.strokeRect(this.postX + j * itemGridWidth, this.postY + i * itemGridHeight, itemGridWidth, itemGridHeight);
            }
        }
    }
}