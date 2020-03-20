class AstroidalEllipsoid extends Shape {
    constructor(x, y, z){
        // c - Radius from centre of hole to centre of torus
        // a - Radius of tube
        super(x, y, z);
    }

    makePoints(){
        let x, y, z;
        let s = this.scale;

        for (var i = 0; i < this._slices+1; i++) {
            let u = i * Math.PI / this._slices; // theta

            for (var j = 0; j < this._segments; j++) {
                let v = j * 2 * Math.PI / this._segments; // phi

                x = Math.pow(Math.cos(u), 3) * Math.pow(Math.cos(v), 3);
                y = Math.pow(Math.sin(u), 3) * Math.pow(Math.cos(v), 3);
                z = Math.pow(Math.sin(v), 3);

                let p = new Vec3d(x*s, y*s, z*s);
                this._points.push(p);
            }
        }
    }
}
