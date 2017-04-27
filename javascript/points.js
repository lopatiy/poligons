class UVPointsList {
    constructor(){
        this.points = [];
        this.length = 0;
    }

    add(x,y,z,color){
        let i = this.length * 4;

        this.points[i++] = x;
        this.points[i++] = y;
        this.points[i++] = z;
        this.points[i++] = color;
        return this.length++;
    }

    get(i){
        i = i * 4;
        return {
            x: this.points[i],
            y: this.points[i+1],
            z: this.points[i+2],
            color: this.points[i+3]
        }
    }
}