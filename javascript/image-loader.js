function load(url, width, height, callback) {
    var image = document.createElement('img');
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        callback(ctx.getImageData(0, 0, width, height));
    };

    image.setAttribute('crossOrigin', '');
    image.src = url + '?' + new Date().getTime();
}