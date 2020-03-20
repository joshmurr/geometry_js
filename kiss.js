class KissSurface extends Shape {
    constructor(x, y, z){
        super(x, y, z);
    }

    makePoints(){
        let x, y, z;
        let s = this.scale;
        let a = 1;
        let numerator = (Math.PI/2)/this._segments;

        for (var i = 0; i < this._slices+1; i++) {
            let u = i * 2 * Math.PI / this._slices; // theta

            for (var j = 0; j < this._segments; j++) {
                let v = -numerator * j;

                let sq = Math.sqrt((1-v)*0.5);

                x = a * Math.pow(v,2) * sq * Math.cos(u);
                y = a * Math.pow(v,2) * sq * Math.sin(u);
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
