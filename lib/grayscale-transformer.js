
function grayScale(pixel) {
    const average = (pixel.r + pixel.g + pixel.b) / 3;
    const grayscale = {};
    grayscale.r = grayscale.g = grayscale.b = average;
    //(Math.max(pixel.r, pixel.g, pixel.b) + Math.min(pixel.r, pixel.g, pixel.b)) / 2;

    return grayscale;
}

module.exports = grayScale;