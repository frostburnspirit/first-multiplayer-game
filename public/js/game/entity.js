import misc from "../../../shared/js/functions.js";

class Entity {
  constructor(type = "circle", name, x = 0, y = 0) {
    this.type = type; // circle by default
    this.radius = 0.5; // unit - meters
    this.color = "AA5500";
    this.mass = 10;
    this.speed = 200; // the force applied to the player, in newtons
    this.pos = { x, y };
    // console.log(this.pos);
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.netForce = { x: 0, y: 0 };
    this.forces = { x: {}, y: {} };
    this.name = name;
  }

  calculate(framerate) {
    // combine forces
    this.netForce.x = misc.sum(this.forces.x);
    this.netForce.y = misc.sum(this.forces.y);

    // convert force to acceleration
    this.acc.x = this.netForce.x / this.mass; // F = m * a  <=>  a = F / m
    this.acc.y = this.netForce.y / this.mass;

    // apply acceleration
    this.vel.x += this.acc.x / framerate; // a = v / t  <=>  v = a * 1 / f (frequency <=> framerate)
    this.vel.y += this.acc.y / framerate;
  }

  execute(framerate) {
    // apply velocity
    this.pos.x += this.vel.x / framerate; // v = d / t  <=>  d = v * 1/f
    this.pos.y += this.vel.y / framerate;
  }

  get drawInfo() {
    const { type, radius, color, pos } = this;
    return { type, radius, color, pos };
  }
}

export default {
  Entity,
};
