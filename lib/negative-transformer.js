const negative = (pixel) => {
    const grayPixel = 255 - ((pixel.r + pixel.g + pixel.b) / 3);
    
    pixel.r = grayPixel;
    pixel.g = grayPixel;
    pixel.b = grayPixel;
    return pixel;
};

module.exports = negative;