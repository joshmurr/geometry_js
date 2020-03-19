class Klein extends Shape {
    constructor(x, y, z){
        super(x, y, z);
    }

    makePoints(){
        let x, y, z;

        for (var i = 0; i < this.slices+1; i++) {
            let theta = i * Math.PI / this.slices;
            let u = theta * 2;

            for (var j = 0; j < this.segments; j++) {
                let v = j * 2 * Math.PI / this.segments;

                if (u < Math.PI){
                    x = 3 * Math.cos(u) * (1+Math.sin(u)) + (2*(1-Math.cos(u)/2)) * Math.cos(u) * Math.cos(v);
                    z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);

                } else {
                    x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
                    z = -8 * Math.sin(u);
                }
                y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

                let p = new Vec3d(x, y, z);
                this.points.push(p);
            }
        }
    }
}
