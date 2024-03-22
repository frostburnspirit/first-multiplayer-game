function initialize(player, pixelsPerMeter) {
  Object.assign(player, {
    type: "circle",
    radius: 0.5, // unit - meters
    trueRadius: 0,
    color: "441199",
    mass: 10,
    speed: 200, // the force applied to the player, in newtons
    truePos: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    acc: { x: 0, y: 0 },
    netForce: { x: 0, y: 0 },
    forces: { x: {}, y: {} },
  });
  player.trueRadius = player.radius * pixelsPerMeter;
  // It is not possible to edit argument directly, so attributes are added to the already existing object instead, which does work
}

function move(player, keypresses, framerate, pixelsPerMeter, funcs) {
  // instead of changin velocity directly, adds force to player depending on keys pressed
  // instead of changing velocity directly, add a force, convert to acceleration using mass, then each frame use the framerate to count the time that has passed
  if (keypresses.up != keypresses.down) {
    // != same as XOR in practice for booleans
    if (keypresses.up) {
      player.forces.y.movementForce = player.speed;
    } else {
      player.forces.y.movementForce = -player.speed;
    }
  } else {
    player.forces.y.movementForce = 0;
  }
  if (keypresses.left != keypresses.right) {
    if (keypresses.left) {
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

  // combine forces
  player.netForce.x = funcs.sum(player.forces.x);
  player.netForce.y = funcs.sum(player.forces.y);

  // convert force to acceleration
  player.acc.x = player.netForce.x / player.mass; // F = m * a  <=>  a = F / m
  player.acc.y = player.netForce.y / player.mass;

  // apply acceleration
  player.vel.x += player.acc.x / framerate; // a = v / t  <=>  v = a * 1 / f (frequency <=> framerate)
  player.vel.y += player.acc.y / framerate;

  // apply velocity
  player.pos.x += player.vel.x / framerate; // v = d / t  <=>  d = v * 1/f
  player.pos.y += player.vel.y / framerate;

  // a meter is more than a pixel, hence a constant is added
  player.truePos.x = player.pos.x * pixelsPerMeter;
  player.truePos.y = player.pos.y * pixelsPerMeter;
}

export default {
  initialize,
  move,
};
