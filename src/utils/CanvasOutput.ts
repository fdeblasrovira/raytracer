import { Color3 } from "../core/Vec3";
import { iOutput } from "../interfaces/iOuput";
import { toRGBA } from "./Color";

export class CanvasOutput implements iOutput {
  canvas: HTMLCanvasElement;
  context: any;
  data: Uint8ClampedArray;
  imageData: any;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");

    this.imageData = this.context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    this.data = this.imageData.data;
  }

  writeColor(color: Color3, x: number, y: number): void {
    let rgbaValues = toRGBA(color);

    let pixelNumber = x * this.canvas.height + y;
    let dataIndex = pixelNumber * 4;

    this.data[dataIndex] = rgbaValues[0];
    this.data[dataIndex + 1] = rgbaValues[1];
    this.data[dataIndex + 2] = rgbaValues[2];
    this.data[dataIndex + 3] = rgbaValues[3];
  }

  render(){
    this.context.putImageData(this.imageData, 0, 0);
  }
}
