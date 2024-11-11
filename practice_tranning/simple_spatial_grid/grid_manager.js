import { 
    canvasWidth, 
    canvasHeight, 
    sizeRowGrid as sizeRow, 
    sizeColumnGrid as sizeColumn,
    colorFocus
} from "./common.js";
import Circle from "./circle.js";
import Vector from "./vector.js";
import DetectCollision from "./detect_collision.js";

export default class Grid {
    constructor() {
        this.array = Array.from({ length: sizeRow }, () => 
            Array.from({ length: sizeColumn }, () => [])
        );
        this.itemWidth = canvasWidth / sizeColumn;
        this.itemHeight = canvasHeight / sizeRow;
    }

    draw(context) {
        for(let i = 0; i < this.array.length; ++i) {
            for(let j = 0; j < this.array[i].length; ++j) {
                const locate = { x: this.itemWidth * j, y: this.itemHeight * i };
                if(this.array[i][j].length >= 1) {
                    const length = this.array[i][j].length;
                    const colorItem = 255 - colorFocus * (length);
                    context.beginPath();
                    context.fillStyle = `rgb(${colorItem}, ${colorItem}, ${colorItem})`;
                    context.fillRect(locate.x, locate.y, this.itemWidth, this.itemHeight);
                }
                context.beginPath();
                context.strokeStyle = 'gray';
                context.strokeRect(locate.x, locate.y, this.itemWidth, this.itemHeight);
            }
        }
    }

    updateGridItem(listObject) {
        for(let i = 0; i < this.array.length; ++i) {
            for(let j = 0; j < this.array[i].length; ++j) {
                for(let k = 0; k < listObject.length; ++k) {
                    let itemObject = listObject[k];
                    const locateItemGrid = { x: this.itemWidth * j, y: this.itemHeight * i };
                    const locateItemGridMax = Vector.add(locateItemGrid, { x: this.itemWidth, y: this.itemHeight });
                    if(itemObject.type == 1) {
                        const x = Math.min(Math.max(locateItemGrid.x, itemObject.x), locateItemGrid.x + this.itemWidth);
                        const y = Math.min(Math.max(locateItemGrid.y, itemObject.y), locateItemGrid.y + this.itemHeight);
                        let check = false;
                        
                        if(locateItemGrid.x <= itemObject.x && itemObject.x <= locateItemGridMax.x && locateItemGrid.y <= itemObject.y && itemObject.y <= locateItemGridMax.y) {
                            check = true;
                        }

                        if(Vector.distance({x, y}, itemObject) < itemObject.radius) {
                            check = true;
                        }

                        if(check) {
                            this.array[i][j].push({ type: itemObject.type, id: itemObject.id });
                        }
                    }

                    if(itemObject.type == 2) {
                        let check = true;
                        if(itemObject.x > locateItemGridMax.x || itemObject.x + itemObject.width < locateItemGrid.x || itemObject.y > locateItemGridMax.y || itemObject.y + itemObject.height < locateItemGrid.y) {
                            check = false;
                        }
                        if(check) {
                            this.array[i][j].push({ type: itemObject.type, id: itemObject.id });
                        }
                    }
                }
            }
        }
    }

    detectObject(listObject) {

        for(let i = 0; i < this.array.length; ++i) {
            for(let j = 0; j < this.array[i].length; ++j) {

                if(this.array[i][j].length > 1) {
                    for(let k = 0; k < this.array[i][j].length; ++k) {
                        for(let h = k + 1; h < this.array[i][j].length; ++h) {
                            let inforObj1 = this.array[i][j][k];
                            let inforObj2 = this.array[i][j][h];
                            let obj1;
                            let obj2;
                            for(let t = 0; t < listObject.length; ++t) {
                                if(listObject[t].type == inforObj1.type && listObject[t].id == inforObj1.id) {
                                    obj1 = listObject[t];
                                }
                                if(listObject[t].type == inforObj2.type && listObject[t].id == inforObj2.id) {
                                    obj2 = listObject[t];
                                }
                            }
                            if(obj1 != null && obj2 != null) {
                                if(obj1.type == 1 && obj2.type == 1) {
                                    DetectCollision.detectCollidionOfCircleAndCircle(obj1, obj2);
                                } else
                                if(obj1.type == 2 && obj2.type == 2) {
                                    DetectCollision.detectCollidionOfRetangleAndRetangle(obj1, obj2);
                                } else
                                if(obj1.type == 1 && obj2.type == 2) {
                                    DetectCollision.detectCollisionOfCircleAndRectangle(obj1, obj2);
                                } else
                                if(obj1.type == 2 && obj2.type == 1) {
                                    DetectCollision.detectCollisionOfCircleAndRectangle(obj2, obj1);
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    clear() {
        for(let i = 0; i < this.array.length; ++i) {
            for(let j = 0; j < this.array[i].length; ++j) {
                this.array[i][j] = [];
            }
        }
    }
}