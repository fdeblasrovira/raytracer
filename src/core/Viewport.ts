export class Viewport{
    width: number;
    height: number;
    aspectRatio: number
    distance: number;

    constructor(w: number, h: number, dist: number){
        this.width = w;
        this.height = h;
        this.aspectRatio = w/h;
        this.distance = dist;
    }
}