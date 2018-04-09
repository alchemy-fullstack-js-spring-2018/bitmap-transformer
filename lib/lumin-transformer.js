
function lumin(pixel){

    const invertPixel = {};

    const sum = (0.07 * pixel.b) + (0.72 * pixel.g) + (0.21 * pixel.r);
    const avg = sum / 3;

    invertPixel.b = avg;
    invertPixel.g = avg;
    invertPixel.r = avg;

    return invertPixel;
    
}

module.exports = lumin;