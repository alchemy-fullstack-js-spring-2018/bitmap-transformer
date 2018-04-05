const invertFunction = (pixel) => {
    pixel.r = 255 - pixel.r;
    pixel.g = 255 - pixel.g;
    pixel.b = 255 - pixel.b;
    return pixel;
};


module.exports = invertFunction;