export class Vec3 {
  constructor(x, y, z) {
    this.vec = [x, y, z];
  }

  static from(v) {
    return new Vec3(v[0], v[1], v[2]);
  }

  static dot(u, v) {
    return u.x * v.x + u.y * v.y + u.z * v.z;
  }

  static cross(u, v) {
    return new Vec3(
      u.y * v.z - u.z * v.y,
      u.z * v.x - u.x * v.z,
      u.x * v.y - u.y * v.x
    );
  }

  get x() {
    return this.vec[0];
  }
  get y() {
    return this.vec[1];
  }
  get z() {
    return this.vec[2];
  }
  get vector() {
    return this.vec;
  }

  invert() {
    return Vec3.from(this.vector.map((x) => -1 * x));
  }

  add(v) {
    return Vec3.from(this.vector.map((x, index) => x + v.vector[index]));
  }

  substract(v) {
    return Vec3.from(this.vector.map((x, index) => x - v.vector[index]));
  }

  multiply(v) {
    return Vec3.from(this.vector.map((x, index) => x * v.vector[index]));
  }

  multiplyBy(n) {
    return Vec3.from(this.vector.map((x) => x * n));
  }

  divideBy(n) {
    return Vec3.from(this.vector.map((x) => x / n));
  }

  length() {
    return Math.sqrt(this.#lengthSquared());
  }

  #lengthSquared() {
    return this.vector.reduce((acc, current) => acc + current * current, 0);
  }

  unit() {
    return this.divideBy(this.length());
  }
}

export class Point3 extends Vec3 {
  constructor(x, y, z) {
    super(x, y, z);
  }
}

export class Color3 extends Vec3 {
  constructor(x, y, z) {
    super(x, y, z);
  }
}
