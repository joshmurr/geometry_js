class Cylinder extends Shape {
    constructor(x, y, z, radius, height){
        super(x, y, z);
        this.radius = radius;
        this.height = height;
        this.segments = 32;
        this.slices = 32;
    }

    makePoints(){
        this.updateSpacing();
        let x, y, z;

        for(let i=0; i<this.slices; i++){
            let u = (i * this.height / this.slices) - this.height/2;
            for(let j=0; j<this.segments; j++){
                let v = j * 2 * Math.PI / this.segments;

                x = this.radius * Math.cos(v);
                y = this.radius * Math.sin(v);
                z = u;

                let p = new Vec3d(x, y, z);
                this.points.push(p);
            }
        }
    }
}
