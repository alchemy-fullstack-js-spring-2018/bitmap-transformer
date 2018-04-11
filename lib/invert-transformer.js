module.exports = function invert(object) {
    const inverted = {
        r: 255 - object.r,
        g: 255 - object.g,
        b: 255 - object.b
    };
    return inverted;
};