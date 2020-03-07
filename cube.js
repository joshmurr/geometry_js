class Cube extends Shape {
    constructor(x, y, z, radius){
        super(x, y, z);
        this.radius = radius;
        this.slices = 12;
    }

    makePoints(){
        this.updateSpacing();
        for(let i=0; i<this.slices; i++){
            let z = (this.radius*2*Math.cos(Math.PI/4)/this.slices)*i;
            for(let j=0; j<this.segments; j++){
                let p = new Vec3d(Math.cos(this.spacing*j)*this.radius, Math.sin(this.spacing*j)*this.radius, z);
                this.points.push(p);
            }
        }
    }
}
