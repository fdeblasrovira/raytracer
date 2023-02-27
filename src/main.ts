import "./styles/style.css";
import { Point3, Color3, Vec3 } from "./core/Vec3";
import { Scene } from "./core/Scene";
import { Ray } from "./core/Ray";
import { lerp, toRGBA } from "./utils/Color";
import { Sphere } from "./shapes/Sphere";
import { Viewport } from "./core/Viewport";
import { Camera } from "./core/Camera";
import { CanvasOutput } from "./utils/CanvasOutput";

/* function rayColor(ray: Ray) {
  let collision = ray.checkRayCollision(sphere);
  if (collision > 0) {
    let normal = ray.at(collision).substract(sphere.position).unit();
    return normal.add(new Vec3(1, 1, 1)).multiplyBy(0.5);
  }

  const yComponent = ray.direction.unit().y;

  // We need the value to be between 0 and 1.
  // The Y component needs to be scaled from (-1 ~ 1) to (0 ~ 1)
  const y = 0.5 * (yComponent + 1.0);
  return lerp(new Color3(1, 1, 1), new Color3(0.5, 0.7, 1), y);
}

function writeColor(
  data: Uint8ClampedArray,
  color: Color3,
  pixelNumber: number
) {
  let rgbaValues = toRGBA(color);

  let dataIndex: number = pixelNumber * 4;

  data[dataIndex] = rgbaValues[0];
  data[dataIndex + 1] = rgbaValues[1];
  data[dataIndex + 2] = rgbaValues[2];
  data[dataIndex + 3] = rgbaValues[3];
} */

const origin = new Point3(0, 0, 0);

// Create Viewport and Camera
const vpHeight = 2;
const vpAspectRatio = 16 / 9;
const vp = new Viewport(vpHeight * vpAspectRatio, vpHeight, vpAspectRatio, 1);

const camera1 = new Camera(origin, new Vec3(0, 0, -1), vp);
const camera2 = new Camera(new Point3(0,0,-3), new Vec3(0,0,1), vp);

// We will output the image to canvas
let imageHeight = 480;
let imageWidth = imageHeight * vpAspectRatio;
const canvasElem = <HTMLCanvasElement>document.getElementById("canvas");
const canvas = new CanvasOutput(canvasElem, imageWidth, imageHeight);

// Create Scene and add camera
const scene = new Scene();
const cameraId1 = scene.addCamera(camera1);
const cameraId2 = scene.addCamera(camera2);
scene.useCamera(cameraId1);

// Instantiate a simple sphere
let sphere = new Sphere(new Point3(0, 0, -1), 0.5);
scene.instantiate(sphere);

// Render the scene
scene.render(canvas);

// Utility buttons
document.getElementById("cameraButton")?.addEventListener("click", function(){
  scene.nextCamera();
  scene.render(canvas);
});

/* function render() {
  // let counter = 0;
  for (let j = imageHeight - 1; j >= 0; j--) {
    //console.log((j / imageHeight) * 100 + "%");
    for (let i = 0; i < imageWidth; i++) {
      let u = i / (imageWidth - 1);
      let v = j / (imageHeight - 1);

      // ray r(origin, lower_left_corner + u*horizontal + v*vertical - origin);
      let ray = new Ray(
        origin,
        lowerLeftPoint
          .add(horizontal.multiplyBy(u))
          .add(vertical.multiplyBy(v))
          .substract(origin)
      );
      let finalColor = rayColor(ray);

      writeColor(data, finalColor, counter);
      counter++;
    }
  }
}

render();
ctx.putImageData(imageData, 0, 0);
 */