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
    }

    render(once) {
        if (once) {
            this.layout.render();
        } else {
            this.layout.watch(0);
        }
    }

    addListeners() {
        document.querySelectorAll('.link').forEach((item) => {
            item.addEventListener('click', (event) => {
                document.querySelectorAll('.link').forEach((item) => {
                    item.classList.remove('active');
                });

                item.classList.add('active');
            }, true)
        })
    }
}
