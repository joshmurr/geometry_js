class BoysSurface extends Shape {
    constructor(x, y, z){
        super(x, y, z);
    }

    makePoints(){
        let x, y, z;
        let rootTwo = Math.sqrt(2);
        let s = this.scale;

        for (var i = 0; i < this._slices+1; i++) {
            let u = (i * Math.PI / this._slices) - Math.PI; // theta

            for (var j = 0; j < this._segments; j++) {
                let v = j * Math.PI / this._segments; // phi

                x = (rootTwo * Math.pow(Math.cos(v),2) * Math.cos(2*u) + Math.cos(u) * Math.sin(2*v)) / (2 - rootTwo * Math.sin(3*u) * Math.sin(2*v));
                y = (rootTwo * Math.pow(Math.cos(v),2) * Math.sin(2*u) - Math.sin(u) * Math.sin(2*v)) / (2 - rootTwo * Math.sin(3*u) * Math.sin(2*v));
                z = (3 * Math.pow(Math.cos(v),2)) / (2 - rootTwo * Math.sin(3*u)*Math.sin(2*v));
                

                let p = new Vec3d(x*s, y*s, z*s);
                this._points.push(p);
            }
        }
    }
}
