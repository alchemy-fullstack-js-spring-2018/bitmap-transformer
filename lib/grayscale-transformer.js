const grayscale = (pixel) => {
    const grayPixel = (pixel.r + pixel.g + pixel.b) / 3;
    pixel.r = grayPixel;
    pixel.g = grayPixel;
    pixel.b = grayPixel;
    return pixel;
};

module.exports = grayscale;