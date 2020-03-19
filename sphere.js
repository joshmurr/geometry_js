class Sphere extends Shape {
    constructor(x, y, z, radius){
        super(x, y, z);
        this.radius = radius;
    }

    makePoints(){
        let x, y, z;
        for(let i=0; i<this.slices+1; i++){
            let u = i * Math.PI / this.slices;
            for(let j=0; j<this.segments; j++){
                let v = j * 2 * Math.PI / this.slices;

                x = Math.sin(u) * Math.cos(v);
                y = Math.cos(u);
                z = -Math.sin(u) * Math.sin(v);

                let p = new Vec3d(x, y, z);
                this.points.push(p);
            }
        }
    }
}
