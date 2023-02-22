export class Vec3 {
  vec: number[];
  constructor(x: number, y: number, z: number) {
    this.vec = [x, y, z];
  }

  static from(v: number[]): Vec3 {
    return new Vec3(v[0], v[1], v[2]);
  }

  static dot(u: Vec3, v: Vec3): number {
    return u.x * v.x + u.y * v.y + u.z * v.z;
  }

  static cross(u: Vec3, v: Vec3): Vec3 {
    return new Vec3(
      u.y * v.z - u.z * v.y,
      u.z * v.x - u.x * v.z,
      u.x * v.y - u.y * v.x
    );
  }

  get x(): number {
    return this.vec[0];
  }
  get y(): number {
    return this.vec[1];
  }
  get z(): number {
    return this.vec[2];
  }
  get vector(): number[] {
    return this.vec;
  }

  invert(): Vec3 {
    return Vec3.from(this.vector.map((x) => -1 * x));
  }

  add(v: Vec3): Vec3 {
    return Vec3.from(this.vector.map((x, index) => x + v.vector[index]));
  }

  substract(v: Vec3): Vec3 {
    return Vec3.from(this.vector.map((x, index) => x - v.vector[index]));
  }

  multiply(v: Vec3): Vec3 {
    return Vec3.from(this.vector.map((x, index) => x * v.vector[index]));
  }

  multiplyBy(n: number): Vec3 {
    return Vec3.from(this.vector.map((x) => x * n));
  }

  divideBy(n: number): Vec3 {
    return Vec3.from(this.vector.map((x) => x / n));
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this.vector.reduce((acc, current) => acc + current * current, 0);
  }

  unit(): Vec3 {
    return this.divideBy(this.length());
  }
}

export class Point3 extends Vec3 {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }
}

export class Color3 extends Vec3 {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }
}
