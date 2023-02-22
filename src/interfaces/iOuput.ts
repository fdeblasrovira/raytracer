import { Color3 } from "../core/Vec3";

export interface iOutput {
  writeColor(color: Color3, x: number, y: number): void;
  render(): void;
}
