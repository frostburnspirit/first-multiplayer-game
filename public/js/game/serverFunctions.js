import misc from "../../shared/js/functions.js";

function calculateEvents(keysPressed, fps, player, entities) {
  return serverSide(keysPressed, fps, player, entities);
}

function serverSide(keysPressed, fps, plyr, ents) {
  const player = JSON.parse(JSON.stringify(plyr));
  const entities = JSON.parse(JSON.stringify(ents));
  const entitiesInclusive = {};
  entitiesInclusive[player.name] = player;
  for (const entityName in entities) {
    if (Object.hasOwnProperty.call(entities, entityName)) {
      const entity = entities[entityName];
      entitiesInclusive[entityName] = entity;
    }
  }

  doKeypressForce(keysPressed, player);

  applyForces(entitiesInclusive, fps);

  return entitiesInclusive;
}

function doKeypressForce(keysPressed, player) {
  // instead of changin velocity directly, adds force to player depending on keys pressed
  // instead of changing velocity directly, add a force, convert to acceleration using mass, then each frame use the framerate to count the time that has passed
  if (keysPressed.up != keysPressed.down) {
    // "!=" equivalent to XOR in practice for booleans
    if (keysPressed.up) {
      player.forces.y.movementForce = player.speed;
    } else {
      player.forces.y.movementForce = -player.speed;
    }
  } else {
    player.forces.y.movementForce = 0;
  }
  if (keysPressed.left != keysPressed.right) {
    if (keysPressed.left) {
      player.forces.x.movementForce = -player.speed;
    } else {
      player.forces.x.movementForce = player.speed;
    }
  } else {
    player.forces.x.movementForce = 0;
  }
  // adjust forces so diagonal forces are of the same magnitude [needs improvement]
  if (
    Math.abs(player.forces.x.movementForce) === player.speed &&
    Math.abs(player.forces.y.movementForce) === player.speed
  ) {
    player.forces.x.movementForce /= Math.SQRT2;
    player.forces.y.movementForce /= Math.SQRT2;
  }
}

function applyForces(entities, framerate) {
  for (const entityName in entities) {
    if (Object.hasOwnProperty.call(entities, entityName)) {
      const entity = entities[entityName];
      entity.netForce.x = misc.sum(entity.forces.x);
      entity.netForce.y = misc.sum(entity.forces.y);

      // convert force to acceleration
      entity.acc.x = entity.netForce.x / entity.mass; // F = m * a  <=>  a = F / m
      entity.acc.y = entity.netForce.y / entity.mass;

      // apply acceleration
      entity.vel.x += entity.acc.x / framerate; // a = v / t  <=>  v = a * 1 / f (frequency <=> framerate)
      entity.vel.y += entity.acc.y / framerate;

      // apply velocity
      entity.pos.x += entity.vel.x / framerate; // v = d / t  <=>  d = v * 1/f
      entity.pos.y += entity.vel.y / framerate;
    }
  }
}

export default { calculateEvents };
