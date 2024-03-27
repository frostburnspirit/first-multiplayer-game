import * as c from "./constants/constants.js";
import ini from "./ini.js";
import canvas from "./canvasFunctions.js";
import p from "./player.js";
import e from "./entity.js";
import camera from "./camera.js";
import server from "./serverFunctions.js";

let drawObjects = { layer1: {}, layer2: {}, layer3: {} };
const player = new p.Player();
const entity1 = new e.Entity("circle", "first entity");
const entity2 = new e.Entity("circle", "second entity", 1, 2);
const entities = {};
entities[entity1.name] = entity1;
entities[entity2.name] = entity2;
const entitiesInclusive = { [player.name]: player, ...entities };

function main() {
  //& handle events (e.g. collisions, player inputs)
  const changes = server.calculateEvents(
    c.keysPressed,
    c.fps,
    player,
    entities
  );
  //& applying changes and adding to draw objects
  for (const entityName in entitiesInclusive) {
    if (Object.hasOwnProperty.call(entitiesInclusive, entityName)) {
      const entity = entitiesInclusive[entityName];
      // if (entityName === "second entity") {
      //   console.log(entity.pos);
      // }
      entity.execute(changes[entityName]);
      drawObjects.layer2[entityName] = entity.drawInfo;
    }
  }
  //& camera adjustments
  camera.update(player, c.offset, c.canvas, c.pixelsPerMeter); //*
  //& drawing changes
  canvas.clearCanvas(c.canvas, c.ctx);
  canvas.draw(c.canvas, c.ctx, drawObjects, c.pixelsPerMeter, c.offset); // objects is an object containing different drawing layers, each cointaining an object with objects {layer1: {obj1:obj1, obj2:something, obj3:test}, layer2: {obj4:obj4, obj5:placeholder} ...}
  canvas.nextFrame(main, c.fps);
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
