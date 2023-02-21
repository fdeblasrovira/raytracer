import { Vec3 } from "../core/Vec3.js";

export class Shape {
  constructor(position) {
    this.pos = position;
  }

  get position() {
    return this.pos;
  }
}

export class Sphere extends Shape {
  constructor(position, radius) {
    super(position);
    this.rad = radius;
  }

  get radius() {
    return this.rad;
  }

  checkCollision(ray) {
    const oc = ray.origin.substract(this.position);

    const a = ray.direction.lengthSquared();
    const half_b = Vec3.dot(oc, ray.direction);
    const c = oc.lengthSquared() - this.radius * this.radius;
    const discriminant = half_b * half_b - a * c;

    if (discriminant < 0) {
      return -1.0;
    } else {
      return (-half_b - Math.sqrt(discriminant)) / a;
    }
  }
}
