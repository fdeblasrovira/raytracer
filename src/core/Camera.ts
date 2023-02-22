import { lerp } from "../utils/Color";
import { Color3, Point3, Vec3 } from "./Vec3";
import { Viewport } from "./Viewport";

export class Camera {
  position: Point3;
  direction: Vec3;

  getBackground: BackgroundFunction;

  constructor(pos: Point3, dir: Vec3, viewport: Viewport) {
    this.position = pos;
    this.direction = dir;

    // Default color
    this.getBackground = function (point: Point3) {
      // We need the value to be between 0 and 1.
      // The Y component needs to be scaled from (-1 ~ 1) to (0 ~ 1)
      const y = 0.5 * (point.y + 1.0);
      return lerp(new Color3(1, 1, 1), new Color3(0.5, 0.7, 1), point.y);
    };
  }

  setBackground(fun: BackgroundFunction){
    this.getBackground = fun;
  }
}

type BackgroundFunction = (p: Point3) => Color3;
