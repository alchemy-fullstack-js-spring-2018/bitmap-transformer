module.exports = function grayscale2(object) {

    const averageMinMax = (Math.max(object.r, object.g, object.b) + Math.min(object.r, object.g, object.b)) / 2;
    
    const lightness = {
        r: averageMinMax,
        g: averageMinMax,
        b: averageMinMax
    };
    return lightness;
};