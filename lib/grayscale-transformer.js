module.export = function grayscale(obj) {
    const avg = (obj.r + obj.g + obj.b) / 3;
    obj.r = avg;
    obj.g = avg;
    obj.b = avg;
    return obj
};