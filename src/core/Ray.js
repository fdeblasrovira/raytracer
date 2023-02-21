export class Ray {
  constructor(originVector, directionVector) {
    this.originVector = originVector;
    this.directionVector = directionVector;
  }

  get origin() {
    return this.originVector;
  }
  get direction() {
    return this.directionVector;
  }

  // P(t)=A+tb
  at(t) {
    return this.direction.multiplyBy(t).add(this.originVector);
  }

  checkCollision(object){
    return object.checkCollision(this)
  }
}