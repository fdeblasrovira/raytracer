import "./styles/style.css";
import { Point3, Vec3 } from "./core/Vec3";
import { Scene } from "./core/Scene";
import { Sphere } from "./shapes/Sphere";
import { Viewport } from "./core/Viewport";
import { Camera } from "./core/Camera";
import { CanvasOutput } from "./utils/CanvasOutput";

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
scene.addCamera(camera2);
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