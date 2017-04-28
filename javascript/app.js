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
        document.querySelectorAll('.link').forEach((item, index) =>
            item.addEventListener('click', this.changeLocation.bind(this, index)))
    }

    changeLocation(index) {
        let links = document.querySelectorAll('.link');
        links[this.location].classList.remove('active');
        links[index].classList.add('active');

        this.location = index;
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
