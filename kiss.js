class KissSurface extends Shape {
    constructor(x, y, z){
        // c - Radius from centre of hole to centre of torus
        // a - Radius of tube
        super(x, y, z);
    }

    makePoints(){
        let x, y, z;
        let s = this.scale;
        let a = 1;

        for (var i = 0; i < this._slices+1; i++) {
            let u = i * 2 * Math.PI / this._slices; // theta

            for (var j = 0; j < this._segments; j++) {
                let v = (j * 2 * Math.PI / this._segments) - Math.PI; // phi

                x = a * Math.pow(v,2) * Math.sqrt((1-v)*0.5) * Math.cos(u);
                y = a * Math.pow(v,2) * Math.sqrt((1-v)*0.5) * Math.sin(u);
                // DING-DONG Surface:
                // x = a * v * Math.sqrt((1-v)) * Math.cos(u);
                // y = a * v * Math.sqrt((1-v)) * Math.sin(u);
                z = a * v;

                let p = new Vec3d(x*s, y*s, z*s);
                this._points.push(p);
            }
        }
    }
}
