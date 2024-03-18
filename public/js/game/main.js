import * as c from "./constants.js";
import ini from "./ini.js";
import draw from "./canvasFunctions.js";

let drawObjects = { layer1: {}, layer2: {}, layer3: {} };

function updatePlayer() {
  if (!drawObjects.layer1.player) {
    drawObjects.layer1.player = {
      type: "circle",
      x: 100,
      y: 100,
      radius: 50,
      color: "441199",
    };
  } else {
    drawObjects.layer1.player.x += 1;
  }
}

// c.canvas.addeven
let keysPressed = {
  up: undefined,
  down: undefined,
  left: undefined,
  right: undefined,
};
document.addEventListener("keydown", (e) => {
  // Maybe check for keys and key combinations that aren't relevant too? https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event

  // Which one to choose?

  if (
    (e.code === "ArrowUp" || e.code === "KeyW") &&
    !Object.values(keysPressed).includes("up")
  ) {
    console.log(e.code);
  }

  // if ((e.code === "ArrowUp" || e.code === "KeyW") && !keysPressed.up) {
  //   console.log(e.code);
  // }
});

// addeventlistener keyup

function main() {
  draw.clearCanvas(c.canvas, c.ctx);
  updatePlayer();
  draw.draw(c.ctx, drawObjects); // objects is an objects containing different drawing layers, each cointaining an object with objects {layer1: {obj1:obj1, obj2:something, obj3:test}, layer2: {obj4:obj4, obj5:placeholder} ...}
  draw.nextFrame(main, c.fps);
}

// executing scripts

ini.ini(c.canvas, c.resolution);

// create file for constants and import at top

main();
