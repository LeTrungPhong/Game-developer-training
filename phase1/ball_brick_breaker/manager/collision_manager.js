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
        this.listCheck = [];
        this.getThickness = 0;
        this.getBall = 0;
    }

    update(deltaTime) {
        this.resetGrid(deltaTime);
        this.updateGrid(deltaTime);
        this.checkCollision(deltaTime);
    }

    resetGrid(deltaTime) {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                this.grid[i][j] = [];
            }
        }
        this.listCheck = [];
    }

    updateGrid(deltaTime) {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                this.listColliders['dynamic'].forEach((item) => {
                    if (item.type == 0) {
                        this.remove(item, 'dynamic');
                    } else if (item != null) {
                        if (item.checkCollision(new RectCollider(j * itemGridWidth, i * itemGridHeight + heightScore + heightBorder, itemGridWidth, itemGridHeight))) {
                            this.grid[i][j].push({ id: item.id, type: 'dynamic' });
                        }
                    }
                });

                this.listColliders['static'].forEach((item) => {
                    if (item.type == 0) {
                        this.remove(item, 'static');
                    } else if (item != null) {
                        if (item.checkCollision(new RectCollider(j * itemGridWidth, i * itemGridHeight + heightScore + heightBorder, itemGridWidth, itemGridHeight))) {
                            this.grid[i][j].push({ id: item.id, type: 'static' });
                        }
                    }
                })
            }
        }
    }

    remove(collider, type) {
        if (type == 'dynamic') {
            this.listColliders['dynamic'].filter(item => item.id == collider.id);
        } else if (type == 'static') {
            this.listColliders['static'].filter(item => item.id == collider.id);
        }
    }

    checkCollision(deltaTime) {
        for (let i = 0; i < this.grid.length; ++i) {
            for (let j = 0; j < this.grid[i].length; ++j) {
                if (this.grid[i][j].length > 1) {
                    for (let k = 0; k < this.grid[i][j].length; ++k) {
                        for (let h = k + 1; h < this.grid[i][j].length; ++h) {
                            if (this.grid[i][j][k].type == 'static' && this.grid[i][j][h].type == 'dynamic') {
                                let itemA = this.listColliders['static'].find(item => item.id === this.grid[i][j][k].id);
                                let itemB = this.listColliders['dynamic'].find(item => item.id === this.grid[i][j][h].id);
                                let check = true;

                                for (let i = 0; i < listCheck.length; ++i) {
                                    const iA = listCheck[i].itemA;
                                    const iB = listCheck[i].itemB;
                                    
                                    if (iA.type == 'static' && iA.id == itemA.id && iB.type == 'dynamic' && iB.id == itemB.id) {
                                        check = false;
                                        break;
                                    }

                                    if (iB.type == 'static' && iB.id == itemA.id && iA.type == 'dynamic' && iA.id == itemB.id) {
                                        check = false;
                                        break;
                                    }
                                }

                                if (itemB.checkCollision(itemA) && check) {
                                    this.listCheck.push({ itemA: { id: itemA.id, type: 'static' }, itemB: { id: itemB.id, type: 'dynamic' } });
                                    itemB.gameObject.onCollision(itemA.gameObject);
                                    if (itemA.gameObject.name == 'obstacle') {
                                        this.getThickness++;
                                    }
                                    if (itemA.gameObject.name == 'item') {
                                        itemA = null;
                                        this.getBall++;
                                    }
                                    // console.log(itemB.id + " He " + itemB.type + " 1");
                                }
                            } else if (this.grid[i][j][k].type == 'dynamic' && this.grid[i][j][h].type == 'static') {
                                let itemA = this.listColliders['dynamic'].find(item => item.id === this.grid[i][j][k].id);
                                let itemB = this.listColliders['static'].find(item => item.id === this.grid[i][j][h].id);
                                let check = true;

                                for (let i = 0; i < this.listCheck.length; ++i) {
                                    const iA = this.listCheck[i].itemA;
                                    const iB = this.listCheck[i].itemB;
                                    
                                    if (iA.type == 'dynamic' && iA.id == itemA.id && iB.type == 'static' && iB.id == itemB.id) {
                                        check = false;
                                        break;
                                    }

                                    if (iB.type == 'dynamic' && iB.id == itemA.id && iA.type == 'static' && iA.id == itemB.id) {
                                        check = false;
                                        break;
                                    }
                                }
                                if (itemA.checkCollision(itemB) && check) {
                                    this.listCheck.push({ itemA: { id: itemA.id, type: 'dynamic' }, itemB: { id: itemB.id, type: 'static' } });
                                    itemA.gameObject.onCollision(itemB.gameObject);
                                    if (itemB.gameObject.name == 'obstacle') {
                                        this.getThickness++;
                                    }
                                    if (itemB.gameObject.name == 'item') {
                                        itemB = null;
                                        this.getBall++;
                                    }
                                    // console.log(itemA.id + " He " + itemA.type + " 2 " + itemB.id + " " + deltaTime);
                                    // console.log({ itemA: { id: itemA.id, type: 'dynamic' }, itemB: { id: itemB.id, type: 'static' } })
                                    // console.log(this.listCheck);
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