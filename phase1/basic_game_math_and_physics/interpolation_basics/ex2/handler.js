let canvas;
let context;
const canvasWidth = window.screen.width * 1 / 3;
const canvasHeight = window.screen.height * 2 / 3;

window.addEventListener("DOMContentLoaded", () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
});