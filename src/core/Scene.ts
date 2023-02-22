import { iHittable } from "../interfaces/iHittable";
import { Camera } from "./Camera";

export class Scene{
    cameras: Camera[];
    currentCamera?: Camera;

    objects: iHittable[];

    constructor(){
        this.cameras = [];
        this.objects = [];
    }

    // Returns the index of the camera
    addCamera(cam: Camera): number{
        this.cameras.push(cam);
        return this.cameras.length - 1;
    }

    useCamera(index: number){
        this.currentCamera = this.cameras[index];
    }

    render(){

    }
}