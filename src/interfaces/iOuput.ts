import { Color3 } from "../core/Vec3";

export interface iOutput {
  writeColor( x: number, y: number, color: Color3): void;
  width: number;
  height: number;
  render(): void;
}
