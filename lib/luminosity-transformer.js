function luminosity(colors) {
      
    return { r: Math.round(colors.r * .21),  g: Math.round(colors.g * .72), b: Math.round(colors.b * .07) };
}

module.exports = luminosity;