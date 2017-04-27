class UVPointsList {
    constructor(){
        this.points = [];
        this.length = 0;
    }

    copy(){
        let list = new UVPointsList();
        list.points = this.points.slice(0);
        return list;
    }
    
    add(x,y,z,color){
        let i = this.length * 4;

        this.points[i++] = x;
        this.points[i++] = y;
        this.points[i++] = z;
        this.points[i++] = color;
        return this.length++;
    }

    set(index, point) {
        let i = index * 4;
        this.points[i++] = point.x;
        this.points[i++] = point.y;
        this.points[i++] = point.z;
        this.points[i++] = point.color;
        return this.length++;
    }
    
    update(i, property, value){
        let pi = (['x','y','z','color']).indexOf(property);
        this.points[i * 4 + pi] = value
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