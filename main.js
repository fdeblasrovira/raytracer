import "./style.css";
import { Point3, Color3 } from "./src/core/Vec3.js";
import { Ray } from "./src/core/Ray.js";

const img = new Image();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const data = imageData.data;
for (let j = 0; j < canvas.height; j++){
  console.log((j/canvas.height *100) + "%")
  for (let i = 0; i < canvas.width; i++) {
    data[j*canvas.height*4+i*4] = i / canvas.width * 255;
    data[j*canvas.height*4+i*4 + 1] = (1 - j / canvas.width) * 255;
    data[j*canvas.height*4+i*4 + 2] = 0.25 * 255;
    data[j*canvas.height*4+i*4 + 3] = 1 * 255;
  }
}

ctx.putImageData(imageData, 0, 0);

let origin = new Point3(0, 1, 0);
let direction = new Point3(1, 1, 0);


let ray = new Ray(origin, direction.unit());
console.log(direction.unit())
console.log(ray.at(2))
console.log(ray.at(1.453790))

