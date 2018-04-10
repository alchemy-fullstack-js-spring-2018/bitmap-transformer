module.exports = function grayscale(object) {
    const average = (object.r + object.g + object.b) / 3;
    
    const inverted = {
        r: average,
        g: average,
        b: average
    };
    return inverted;
};