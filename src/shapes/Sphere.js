import { Vec3 } from "../core/Vec3.js";

export class Shape {
  constructor(position) {
    this.pos = position;
  }

  get position(){
    return this.pos;
  }
}

export class Sphere extends Shape{
  constructor(position, radius) {
    super(position);
    this.rad = radius;
  }

  get radius(){
    return this.rad;
  }

  checkCollision(ray){
    const oc = ray.origin.substract(this.position);
    const a = Vec3.dot(ray.direction, ray.direction);
    const b = 2 * Vec3.dot(oc, ray.direction);
    const c = Vec3.dot(oc, oc)-(this.radius*this.radius);
    const discriminant = b*b - 4*a*c;
    if (discriminant < 0) {
        return -1;
    } else {
        return (-b - Math.sqrt(discriminant) ) / (2*a);
    }
  }
}
