import * as c from "./constants.js";
import ini from "./ini.js";
import draw from "./canvasFunctions.js";
import player from "./player.js";
import misc from "../misc/functions.js";

let drawObjects = { layer1: {}, layer2: {}, layer3: {} };

function updatePlayer() {
  if (misc.isEmpty(c.player)) {
    player.initialize(c.player, c.pixelsPerMeter);
  }
  player.move(c.player, c.keysPressed, c.fps, c.pixelsPerMeter, misc);
  drawObjects.layer2.player = c.player;
}

document.addEventListener("keydown", (e) => {
  // Maybe check for keys and key combinations that aren't relevant too? https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event

  // Which one to choose if needed? Should they be used in if statements?
  //   !Object.values(keysPressed).includes("up") vs !keysPressed.up vs [doesn't work] !keysPressed[up] vs keysPressed.up === "undefined"

  // Should if statements be condensed?
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    c.keysPressed.up = true;
  }
  if (e.code === "ArrowDown" || e.code === "KeyS") {
    c.keysPressed.down = true;
  }
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    c.keysPressed.left = true;
  }
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    c.keysPressed.right = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    c.keysPressed.up = false;
  }
  if (e.code === "ArrowDown" || e.code === "KeyS") {
    c.keysPressed.down = false;
  }
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    c.keysPressed.left = false;
  }
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    c.keysPressed.right = false;
  }
});

function main() {
  draw.clearCanvas(c.canvas, c.ctx);
  updatePlayer();
  draw.draw(c.canvas, c.ctx, drawObjects); // objects is an objects containing different drawing layers, each cointaining an object with objects {layer1: {obj1:obj1, obj2:something, obj3:test}, layer2: {obj4:obj4, obj5:placeholder} ...}
  draw.nextFrame(main, c.fps);
}

// executing scripts

ini.ini(c.canvas, c.resolution);

// create file for constants and import at top

main();
