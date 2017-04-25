class Application {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.scene = new Scene(this.canvas);
    }

    render() {
        this.scene.stroke(false);
        let img = new URLSearchParams(document.location.search).get('img');
        if (img) {
            load(img, width, height, function (data) {
                this.scene.figure(Figures.DOTS, (x, y) => new Point(x, y), new ColorGetter(ColorGetterType.PIXEL_ARRAY, {
                    image: data,
                    width: data.width
                }));
            })
        } else {
            this.scene.figure(Figures.DOTS, (x, y) => new UVPoint(x, y), new ColorGetter(ColorGetterType.UV, {}));
        }
    }
}

const ColorGetterType = {PIXEL_ARRAY: 0, UV: 1, 0: 'PIXEL_ARRAY', 1: 'UV'};
function ColorGetter (type, args) {
    switch (type) {
        case ColorGetterType.UV:
            return (a, b, c) => {
                let grade = (a.h + b.h + c.h) / 3;

                let shade = Math.floor(grade / 10 * 20) + 40;
                return {
                    r: shade,
                    b: shade,
                    g: shade,
                    a: 255
                };
            };
        case ColorGetterType.PIXEL_ARRAY:
        default:
            return (a, b, c) => {
                var x = Math.floor((a.x + b.x + c.x) / 3),
                    y = Math.floor((a.y + b.y + c.y) / 3),
                    i = Math.floor((args.width * y * 4) + x * 4);

                return {
                    r: args.image.data[i],
                    g: args.image.data[i + 1],
                    b: args.image.data[i + 2],
                    a: args.image.data[i + 3]
                }
            }
    }
}
