class Prism extends Shape {
    constructor(x, y, z, radius, segments, slices){
        super(x, y, z);
        this.radius = radius;
        this.segments = segments;
        this.slices = slices;
    }

    makePoints(){
        this.updateSpacing();
        for(let i=0; i<this.slices; i++){
            let z = Math.cos(this.spacing/2*i)*this.radius*2;
            for(let j=0; j<this.segments; j++){
                let p = new Vec3d(Math.cos(this.spacing*j)*this.radius, Math.sin(this.spacing*j)*this.radius, z);
                this.points.push(p);
            }
        }
    }
}
