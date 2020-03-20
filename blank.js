class Blank extends Shape {
    constructor(x, y, z){
        super(x, y, z);
    }

    makePoints(){
        for(let i=0; i<this._slices+1; i++){
            for(let j=0; j<this._segments; j++){
                let p = new Vec3d(1, 1, 1);
                this._points.push(p);
            }
        }
    }
}
