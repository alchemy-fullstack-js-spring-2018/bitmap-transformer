
function invert(pixel) {
    return {
        r: 255 - pixel.r,
        g: 255 - pixel.g,
        b: 255 - pixel.b
    };
}

module.exports = invert;