import { Point3, Vec3 } from "./Vec3";

export class Camera {
  position: Point3;
  direction: Vec3;
  distance: number;

  constructor(pos: Point3, dir: Vec3, viewportDistance: number) {
    this.position = pos;
    this.direction = dir;
    this.distance = viewportDistance;
  }
}
