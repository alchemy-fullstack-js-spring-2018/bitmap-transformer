function inverted(pixel) {
    const invertedPixel = {};
    invertedPixel.r = 255 - pixel.r;
    invertedPixel.g = 255 - pixel.g;
    invertedPixel.b = 255 - pixel.b;
    return invertedPixel;

}

module.exports = inverted;