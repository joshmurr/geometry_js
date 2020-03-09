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

    /*
    add: function(v2) {
        return vector.create(this._x+v2.getX(), this._y+v2.getY());
    },

    subtract: function(v2) {
        return vector.create(this._x-v2.getX(), this._y-v2.getY());
    },

    multiply: function(val){
        return vector.create(this._x*val, this._y*val);
    },

    divide: function(val){
        return vector.create(this._x/val, this._y/val);
    },
    */

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
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }

    normalize(){
        let m = this.magnitude;
        this.x /= m;
        this.y /= m;
        this.z /= m;
    }

}
