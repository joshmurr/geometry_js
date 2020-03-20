class Torus extends Shape {
    constructor(x, y, z, c, a){
        // c - Radius from centre of hole to centre of torus
        // a - Radius of tube
        super(x, y, z);
        this.c = c;
        this.a = a;
    }

    makePoints(){
        let x, y, z;
        
        let s = this.scale * 0.2;

        for (var i = 0; i < this._slices+1; i++) {
            let u = i * 2 * Math.PI / this._slices; // theta

            for (var j = 0; j < this._segments; j++) {
                let v = j * 2 * Math.PI / this._segments; // phi

                x = (this.c + this.a * Math.cos(v))*Math.cos(u);
                y = (this.c + this.a * Math.cos(v))*Math.sin(u);
                z = this.a * Math.sin(v);

                let p = new Vec3d(x * s, y * s, z * s);
                this._points.push(p);
            }
        }
    }
}
