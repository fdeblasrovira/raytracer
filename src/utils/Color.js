// value should be between -1 and 1
export function lerp(startColor, endColor, value) {
  return startColor.multiplyBy(1 - value).add(endColor.multiplyBy(value));
}

export function toRGB(color) {
  return color.vector.map((x) => Math.round(255 * x));
}

export function toRGBA(color) {
  return [...toRGB(color), 255];
}
