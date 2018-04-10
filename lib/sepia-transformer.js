function sepia(pixel) {

    const transPixel = {
        r: Math.round((pixel.r * .393) + (pixel.g * .769) + (pixel.b * .189)),
        g: Math.round((pixel.r * .349) + (pixel.g * .686) + (pixel.b * .168)),
        b: Math.round((pixel.r * .272) + (pixel.g * .534) + (pixel.b * .131))
    };

    if(transPixel.r > 255) transPixel.r = 255;
    if(transPixel.g > 255) transPixel.g = 255;
    if(transPixel.b > 255) transPixel.b = 255;

    return transPixel;
}

module.exports = sepia;

