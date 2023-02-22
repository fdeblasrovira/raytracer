import "./styles/style.css";
import { Point3, Color3, Vec3 } from "./core/Vec3";
import { Ray } from "./core/Ray";
import { lerp, toRGBA } from "./utils/Color";
import { Sphere } from "./shapes/Sphere";

function rayColor(ray: Ray) {
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
}
// Image
const aspectRatio = 16.0 / 9.0;
const imageWidth = 480;
const imageHeight = Math.round(imageWidth / aspectRatio);

// Camera
const viewportHeight = 2;
const viewportWidth = aspectRatio * viewportHeight;
const focalLength = 1;

let origin = new Point3(0, 0, 0);
const horizontal = new Vec3(viewportWidth, 0, 0);
const vertical = new Vec3(0, viewportHeight, 0);

// lower_left_corner = origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length);
const lowerLeftPoint = origin
  .substract(horizontal.divideBy(2))
  .substract(vertical.divideBy(2))
  .substract(new Vec3(0, 0, focalLength));

const img = new Image();
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx: any = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
const data = imageData.data;

let sphere = new Sphere(new Point3(0, 0, -1), 0.5);
function render() {
  let counter = 0;
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
