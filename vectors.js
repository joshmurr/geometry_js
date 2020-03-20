class Vec2d{
    x = 0;
    y = 0;

    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
    }
    get x(){
        return this.x;
    }
    get y(){
        return this.y;
    }
    set x(_x){
        this._x = _x;
    }
    set y(_y){
        this._y = _y;
    }
}

class Vec3d{
    x = 0;
    y = 0;
    z = 0;

    constructor(_x, _y, _z){
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }
    get x(){
        return this.x;
    }
    get y(){
        return this.y;
    }
    get z(){
        return this.z;
    }
    set x(_x){
        this.x = _x;
    }
    set y(_y){
        this.y = _y;
    }
    set z(_z){
        this.z = _z;
    }

    add(p){
        this.x += p.x;
        this.y += p.y;
        this.z += p.z;
    }

    subtract(p){
        return new Vec3d(this.x - p.x, this.y - p.y, this.z - p.z);
    }

    multiply(s){
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    get magnitude(){
        let m = this.magnitudeSquared;
        if(m == 0) return 0;
        else return Math.sqrt(m);
    }

    get magnitudeSquared(){
        return this.x*this.x + this.y*this.y + this.z*this.z;
    }

    normalize(){
        let m = this.magnitude;
        if(m == 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        } else {
            this.x /= m;
            this.y /= m;
            this.z /= m;
        }
    }
    
    copy(){
        return new Vec3d(this.x, this.y, this.z);
    }

    replace(p){
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
    }
}
