module.exports = function invert(obj) {
    obj.r = 255 - obj.r;
    obj.g = 255 - obj.g;
    obj.b = 255 - obj.b;
    return obj;
};