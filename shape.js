class Shape{
    faces = [];
    indices = [];
    faceColours = [];

    constructor(x, y, z){
        // INVOKE SETTERS
        this.x = x;
        this.y = y;
        this.z = z;
        this.points = [];
        this.home = [];
        this.scale = 100;
        this.TMPscale = 1;
        this.slices = 32;
        this.segments = 32;
    }
    set x(val){
        this._x = val;
    }
    set y(val){
        this._y = val;
    }
    set z(val){
        this._z = val;
    }
    set slices(val){
        this._slices = val;
    }
    set segments(val){
        this._segments = val;
    }
    set scale(val){
        this._scalar = val;
    }
    set TMPscale(val){
        this._TMPscalar = val;
    }
    set points(points){
        this._points = [];
        for(let i=0; i<points.length; i++){
            this._points.push(points[i]);
        }
    }
    set home(points){
        this._home = [];
        for(let i=0; i<points.length; i++){
            this._home.push(points[i]);
        }
    }
    set animate(val){
        this._animate = val;
    }

    get points(){
        return this._points;
    }
    get home(){
        return this._home;
    }
    get scale(){
        return this._scalar;
    }
    get TMPscale(){
        return this._TMPscalar;
    }
    get slices(){
        return this._slices;
    }
    get segments(){
        return this._segments;
    }

    makeFaces(){
        // MAKE INDICES
        let v = 0;
        for (var i = 0; i < this._slices; i++) {
            for (var j = 0; j < this._segments; j++) {
                let next = (j+1) % this._segments;
                this.indices.push([v+j, v+j+this._segments, v+next+this._segments, v+next]);
                this.faceColours.push(Math.floor(Math.random()*255));
            }
            v = v + this._segments;
        }
        // MAKE FACES
        for(let i=0; i<this.indices.length; i++){
            let collectionIndices = this.indices[i];

            let face = [];
            for(let j=0; j<collectionIndices.length; j++){
                let ind = collectionIndices[j];
                face.push(this._points[ind]);
            }
            this.faces.push(face);
        }
    }

    rotate(thetaX, thetaY, thetaZ){
        this.xRotation = thetaX;
        this.yRotation = thetaY;
        this.zRotation = thetaZ;
    }

    // scale(p, s){
        // return new Vec3d(p.x*s, p.y*s, p.z*s);
    // }

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
        let target = [];
        for(let i=0; i<this._points.length; i++){
            // UPDATE HOME POINTS
            let p3d = this._home[i];

            if(this.xRotation) p3d = this.rotateX(p3d);
            if(this.yRotation) p3d = this.rotateY(p3d);
            if(this.zRotation) p3d = this.rotateZ(p3d);

            // ANIMATE TO HOME POINTS
            if(this._animate){
                // let currentPoint = this._points[i];
                let dir = p3d.subtract(this._points[i]);
                if(dir){
                    let m = dir.magnitude;
                    dir.normalize();
                    dir.multiply(m*0.015);
                    this._points[i].add(dir);
                    // this._points[i] = currentPoint;
                }
            } else {
                this._points[i].replace(p3d);
            }
        }
    }


    drawPoints(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this._points.length; i++){
            context.strokeStyle = "white";
            let point3d = this._points[i];
            z3d = point3d.z;
            //z3d -= 1;
            if (z3d < -FOV) z3d += 10;
            point3d.z = z3d;

            x3d = point3d.x;
            y3d = point3d.y;
            z3d = point3d.z + this._z;

            let scale = (FOV / (FOV + z3d));

            let x2d = ((x3d * scale) + HALF_WIDTH) + this._x;
            let y2d = ((y3d * scale) + HALF_HEIGHT) + this._y;

            context.beginPath();
            context.lineWidth = scale;
            context.moveTo(x2d, y2d);
            context.lineTo(x2d + scale*2, y2d);
            context.stroke();
        }
    }

    drawLines(context, FOV){
        let x3d, y3d, z3d;
        for(let i=0; i<this._slices+1; i++){
            let firstPoint;
            let firstScale;
            context.beginPath();
            context.strokeStyle = "gray";

            for(let j=0; j<this._segments; j++){
                let point3d = this._points[j + i*this._segments];
                z3d = point3d.z;
                //z3d -= 1;
                if (z3d < -FOV) z3d += 10;
                point3d.z = z3d;

                x3d = point3d.x;
                y3d = point3d.y;
                z3d = point3d.z + this._z;

                let scale = (FOV / (FOV + z3d));

                let x2d = ((x3d * scale) + HALF_WIDTH) + this._x;
                let y2d = ((y3d * scale) + HALF_HEIGHT) + this._y;

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
                z3d = point3d.z + this._z;

                let scale = (FOV / (FOV + z3d));

                let x2d = ((x3d * scale) + HALF_WIDTH) + this._x;
                let y2d = ((y3d * scale) + HALF_HEIGHT) + this._y;

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
                z3d = point3d.z + this._z;

                let scale = (FOV / (FOV + z3d));

                let x2d = ((x3d * scale) + HALF_WIDTH) + this._x;
                let y2d = ((y3d * scale) + HALF_HEIGHT) + this._y;

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
        for(let i=0; i<this._points.length; i++){
            let currentPoint = this._points[i];
            let newPoint = newPoints[i];
            let dir = newPoint.subtract(currentPoint);
            if(dir){
                let m = dir.magnitude;
                dir.normalize();
                dir.multiply(m*0.015);
                currentPoint.add(dir);
                this._points[i] = currentPoint;
            }
        }
    }
}
