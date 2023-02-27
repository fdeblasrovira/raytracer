import { Color3, Point3, Vec3 } from "../core/Vec3";

export interface iHittable {
  checkRayCollision(object: any, minT: number, maxT: number): number;
  colorAt(point: Point3): Color3;
  normalAt(point: Point3): Vec3;
  position: Point3;
}
