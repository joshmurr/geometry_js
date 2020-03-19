class Shape{
    x;
    y;
    z;
    PHI = 1.618033988749895;
    points = [];
    indices = [];
    faces = [];
    faceColours = [];
    xRotation = 0;
    yRotation = 0;
    zRotation = 0;
    scalar = 100;
    radius;
    segments = 32;
    slices = 32;

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
    set scale(val){
        this.scalar = val;
    }
    set points(points){
        this.points = [];
        for(let i=0; i<points.length; i++){
            this.point.push(points[i]);
        }
    }

    get points(){
        return this.points;
    }

    makeFaces(){
        // MAKE INDICES
        let v = 0;
        for (var i = 0; i < this.slices; i++) {
            for (var j = 0; j < this.segments; j++) {
                let next = (j+1) % this.segments;
                this.indices.push([v+j, v+j+this.segments, v+next+this.segments, v+next]);
                this.faceColours.push(Math.floor(Math.random()*255));
            }
            v = v + this.segments;
        }
        // MAKE FACES
        for(let i=0; i<this.indices.length; i++){
            let collectionIndices = this.indices[i];

            let face = [];
            for(let j=0; j<collectionIndices.length; j++){
                let ind = collectionIndices[j];
                face.push(this.points[ind]);
            }
            this.faces.push(face);
        }
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

    update(){
        for(let i=0; i<this.points.length; i++){
            let p3d = this.points[i];
            if(this.xRotation) p3d = this.rotateX(p3d);
            if(this.yRotation) p3d = this.rotateY(p3d);
            if(this.zRotation) p3d = this.rotateZ(p3d);
            if(this.scalar) {
                p3d.x *= this.scalar;
                p3d.y *= this.scalar;
                p3d.z *= this.scalar;
            }
        }
        this.scalar = null;
    }


    drawPoints(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this.points.length; i++){
            context.strokeStyle = "white";
            let point3d = this.points[i];
            z3d = point3d.z;
            //z3d -= 1;
            if (z3d < -FOV) z3d += 10;
            point3d.z = z3d;

            x3d = point3d.x;
            y3d = point3d.y;
            z3d = point3d.z + this.z;

            let scale = (FOV / (FOV + z3d));

            let x2d = ((x3d * scale) + HALF_WIDTH / 2) + this.x;
            let y2d = ((y3d * scale) + HALF_HEIGHT) + this.y;

            context.beginPath();
            context.lineWidth = scale;
            context.moveTo(x2d, y2d);
            context.lineTo(x2d + scale*2, y2d);
            context.stroke();
        }
    }

    drawLines(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this.slices+1; i++){
            let firstPoint;
            let firstScale;
            context.beginPath();
            context.strokeStyle = "gray";

            for(let j=0; j<this.segments; j++){
                let point3d = this.points[j + i*this.segments];
                z3d = point3d.z;
                //z3d -= 1;
                if (z3d < -FOV) z3d += 10;
                point3d.z = z3d;

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

    drawWireframe(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this.faces.length; i++){
            let face = this.faces[i];


            let firstPoint;
            let firstScale;
            context.beginPath();
            context.strokeStyle = "blue";

            for(let j=0; j<face.length; j++){
                let point3d = face[j];
                if(point3d == null) break;
                z3d = point3d.z;
                //z3d -= 1;
                if (z3d < -FOV) z3d += 10;
                point3d.z = z3d;

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

    drawFaces(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this.faces.length; i++){
            let face = this.faces[i];


            let firstPoint;
            let firstScale;

            context.beginPath();
            let randomColour = "rgba(" + Math.floor(Math.random()*255) + ","+ Math.floor(Math.random()*255) + ","+ Math.floor(Math.random()*255) +",0.5)";
            context.fillStyle = randomColour;

            for(let j=0; j<face.length; j++){
                let point3d = face[j];
                if(point3d == null) break;
                z3d = point3d.z;
                //z3d -= 1;
                if (z3d < -FOV) z3d += 10;
                point3d.z = z3d;

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

                context.fillStyle = "rgba(0,0," + this.faceColours[i] + ",1)";
                context.lineWidth = scale;
                context.lineTo(x2d + scale, y2d);
            }
            context.lineTo(firstPoint.x + firstScale, firstPoint.y);
            context.closePath();
            context.fill();
        }
    }

    animateTo(newPoints){
        for(let i=0; i<this.points.length; i++){
            let currentPoint = this.points[i];
            let newPoint = newPoints[i];
            let dir = newPoint.subtract(currentPoint);
            if(dir){
                let m = dir.magnitude;
                dir.normalize();
                dir.multiply(m*0.015);
                currentPoint.add(dir);
                this.points[i] = currentPoint;
            }
        }
    }
}
