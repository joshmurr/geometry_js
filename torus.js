class Torus extends Shape {
    constructor(x, y, z, c, a){
        // c - Radius from centre of hole to centre of torus
        // a - Radius of tube
        super(x, y, z);
        this.slices = 16;
        this.segments = 16;
        this.c = c;
        this.a = a;
    }

    makePoints(){
        let x, y, z;

        for (var i = 0; i < this.slices; i++) {
            let u = i * 2 * Math.PI / this.slices; // theta

            for (var j = 0; j < this.segments; j++) {
                let v = j * 2 * Math.PI / this.segments; // phi

                x = (this.c + this.a * Math.cos(v))*Math.cos(u);
                y = (this.c + this.a * Math.cos(v))*Math.sin(u);
                z = this.a * Math.sin(v)

                let p = new Vec3d(x, y, z);
                this.points.push(p);
            }
        }
    }
}
