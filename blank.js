class Blank extends Shape {
    constructor(x, y, z){
        super(x, y, z);
        this.slices = 16;
        this.segments = 16;
    }

    makePoints(){
        this.updateSpacing();
        for(let i=0; i<this.slices; i++){
            for(let j=0; j<this.segments; j++){
                let p = new Vec3d(1, 1, 1);
                this.points.push(p);
            }
        }
    }
}
