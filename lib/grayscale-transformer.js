function grayscale(pixel) {
    const average = (pixel.r + pixel.g + pixel.b) / 3;
    const gray = {
        r: average, g: average, b: average
    };
    return gray;
}

module.exports = grayscale;