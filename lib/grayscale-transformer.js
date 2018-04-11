function grayscale(colors) {
    const average = ((colors.r + colors.g + colors.b) / 3);
    return { r: average, g: average, b: average };
}

module.exports = grayscale;