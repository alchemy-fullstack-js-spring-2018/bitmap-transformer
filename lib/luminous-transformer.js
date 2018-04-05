function luminous(pixel) {
    const average = Math.round(pixel.r * 0.21 + pixel.g * 0.72 + pixel.b * 0.07);
    const luminosity = {};
    luminosity.r = luminosity.g = luminosity.b = average;
    return luminosity;
}

module.exports = luminous;