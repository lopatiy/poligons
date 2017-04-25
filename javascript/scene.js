class Scene {
    constructor(canvas) {
        this.canvas = canvas;
        this.cc = this.canvas.getContext('2d');
    }

    width() {
        return this.canvas.clientWidth
    };

    height() {
        return this.canvas.clientHeight
    };

    stroke(color) {
        !color && (color = 'nostroke');
        this.cc.strokeStyle = color
    };

    fill(color) {
        !color && (color = 'transparent');
        this.cc.fillStyle = color
    };

    point(x, y) {
        this.ellipse(x, y, 1)
    };

    ellipse(x, y, r) {
        this.cc.beginPath();
        this.cc.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
        this.cc.stroke();
    };

    shape(points) {
        this.cc.beginPath();
        this.cc.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.cc.lineTo(points[i].x, points[i].y);
        }
        this.cc.closePath();
        this.cc.fill();
        this.cc.stroke();
    };
}
