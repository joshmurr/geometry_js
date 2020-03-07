class Shape{
    x;
    y;
    z;
    PHI = 1.618033988749895;
    points = [];
    xRotation = 0;
    yRotation = 0;
    zRotation = 0;
    radius;
    segments = 4;
    slices = 4;
    spacing = (Math.PI*2)/this.segments;

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set slices(val){
        this.slices = val;
    }
    set segments(val){
        this.segments = val;
    }

    updateSpacing(){
        this.spacing = (Math.PI*2)/this.segments;
    }

    rotate(thetaX, thetaY, thetaZ){
        this.xRotation = thetaX;
        this.yRotation = thetaY;
        this.zRotation = thetaZ;
    }

    rotateX(p3d) {
        let x = p3d.x; 
        let z = p3d.z; 

        let cosRY = Math.cos(this.xRotation);
        let sinRY = Math.sin(this.xRotation);

        let tempz = z; 
        let tempx = x;

        x = (tempx*cosRY)+(tempz*sinRY);
        z = (tempx*-sinRY)+(tempz*cosRY);

        p3d.x = x;
        p3d.z = z;

        return p3d;
    }

    rotateY(p3d) {
        let y = p3d.y;
        let z = p3d.z;

        let cosRX = Math.cos(this.yRotation);
        let sinRX = Math.sin(this.yRotation);

        let tempz = z; 
        let tempy = y;

        y = (tempy*cosRX)+(tempz*sinRX);
        z = (tempy*-sinRX)+(tempz*cosRX);

        p3d.y = y;
        p3d.z = z;

        return p3d;
    }

    rotateZ(p3d) {
        let x = p3d.x;
        let y = p3d.y;

        let cosRZ = Math.cos(this.zRotation);
        let sinRZ = Math.sin(this.zRotation);

        let tempx = x; 
        let tempy = y;

        x = (tempx*cosRZ)+(tempy*sinRZ);
        y = (tempx*-sinRZ)+(tempy*cosRZ);

        p3d.x = x;
        p3d.y = y;

        return p3d;
    }

    scale(scalar){
        for(let i=0; i<this.points.length; i++){
            let p = this.points[i];
            p.x *= scalar;
            p.y *= scalar;
            p.z *= scalar;
        }

    }

    drawPoints(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this.points.length; i++){
            context.strokeStyle = "red";
            let point3d = this.points[i];
            z3d = point3d.z;
            //z3d -= 1;
            if (z3d < -FOV) z3d += 10;
            point3d.z = z3d;

            point3d = this.rotateX(point3d);
            point3d = this.rotateY(point3d);
            point3d = this.rotateZ(point3d);

            x3d = point3d.x;
            y3d = point3d.y;
            z3d = point3d.z + this.z;

            let scale = (FOV / (FOV + z3d));

            let x2d = ((x3d * scale) + HALF_WIDTH / 2) + this.x;
            let y2d = ((y3d * scale) + HALF_HEIGHT) + this.y;

            context.lineWidth = scale;
            context.moveTo(x2d, y2d);
            context.lineTo(x2d + scale, y2d);
            context.stroke();
        }
    }

    drawLines(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this.slices; i++){
            let firstPoint;
            let firstScale;
            context.beginPath();
            context.strokeStyle = "blue";

            for(let j=0; j<this.segments; j++){
                let point3d = this.points[j + i*this.segments];
                z3d = point3d.z;
                //z3d -= 1;
                if (z3d < -FOV) z3d += 10;
                point3d.z = z3d;

                point3d = this.rotateX(point3d);
                point3d = this.rotateY(point3d);
                point3d = this.rotateZ(point3d);

                x3d = point3d.x;
                y3d = point3d.y;
                z3d = point3d.z + this.z;

                let scale = (FOV / (FOV + z3d));

                let x2d = ((x3d * scale) + HALF_WIDTH / 2) + this.x;
                let y2d = ((y3d * scale) + HALF_HEIGHT) + this.y;

                if(!j) {
                    firstPoint = new Vec2d(x2d, y2d);
                    firstScale = scale;
                }

                context.lineWidth = scale;
                context.lineTo(x2d + scale, y2d);
            }
            context.lineTo(firstPoint.x + firstScale, firstPoint.y);
            context.stroke();
        }
    }
}
