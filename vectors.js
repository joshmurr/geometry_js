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
}
