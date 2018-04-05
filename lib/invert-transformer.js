
function invert(pixel){

    const invertPixel = {};

    invertPixel.b = 255 - pixel.b;
    invertPixel.g = 255 - pixel.g;
    invertPixel.r = 255 - pixel.r;

    return invertPixel;
    
}

module.exports = invert;