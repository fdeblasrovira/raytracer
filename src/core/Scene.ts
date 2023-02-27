import { iHittable } from "../interfaces/iHittable";
import { iOutput } from "../interfaces/iOuput";
import { Camera } from "./Camera";
import { Ray } from "./Ray";
import { Color3, Vec3 } from "./Vec3";

export class Scene {
  cameras: Camera[];
  currentCamera: any;

  objects: iHittable[];

  constructor() {
    this.cameras = [];
    this.objects = [];
  }

  // Returns the index of the camera
  addCamera(cam: Camera): number {
    this.cameras.push(cam);
    return this.cameras.length - 1;
  }

  useCamera(index: number) {
    this.currentCamera = this.cameras[index];
  }

  nextCamera(): void {
    let currentIndex = this.cameras.indexOf(this.currentCamera);
    console.log(currentIndex)
    if (currentIndex + 1 == this.cameras.length) this.useCamera(0)
    else this.useCamera(currentIndex + 1)
  }

  instantiate(object: iHittable): void {
    this.objects.push(object);
  }

  render(output: iOutput) {
    // lower_left_corner = origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length);
    const horizontal = new Vec3(this.currentCamera.viewport.width, 0, 0);
    const vertical = new Vec3(0, this.currentCamera.viewport.height, 0).inverse();

    console.log(this.currentCamera.direction.inverse);
    console.log(this.currentCamera.viewport.distance);
    const lowerLeftPoint = this.currentCamera.position
      .substract(horizontal.divideBy(2))
      .substract(vertical.divideBy(2))
      .substract(
        new Vec3(0, 0, this.currentCamera.viewport.distance).multiply(
          this.currentCamera.direction.inverse()
        )
      );

    //for (let j = output.height - 1; j >= 0; --j) {
      for (let j = 0; j < output.height; j++){
      //console.log((j / output.height) * 100 + "%");

      for (let i = 0; i < output.width; i++) {
        let closestDistance: number = Infinity;
        let closestObject: any = null;
        let u = i / (output.width - 1);
        let v = j / (output.height - 1);

        let ray = new Ray(
          this.currentCamera.position,
          lowerLeftPoint
            .add(horizontal.multiplyBy(u))
            .add(vertical.multiplyBy(v))
            .substract(this.currentCamera.position)
        );

        let finalColor: Color3 = this.currentCamera.getBackground(ray.direction);

        this.objects.forEach((element) => {
          let collision = ray.checkRayCollision(element,1,10);
          if (collision > 0) {
            // Only count hits that collide with the outside surface of an object
            if (Vec3.dot(this.currentCamera.direction, element.normalAt(ray.at(collision))) < 0){
              if (collision < closestDistance){
                closestDistance = collision;
                closestObject = element;
              }
            }
          }
        });

        if (closestObject !== null) finalColor = closestObject.colorAt(ray.at(closestDistance));
        
        output.writeColor(i, j, finalColor);
      }
    }

    output.render();
  }
}
