class Layout {
    constructor(width, height, canvas) {
        this.maxZ = 10;

        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scene = new Scene(this.canvas);

        this.mousePosition = {
            x: this.width / 2,
            y: this.height / 2
        };

        document.body.addEventListener('mousemove', (event)=> {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
        });
    }

    calculateLayout() {
        this.points = new UVPointsList();
        this.pointsMap = {};

        let narrow = 15;
        if(this.width > this.height){
            this.rows = narrow;
            this.cols = Math.ceil(this.width/this.height * this.rows);
        } else {
            this.cols = narrow;
            this.rows = Math.ceil(this.height/this.width * this.cols);
        }

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {

                let rowDelta = this.width/this.cols;
                let colDelta = this.height/this.rows;
                
                let x,y,z,color;
                x = col * colDelta + Math.random() * colDelta;
                y = row * rowDelta + Math.random() * rowDelta;
                z = Math.random() * this.maxZ;

                row == 0 && (y = 0);
                row == this.rows - 1 && (y = this.height);

                col == 0 && (x = 0);
                col == this.cols - 1 && (x = this.width);

                this.pointsMap[row + ',' + col] = this.points.add(x, y, z, color);
            }
        }
        return this;
    }

    render() {
        let renderTriangles = (row, col) => {
            let root = this.pointsMap[row + ',' + col],
                right = this.pointsMap[row + ',' + (col + 1)],
                left = this.pointsMap[(row + 1) + ',' + col],
                opposite = this.pointsMap[(row + 1) + ',' + (col + 1)];

            if (right != undefined && left != undefined) {
                this.renderTriangle(root, right, left);
                this.renderTriangle(opposite, right, left);
            }

            if (right != undefined) {
                renderTriangles(row, col + 1)
            } else if (left != undefined) {
                renderTriangles(row + 1, 0)
            } else {
                return 0;
            }
        };

        renderTriangles(0, 0);
        return this;
    }

    watch() {
        const update = () =>
            requestAnimationFrame(() => {
                this.render();
                setTimeout(update.bind(this), 5);
            });
        update();
        return this;
    }

    renderTriangle(a,b,c) {
        let points = [this.points.get(a), this.points.get(b), this.points.get(c)];
        let color = this.getColor(points);
        this.scene.fill('rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
        this.scene.stroke('rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
        this.scene.shape(points);
    }

    getColor(arr) {
        let mouse = this.mouse();

        let x1 = arr[0].x, x2 = arr[1].x, x3 = arr[2].x,
            y1 = arr[0].y, y2 = arr[1].y, y3 = arr[2].y,
            z1 = arr[0].z, z2 = arr[1].z, z3 = arr[2].z,
            A = y1 * (z2 - z3) + y2 * (z3 - z1) + y3 * (z1 - z2),
            B = z1 * (x2 - x3) + z2 * (x3 - x1) + z3 * (x1 - x2),
            C = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2),
            vec = {x: x1 - mouse.x, y: y1 - mouse.y, z: z1 - 100},
            sin = Math.abs(A * vec.x + B * vec.y + C * vec.z) / (Math.sqrt(A * A + B * B + C * C) * Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z)),
            shade = Math.ceil(sin * 50 + 30);

        return {
            r: shade,
            b: shade,
            g: shade,
            a: 255
        };
    };

    mouse(){
        return {x: this.mousePosition.x, y: this.mousePosition.y}
    }
}
