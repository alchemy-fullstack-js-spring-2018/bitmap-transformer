const negative = (pixel) => {
    const grayPixel = (pixel.r + pixel.g + pixel.b) / 3;
    pixel.r = grayPixel;
    pixel.g = grayPixel;
    pixel.b = grayPixel;
    
    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;
    return pixel;
};

module.exports = negative;