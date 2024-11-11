import Vector from "./vector.js";

export default class DetectCollision {
    static detectCollidionOfCircleAndCircle(obj1, obj2) {
        let distance = Vector.distance(obj1, obj2);
        if(distance < obj1.radius + obj2.radius) {
            let vectorDirection = Vector.sub(obj2, obj1);
            let vectorDirectionNorm = Vector.divScale(vectorDirection, distance);
            let vectorVelocity = Vector.sub({ x: obj1.vx, y: obj1.vy}, { x: obj2.vx, y: obj2.vy });
            let speed = Vector.mul(vectorVelocity, vectorDirectionNorm);

            let overlap = (obj1.radius + obj2.radius - distance) / 2;
            obj1.x -= overlap * vectorDirectionNorm.x;
            obj1.y -= overlap * vectorDirectionNorm.y;
            obj2.x += overlap * vectorDirectionNorm.x;
            obj2.y += overlap * vectorDirectionNorm.y;

            obj1.vx -= speed * vectorDirectionNorm.x;
            obj1.vy -= speed * vectorDirectionNorm.y;
            obj2.vx += speed * vectorDirectionNorm.x;
            obj2.vy += speed * vectorDirectionNorm.y;
        }
    }

    static detectCollidionOfRetangleAndRetangle(obj1, obj2) {
        let distance = Vector.distance(obj1, obj2);
        let check = true;
        if(obj1.x > obj2.x + obj2.width || obj2.x > obj1.x + obj1.width || obj1.y > obj2.y + obj2.height || obj2.y > obj1.y + obj1.height) {
            check = false;
        }
        if(check) {
            let vectorDirection = Vector.sub(obj2, obj1);
            let vectorDirectionNorm = Vector.divScale(vectorDirection, distance);
            let vectorVelocity = Vector.sub({ x: obj1.vx, y: obj1.vy}, { x: obj2.vx, y: obj2.vy });
            let speed = Vector.mul(vectorVelocity, vectorDirectionNorm);

            obj1.vx -= speed * vectorDirectionNorm.x;
            obj1.vy -= speed * vectorDirectionNorm.y;
            obj2.vx += speed * vectorDirectionNorm.x;
            obj2.vy += speed * vectorDirectionNorm.y;

            if(obj1.x < obj2.x && obj1.y < obj2.y) {
                let overlapX = obj1.x + obj1.width - obj2.x;
                let overlapY = obj1.y + obj1.height - obj2.y;
                if(overlapX < overlapY) {
                    obj2.x += overlapX;
                    obj1.x -= overlapX;
                } else {
                    obj2.y += overlapY;
                    obj1.y -= overlapY;
                }
            } else if(obj1.x > obj2.x && obj1.y < obj2.y) {
                let overlapX = obj2.x + obj2.width - obj1.x;
                let overlapY = obj1.y + obj1.height - obj2.y;
                if(overlapX < overlapY) {
                    obj2.x -= overlapX;
                    obj1.x += overlapX;
                } else {
                    obj2.y += overlapY;
                    obj1.y -= overlapY;
                }
            } else if(obj1.x < obj2.x && obj1.y > obj2.y) {
                let overlapX = obj1.x + obj1.width - obj2.x;
                let overlapY = obj2.y + obj2.height - obj1.y;
                if(overlapX < overlapY) {
                    obj2.x += overlapX;
                    obj1.x -= overlapX;
                } else {
                    obj2.y -= overlapY;
                    obj1.y += overlapY;
                }
            } else if(obj1.x > obj2.x && obj1.y > obj2.y) {
                let overlapX = obj2.x + obj2.width - obj1.x;
                let overlapY = obj2.y + obj2.height - obj1.y;
                if(overlapX < overlapY) {
                    obj2.x -= overlapX;
                    obj1.x += overlapX;
                } else {
                    obj2.y -= overlapY;
                    obj1.y += overlapY;
                }
            }
        }
    }

    static detectCollisionOfCircleAndRectangle(circle, rectangle) {
        let localeN = { x: 0, y: 0 };
        localeN.x = Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));
        localeN.y = Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));

        if(Vector.distance(localeN, circle) < circle.radius) {
            let vectorDirection = Vector.sub(circle, localeN);
            let distance = Vector.distance(circle, localeN);
            let vectorDirectionNorm = Vector.divScale(vectorDirection, distance);
            let vectorV = Vector.sub({ x: rectangle.vx, y: rectangle.vy }, { x: circle.vx, y: circle.vy });
            let speed = Vector.mul(vectorV, vectorDirectionNorm);
        
            rectangle.vx -= speed * vectorDirectionNorm.x;
            rectangle.vy -= speed * vectorDirectionNorm.y;
            circle.vx += speed * vectorDirectionNorm.x;
            circle.vy += speed * vectorDirectionNorm.y;

            let overlap = circle.radius - distance;
            rectangle.x -= overlap  * vectorDirectionNorm.x;
            rectangle.y -= overlap * vectorDirectionNorm.y;
            circle.x += overlap * vectorDirectionNorm.x;
            circle.y += overlap * vectorDirectionNorm.y;
        }   
    }
}