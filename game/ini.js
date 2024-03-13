window.focus;
const RESOLUTION = 1;
const CANVAS = document.getElementById("main-canvas");
const CTX = CANVAS.getContext("2d");
CANVAS.height = innerHeight * 0.8 * RESOLUTION; // 0.8 based on canvas taking 80% of the viewport height
CANVAS.width = CANVAS.height * 1.5;

const FPS = 10;
// CTX.imageSmoothingEnabled = false;
