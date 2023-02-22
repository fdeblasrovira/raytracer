import { Vec3, Point3 } from "../core/Vec3";
import { Ray } from "../core/Ray";
import { iHittable } from "../interfaces/iHittable";

export class Shape {
  pos: Point3;

  constructor(position: Point3) {
    this.pos = position;
  }

  get position(): Point3 {
    return this.pos;
  }
}

export class Sphere extends Shape implements iHittable {
  rad: number;

  constructor(position: Point3, radius: number) {
    super(position);
    this.rad = radius;
  }

  get radius(): number {
    return this.rad;
  }

  checkRayCollision(ray: Ray): number {
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
