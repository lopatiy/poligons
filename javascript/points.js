class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.origin = {};
    }

    setOrigin(x, y) {
        this.origin.x = x;
        this.origin.y = y;
    }
}

class UVPoint extends Point {
    constructor(x, y, h) {
        super(x, y);
        this.h = h ? h : Math.random()*10;
    }
}