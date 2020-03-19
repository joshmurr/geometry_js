class Blank extends Shape {
    constructor(x, y, z){
        super(x, y, z);
    }

    makePoints(){
        this.updateSpacing();
        for(let i=0; i<this.slices+1; i++){
            for(let j=0; j<this.segments; j++){
                let p = new Vec3d(1, 1, 1);
                this.points.push(p);
            }
        }
    }
}
