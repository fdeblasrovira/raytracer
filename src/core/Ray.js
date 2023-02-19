export class Ray {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction;
  }

  // P(t)=A+tb
  at(t) {
    return this.direction.multiplyBy(t).add(this.origin);
  }
}