function invert(colors) {
    return { r: 255 - colors.r, g: 255 - colors.g, b: 255 - colors.b };
}

module.exports = invert;