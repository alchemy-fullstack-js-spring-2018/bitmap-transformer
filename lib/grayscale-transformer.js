function grayscale(pixel) {
    const average = (pixel.r + pixel.g + pixel.b) / 3;
    const grayPixel = {};
    grayPixel.r = grayPixel.g = grayPixel.b = average;
    return grayPixel;
}

module.exports = grayscale;