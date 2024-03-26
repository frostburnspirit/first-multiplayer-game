import * as c from "./constants/constants.js";
import ini from "./ini.js";
import draw from "./canvasFunctions.js";
import p from "./player.js";
import e from "./entity.js";
import misc from "../../../shared/js/functions.js";

let drawObjects = { layer1: {}, layer2: {}, layer3: {} };
const player = new p.Player();
const entity1 = new e.Entity("circle", "first entity");
const entity2 = new e.Entity("circle", "second entity", 1, 2);
let entities = [];
entities.push(entity1, entity2);

function main() {
  draw.clearCanvas(c.canvas, c.ctx);
  // check for collisions here (compare, using a regular function, all entities in a loop)
  // misc calculations
  player.calculate(c.keysPressed, c.fps);
  entities.forEach((entity) => {
    entity.calculate(c.fps);
  });
  // applying changes and adding to draw objects
  player.execute(c.fps);
  drawObjects.layer2.player = player.drawInfo;
  entities.forEach((entity) => {
    entity.execute(c.fps);
    drawObjects.layer2[entity.name] = entity.drawInfo;
  });
  console.log(drawObjects);
  // drawing changes
  draw.draw(c.canvas, c.ctx, drawObjects, c.pixelsPerMeter); // objects is an object containing different drawing layers, each cointaining an object with objects {layer1: {obj1:obj1, obj2:something, obj3:test}, layer2: {obj4:obj4, obj5:placeholder} ...}
  draw.nextFrame(main, c.fps);
}

document.addEventListener("keydown", (e) => {
  // Maybe check for keys and key combinations that aren't relevant too? https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event

  // Which one to choose if needed? Should they be used in if statements?
  //-   !Object.values(keysPressed).includes("up") vs !keysPressed.up vs [doesn't work] !keysPressed[up] vs keysPressed.up === "undefined"

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

// executing scripts

ini.canvasSetup(c.canvas, c.resolution);

// create file for constants and import at top

main();
