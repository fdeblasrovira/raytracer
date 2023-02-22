import { Point3, Vec3 } from "./Vec3";
import { iHittable } from "../interfaces/iHittable";

export class Ray {
  originPoint: Point3;
  directionVector: Vec3;
  constructor(originPoint: Point3, directionVector: Vec3) {
    this.originPoint = originPoint;
    this.directionVector = directionVector;
  }

  get origin(): Point3 {
    return this.originPoint;
  }
  get direction(): Vec3 {
    return this.directionVector;
  }

  // P(t)=A+tb
  at(t: number): Point3 {
    return this.direction.multiplyBy(t).add(this.origin);
  }

  checkCollision(object: iHittable): number {
    return object.checkCollision(this);
  }
}
