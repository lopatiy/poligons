function loaded() {
    let h = document.body.getBoundingClientRect().height,
        w = document.body.getBoundingClientRect().width;

    let app = new Application(w, h, document.getElementById('scene'))
        .calculateLayout()
        .update()
}
