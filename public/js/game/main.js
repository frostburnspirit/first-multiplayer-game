import ini from "./ini.js";
import draw from "./canvasFunctions.js";

function main() {
  draw.clearCanvas(canvas, ctx);
  ctx.fillStyle = "#5500FF";
  draw.drawCircle(ctx);
  draw.nextFrame(main, fps);
}

ini.ini();
const ctx = ini.ctx;
const fps = ini.fps;
const canvas = ini.canvas;
main();
