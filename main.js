import "./style.css";
import { Point3, Color3 } from "./src/core/Vec3.js";

const img = new Image();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const data = imageData.data;
for (let j = 0; j < canvas.height; j++){
  for (let i = 0; i < canvas.width; i++) {
    data[j*canvas.height*4+i*4] = i / canvas.width * 255;
    data[j*canvas.height*4+i*4 + 1] = (1 - j / canvas.width) * 255;
    data[j*canvas.height*4+i*4 + 2] = 0.25 * 255;
    data[j*canvas.height*4+i*4 + 3] = 1 * 255;
  }
}

console.log(data);
ctx.putImageData(imageData, 0, 0);

let p1 = new Point3(2, 2, 0);
let p2 = new Point3(3, -1, 5);

let c1 = new Color3(2, 0, 0);

console.log(p1.vector);
console.log(p2.vector);

console.log(Point3.dot(p1.unit(), p2.unit()));
console.log(Point3.dot(p2, p1));

console.log(Point3.cross(p1, p2));
console.log(Point3.cross(p2, p1));
console.log(Point3.cross(p1.unit(), p2.unit()));

console.log(c1.toRGB());
console.log(c1.toRGBA());
