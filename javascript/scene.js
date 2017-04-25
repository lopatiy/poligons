const Figures = {0: 'DOTS', DOTS: 0};

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

    figure(type, createPoint, getColor) {
        let w = this.width(),
            h = this.height();

        switch (type) {
            case Figures.DOTS :
                let points = {};
                let density = 25;

                for (let row = 1, rows = Math.floor(h / density); row < rows; row++) {
                    for (let col = 1, cols = Math.floor(w / density); col < cols; col++) {
                        let x = col * density + Math.random() * density;
                        let y = row * density + Math.random() * density;

                        row == 1 && (y = 0);
                        row == rows - 1 && (y = h);

                        col == 1 && (x = 0);
                        col == cols - 1 && (x = w);


                        let point = createPoint(x, y);
                        point.setOrigin(row, col);
                        points[row + ',' + col] = point;
                    }
                }

                let triangle = function (a, b, c) {
                    let color = getColor(a, b, c);
                    this.fill('rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
                    this.stroke('rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
                    this.shape([a, b, c]);
                };

                triangle = triangle.bind(this);


                let renderTriangles = function (x, y) {
                    let root = points[x + ',' + y],
                        right = points[x + ',' + (y + 1)],
                        left = points[(x + 1) + ',' + y],
                        opposite = points[(x + 1) + ',' + (y + 1)];

                    if (right && left) {
                        triangle(root, right, left);
                        triangle(opposite, right, left);
                    }

                    if (right) {
                        renderTriangles(right.origin.x, right.origin.y)
                    } else if (left) {
                        renderTriangles(left.origin.x, 1)
                    }
                };

                renderTriangles(1, 1);
                break;
        }
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
