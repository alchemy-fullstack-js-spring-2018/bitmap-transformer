const constants = require('./bitmap-constants');

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.pixelOffset = buffer.readIntLE(constants.PIXEL_OFFSET, 4);
        this.bitsPerPixel = buffer.readIntLE(constants.BITS_PER_PIXEL_OFFSET, 2);
        this.fileSize = buffer.readIntLE(constants.FILE_SIZE_OFFSET, 4);
    }
};