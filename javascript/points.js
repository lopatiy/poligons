class UVPointsList {
    constructor(){
        this.points = [];
        this.length = 0;
    }

    add(x,y,z,row,col){
        let i = this.length * 5;

        this.points[i++] = x;
        this.points[i++] = y;
        this.points[i++] = z;
        this.points[i++] = row;
        this.points[i++] = col;
        return this.length++;
    }

    get(i){
        i = i * 5;
        return {
            x: this.points[i],
            y: this.points[i+1],
            z: this.points[i+2],
            row: this.points[i+3],
            col: this.points[i+4]
        }
    }
}