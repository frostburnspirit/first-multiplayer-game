import c from "./constants.js";
import ini from "./ini.js";
import draw from "./canvasFunctions.js";

function main() {
  draw.clearCanvas(c.canvas, c.ctx);
  c.ctx.fillStyle = "#5500FF";
  draw.drawCircle(c.ctx);
  draw.nextFrame(main, c.fps);
}

ini.ini(c.canvas, c.resolution);

// create file for constants and import at top

main();
