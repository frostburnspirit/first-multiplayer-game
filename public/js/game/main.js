import * as c from "./constants.js";
import ini from "./ini.js";
import draw from "./canvasFunctions.js";

let drawObjects = { layer1: {}, layer2: {}, layer3: {} };

function updatePlayer() {
  drawObjects.layer1.player = { type: "circle", x: 100, y: 100 };
}

function main() {
  draw.clearCanvas(c.canvas, c.ctx);
  updatePlayer();
  draw.draw(c.ctx, drawObjects); // objects is an objects containing different drawing layers, each cointaining an object with objects {layer1: {obj1:obj1, obj2:something, obj3:test}, layer2: {obj4:obj4, obj5:placeholder} ...}
  draw.nextFrame(main, c.fps);
}

ini.ini(c.canvas, c.resolution);

// create file for constants and import at top

main();
