import { Color3, Point3 } from "../core/Vec3";

export interface iHittable {
  checkRayCollision(object: any): number;
  colorAt(point: Point3): Color3;
  position: Point3;
}
