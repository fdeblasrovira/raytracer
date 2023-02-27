import { Ray } from "./Ray";
import { Point3, Vec3 } from "./Vec3";

export class HitRecord {
  p: Point3;
  norm: Vec3;
  t: number;

  constructor(point: Point3, normal: Vec3, value: number) {
    this.p = point;
    this.norm = normal;
    this.t = value;
  }

  get point(): Point3 {
    return this.p;
  }

  get normal(): Vec3 {
    return this.norm;
  }

  get value(): number {
    return this.t;
  }

  isFrontFace(ray: Ray): boolean {
    return Vec3.dot(ray.direction, this.norm) < 0;
  }
}
