import "./style.css";
import { Point3, Color3, Vec3 } from "./src/core/Vec3.js";
import { Ray } from "./src/core/Ray.js";
import { lerp, toRGBA } from "./src/utils/Color.js";

function rayColor(ray) {
  const yComponent = ray.direction.unit().y;

  // We need the value to be between 0 and 1.
  // The Y component needs to be scaled from (-1 ~ 1) to (0 ~ 1)
  const y = 0.5 * (yComponent + 1.0);
  return lerp(new Color3(1, 1, 1), new Color3(0.5, 0.7, 1), y);
}

function writeColor(data, color, pixelNumber) {
  let rgbaValues = toRGBA(color);

  let dataIndex = pixelNumber * 4;

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
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
const data = imageData.data;

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
btn1.addEventListener("click", moveUp);
btn2.addEventListener("click", moveDown);

function moveUp() {
  origin = origin.add(new Vec3(0, 1, 0));
  render();
  ctx.putImageData(imageData, 0, 0);
}
function moveDown() {
  origin = origin.add(new Vec3(0, -1, 0));
  render();
  ctx.putImageData(imageData, 0, 0);
}

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
