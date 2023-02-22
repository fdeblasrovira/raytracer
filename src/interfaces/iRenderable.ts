import { Color3, Point3 } from "../core/Vec3";

export interface iRenderable {
  colorAt(point: Point3): Color3;
}
