class AstroidalEllipsoid extends Shape {
    constructor(x, y, z){
        // c - Radius from centre of hole to centre of torus
        // a - Radius of tube
        super(x, y, z);
        this.slices = 16;
        this.segments = 16;
    }

    makePoints(){
        let x, y, z;

        for (var i = 0; i < this.slices; i++) {
            let u = i * Math.PI / this.slices; // theta

            for (var j = 0; j < this.segments; j++) {
                let v = j * 2 * Math.PI / this.segments; // phi

                x = Math.pow(Math.cos(u), 3) * Math.pow(Math.cos(v), 3);
                y = Math.pow(Math.sin(u), 3) * Math.pow(Math.cos(v), 3);
                z = Math.pow(Math.sin(v), 3);

                let p = new Vec3d(x, y, z);
                this.points.push(p);
            }
        }
    }
}
