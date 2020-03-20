class Cylinder extends Shape {
    constructor(x, y, z, radius, height){
        super(x, y, z);
        this._radius = radius;
        this._height = height;
    }

    makePoints(){
        let x, y, z;
        let s = this.scale;

        for(let i=0; i<this._slices+1; i++){
            let u = (i * this._height / this._slices) - this._height/2;
            for(let j=0; j<this._segments; j++){
                let v = (j * 2 * Math.PI / this._segments) - Math.PI;

                x = this._radius * Math.cos(v);
                y = this._radius * Math.sin(v);
                z = u;

                let p = new Vec3d(x*s, y*s, z*s);
                this._points.push(p);
            }
        }
    }
}
