function loaded() {
    let h = document.body.getBoundingClientRect().height,
        w = document.body.getBoundingClientRect().width;

    const app = new Application(w, h, document.getElementById('scene'));
    app.render();
}
