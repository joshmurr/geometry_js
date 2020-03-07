class Sphere extends Shape {
    constructor(x, y, z, radius){
        super(x, y, z);
        this.radius = radius;
        this.slices = 20;
        this.segments = 20;
    }

    makePoints(){
        this.updateSpacing();
        for(let i=0; i<this.slices; i++){
            let z = this.radius*2 * Math.cos(this.spacing/2 * i);
            let s = this.radius*2 * Math.sin(this.spacing/2 * i);
            for(let j=0; j<this.segments; j++){
                let p = new Vec3d(Math.cos(this.spacing*j)*s, Math.sin(this.spacing*j)*s, z);
                this.points.push(p);
            }
        }
    }
}
