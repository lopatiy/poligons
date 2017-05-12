function loaded() {
    let app = new Application();
    app.render();
    app.addListeners();
}

class Application {
    constructor() {
        let h = document.body.scrollHeight,
            w = document.body.getBoundingClientRect().width;

        this.layout = new Layout(w, h, document.getElementById('scene'));
        this.layout.calculateLayout();

        this.allowLocationChange = 1;
        this.location = 0;

        document.querySelectorAll('.page').forEach((item, index) => {
            index == 0 && item.classList.add('active');
            item.id = 'page-' + index;
        });

        this.disableScroll()
    }

    preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    // left: 37, up: 38, right: 39, down: 40,
    // space bar: 32, page up: 33, page down: 34, end: 35, home: 36
    preventDefaultForScrollKeys(e) {
        if (({37: 1, 38: 1, 39: 1, 40: 1})[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    }

    disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        window.ontouchmove  = this.preventDefault; // mobile
        document.onkeydown  = this.preventDefaultForScrollKeys;
    }

    render(once) {
        once ? this.layout.render() : this.layout.watch(0);
    }

    addListeners() {
        document.querySelectorAll('.link').forEach((item, index) =>
            item.addEventListener('click', this.changeLocation.bind(this, index)));
        document.body.addEventListener('mousewheel', (e) => {
            let dir = e.deltaY / Math.abs(e.deltaY);
            this.changeLocation(this.location + dir);
        })
    }

    changeLocation(index) {
        if (this.allowLocationChange) {
            this.allowLocationChange = false;
            let links = document.querySelectorAll('.link'),
                pages = document.querySelectorAll('.page');

            if (links[index]) {
                links[this.location].classList.remove('active');
                pages[this.location].classList.remove('active');

                links[index].classList.add('active');
                pages[index].classList.add('active');

                let link = document.querySelectorAll('.caret')[0];
                link.style.top = 'calc(' + index * 25 + '% + 1px)';

                this.location = index;

                let scroll = document.getElementsByClassName('scene')[0];
                scroll.scrollTop = scroll.getBoundingClientRect().height * index;
            }
            setTimeout(()=>this.allowLocationChange = true, 500);
        }
    }
}