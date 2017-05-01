function loaded() {
    let app = new Application();
    app.render();
    app.addListeners();
}

class Application {
    constructor() {
        let h = document.body.getBoundingClientRect().height,
            w = document.body.getBoundingClientRect().width;

        this.layout = new Layout(w, h, document.getElementById('scene'));
        this.layout.calculateLayout();
        this.location = 0;
    }

    render(once) {
        if (once) {
            this.layout.render();
        } else {
            this.layout.watch(0);
        }
    }

    addListeners() {
        document.querySelectorAll('.link:not(.caret)').forEach((item, index) =>
            item.addEventListener('click', this.changeLocation.bind(this, index)));

        document.body.addEventListener('mousewheel', (e) =>
            this.changeLocation(this.location + e.deltaY / Math.abs(e.deltaY)))
    }

    changeLocation(index) {
        let links = document.querySelectorAll('.link:not(.caret)');
        if(links[index]){
            links[this.location].classList.remove('active');
            links[index].classList.add('active');

            let link = document.querySelectorAll('.link.caret')[0];
            link.style.top = 'calc(' + index * 25 +'%  + ' + index * 5 + 'px)';

            this.location = index;
        }
    }
}

class LayoutContainer {
    constructor() {
        this.layouts = [];
    }

    length() {
        return this.layouts.length;
    }
}
