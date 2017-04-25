class Application {
    constructor(width, height, canvas) {
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

        let density = 25;
        for (let row = 0, rows = Math.floor(this.height / density); row < rows; row++) {
            for (let col = 0, cols = Math.floor(this.width / density); col < cols; col++) {
                let x = col * density + Math.random() * density;
                let y = row * density + Math.random() * density;

                row == 0 && (y = 0);
                row == rows - 1 && (y = this.height);

                col == 0 && (x = 0);
                col == cols - 1 && (x = this.width);

                let z = Math.random() * 10;
                this.pointsMap[row + ',' + col] = this.points.add(x, y, z);
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
            }
        };

        renderTriangles(0, 0);
        return this;
    }

    update() {
        requestAnimationFrame(() => {
            this.render();
            this.update();
        });
        return this;
    }

    renderTriangle(a,b,c) {
        let points = [this.points.get(a), this.points.get(b), this.points.get(c)];
        let color = this.getColor(points);
        this.scene.fill('rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
        this.scene.stroke('rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
        this.scene.shape(points);
    }

    getColor(arr)  {
        let mouse = this.mouse();

        
        const x1 = arr[0].x,
            x2 = arr[1].x,
            x3 = arr[2].x,
            y1 = arr[0].y,
            y2 = arr[1].y,
            y3 = arr[2].y,
            z1 = arr[0].z,
            z2 = arr[1].z,
            z3 = arr[2].z,
            A = y1 * (z2 - z3) + y2 * (z3 - z1) + y3 * (z1 - z2),
            B = z1 * (x2 - x3) + z2 * (x3 - x1) + z3 * (x1 - x2),
            C = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2),
            D = -(x1 * (y2 * z3 - y3 * z2) + x2 * (y3 * z1 - y1 *z3) + x3 *(y1 * z2 - y2 * z1));

        const shiny = A*mouse.x + B*mouse.y + C*5 + D > 0;
        let norm = [A,B,C]; // ???

        let shade = 51;

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
