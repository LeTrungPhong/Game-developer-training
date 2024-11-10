let myImage;
    let spriteAnimation;
    let canvas;
    let context;
    const canvasWidth = 750;
    const canvasHeight = 600;

    let frameWidth;
    let frameHeight;

    window.addEventListener("DOMContentLoaded", () => {
        canvas = document.getElementById("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context = canvas.getContext("2d");
        myImage = document.getElementById("my-image");
        spriteAnimation = document.getElementById("sprite_animation");
        frameWidth = spriteAnimation.width / 5;
        frameHeight = spriteAnimation.height / 2;
        
        window.requestAnimationFrame(gameLoop);
    });

    let secondsPassed;
    let oldTimeStamp;
    let indexColumn = 0;
    let indexRow = 0;
    let check = true;
    function gameLoop(timeStamp) {
        secondsPassed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(spriteAnimation, indexColumn * frameWidth, indexRow * frameHeight, frameWidth, frameHeight, canvasWidth / 2 - 40, canvasHeight / 2 - 40, frameWidth, frameHeight);

        console.log(indexColumn + " " + indexRow);

        if(check) {
            indexColumn++;
        
            if(indexColumn > 4) {
                if(indexRow == 0) {
                    indexColumn = 0;
                    indexRow = 1;
                } else {
                    check = false;
                    indexColumn = 3;
                }
            }
        } else {
            indexColumn--;

            if(indexColumn < 0) {
                if(indexRow == 1) {
                    indexRow = 0;
                    indexColumn = 4;
                } else {
                    check = true;
                    indexColumn = 1;
                }
            }
        }

        // context.imageSmoothingEnabled = true;
        // context.imageSmoothingQuality = 'high';
        // context.drawImage(myImage, 10, 30, myImage.width / 10, myImage.height / 10);

        // let frameWidth = 50;
        // let frameHeight = 61;

        // let row = 1;
        // let column = 3;

        // context.drawImage(spriteAnimation, column*frameWidth, row*frameHeight, frameWidth, frameHeight, 100, 100, frameWidth, frameHeight);
        // context.drawImage(img, 100, 0, 200, 50, 10, 30, 400, 100);

        window.requestAnimationFrame(gameLoop);
    }


    // setInterval(function()
    // {

    //     context.drawImage(spriteAnimation, indexColumn * frameWidth, indexRow * frameHeight, frameWidth, frameHeight, 10, 30, frameWidth, frameHeight);

    //     indexColumn++;
        
    //     if(indexColumn >= 5) {
    //         indexColumn = 0;
    //         if(indexRow == 0) {
    //             indexRow = 1;
    //         } else {
    //             indexRow = 0;
    //         }
    //     }
    // //Wait for next step in the loop
    // }, 1000);