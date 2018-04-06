function lumGray(pixel) {
    const average = Math.round(pixel.r * 0.21 + pixel.g * 0.72 + pixel.b * 0.07);
    const lumGrayPixel = {};
    lumGrayPixel.r = lumGrayPixel.g = lumGrayPixel.b = average;
    return lumGrayPixel;
}

module.exports = lumGray;