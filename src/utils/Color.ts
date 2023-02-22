import { Color3 } from "../core/Vec3";

// value should be between -1 and 1
export function lerp(
  startColor: Color3,
  endColor: Color3,
  value: number
): Color3 {
  return startColor.multiplyBy(1 - value).add(endColor.multiplyBy(value));
}

export function toRGB(color: Color3): number[] {
  return color.vector.map((x: number) => Math.round(255 * x));
}

export function toRGBA(color: Color3): number[] {
  return [...toRGB(color), 255];
}
