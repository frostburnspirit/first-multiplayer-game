import misc from "../../../shared/js/functions.js";

class PlayerClass {
  constructor(pixelsPerMeter) {
    this.type = "circle";
    this.radius = 0.5; // unit - meters
    this.trueRadius = 0;
    this.color = "441199";
    this.mass = 10;
    this.speed = 200; // the force applied to the player, in newtons
    this.truePos = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.netForce = { x: 0, y: 0 };
    this.forces = { x: {}, y: {} };
    this.trueRadius = this.radius * pixelsPerMeter;
  }
  move(keypresses, framerate, pixelsPerMeter) {
    // instead of changin velocity directly, adds force to player depending on keys pressed
    // instead of changing velocity directly, add a force, convert to acceleration using mass, then each frame use the framerate to count the time that has passed
    if (keypresses.up != keypresses.down) {
      // != same as XOR in practice for booleans
      if (keypresses.up) {
        this.forces.y.movementForce = this.speed;
      } else {
        this.forces.y.movementForce = -this.speed;
      }
    } else {
      this.forces.y.movementForce = 0;
    }
    if (keypresses.left != keypresses.right) {
      if (keypresses.left) {
        this.forces.x.movementForce = -this.speed;
      } else {
        this.forces.x.movementForce = this.speed;
      }
    } else {
      this.forces.x.movementForce = 0;
    }
    // adjust forces so diagonal forces are of the same magnitude [needs improvement]
    if (
      Math.abs(this.forces.x.movementForce) === this.speed &&
      Math.abs(this.forces.y.movementForce) === this.speed
    ) {
      this.forces.x.movementForce /= Math.SQRT2;
      this.forces.y.movementForce /= Math.SQRT2;
    }

    // combine forces
    this.netForce.x = misc.sum(this.forces.x);
    this.netForce.y = misc.sum(this.forces.y);

    // convert force to acceleration
    this.acc.x = this.netForce.x / this.mass; // F = m * a  <=>  a = F / m
    this.acc.y = this.netForce.y / this.mass;

    // apply acceleration
    this.vel.x += this.acc.x / framerate; // a = v / t  <=>  v = a * 1 / f (frequency <=> framerate)
    this.vel.y += this.acc.y / framerate;

    // apply velocity
    this.pos.x += this.vel.x / framerate; // v = d / t  <=>  d = v * 1/f
    this.pos.y += this.vel.y / framerate;

    // a meter is more than a pixel, hence a constant is added
    this.truePos.x = this.pos.x * pixelsPerMeter;
    this.truePos.y = this.pos.y * pixelsPerMeter;
  }
  get drawInfo() {
    const { type, trueRadius, color, truePos } = this;
    return { type, trueRadius, color, truePos };
  }
}

export default {
  PlayerClass,
};
