class Sphere extends Shape {
    constructor(x, y, z){
        super(x, y, z);
    }

    makePoints(){
        let x, y, z;
        let s = this.scale;
        for(let i=0; i<this._slices+1; i++){
            let u = i * Math.PI / this._slices;
            for(let j=0; j<this._segments; j++){
                let v = j * 2 * Math.PI / this._slices;

                x = Math.sin(u) * Math.cos(v);
                y = Math.cos(u);
                z = -Math.sin(u) * Math.sin(v);

                let p = new Vec3d(x*s, y*s, z*s);
                this._points.push(p);
            }
        }
    }
}
