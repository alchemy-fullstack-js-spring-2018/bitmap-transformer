function luminous(pixel) {
    const average = Math.round(pixel.r * 0.21 + pixel.g * 0.72 + pixel.b * 0.07);
    const luminosity = {};
    luminosity.r = luminosity.g = luminosity.b = average;
    
    if(luminosity.r > 255) luminosity.r = 255;
    if(luminosity.g > 255) luminosity.g = 255;
    if(luminosity.b > 255) luminosity.b = 255;

    return luminosity;
}

module.exports = luminous;