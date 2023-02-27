export class Viewport{
    vpWidth: number;
    vpHeight: number;
    aspectRatio: number
    dist: number;

    constructor(w: number, h: number, aspectRatio: number, dist: number){
        this.vpWidth = w;
        this.vpHeight = h;
        this.aspectRatio = aspectRatio;
        this.dist = dist;
    }

    get width(): number{
        return this.vpWidth
    }

    get height(): number{
        return this.vpHeight
    }

    get distance(): number{
        return this.dist
    }
}